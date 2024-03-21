import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import EmptyCart from "./../components/features/cart/EmptyCart";
import Button from "../components/ui/Button";
import { createOrder } from "../services/apiRestaurant";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../store/cart/cartSlice";
import store from "./../store/store";
import { formatCurrency } from "../utils/helpers";
import { fetchAddress } from "../store/user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const {
    username,
    status,
    error: addresError,
    address,
    position,
  } = useSelector((s) => s.user);
  const cart = useSelector(getCart);
  const dispatchFn = useDispatch();
  const totalCartPrice = useSelector(getTotalCartPrice);
  const navigation = useNavigation();
  const formErrors = useActionData();
  // const [username, cart] = useSelector((s) => [s.user.username, s.cart.cart]);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;
  const submiting = navigation.state === "submitting";
  const isLoadingAddress = status === "loading";

  const formItemClass =
    "flex flex-col gap-2 sm:flex-row  sm:items-center mb-2 relative";
  return cart.length ? (
    <div className="px-4 py-6">
      <h2 className="mb-5 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className={formItemClass}>
          <label className="sm:basis-40">First Name</label>
          <div className="grow">
            <input
              type="text"
              name="customer"
              required
              className="input"
              defaultValue={username}
            />
          </div>
        </div>

        <div className={formItemClass}>
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" required className="input" />
            {formErrors?.phone ? (
              <p className="my-2 rounded-xl bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            ) : null}
          </div>
        </div>

        <div className={formItemClass}>
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              disabled={isLoadingAddress}
              name="address"
              required
              defaultValue={address}
              className="input relative"
            />
            {status === "error" && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {addresError}
              </p>
            )}
          </div>
          {!position.latitude && !position.longitude && (
            <Button
              extraStyle="absolute right-[5px] top-[3px] z-50 md:right-[5px] md:top-[5px]"
              disabled={isLoadingAddress}
              type="small"
              onClick={(e) => {
                e.preventDefault();
                dispatchFn(fetchAddress());
              }}
            >
              Get position
            </Button>
          )}
        </div>

        <div className="my-5 flex items-center  gap-2">
          <input
            className="h-4 w-4 accent-yellow-400 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-1 "
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-semibold">
            Want to yo give your order priority?
          </label>
        </div>
        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.longitude && position.latitude
                ? `${position.latitude}, ${position.longitude}`
                : ""
            }
          />
          <Button type="primary" disabled={submiting}>
            {submiting
              ? "Placing order..."
              : `Order now $${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  ) : (
    <EmptyCart />
  );
}
export const orderAction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority,
  };
  const newOrder = await createOrder(order);
  const error = {};

  if (!isValidPhone(order.phone)) {
    error.phone = "Phone is not valid";
  }
  if (Object.keys(error).length) return error;
  store.dispatch(clearCart());
  return redirect("/order/" + newOrder.id);
};
export default CreateOrder;
