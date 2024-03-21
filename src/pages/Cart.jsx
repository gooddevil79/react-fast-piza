import { Link } from "react-router-dom";
import LinkButton from "../components/ui/LinkButton";
import Button from "../components/ui/Button";
import CartItem from "../components/features/cart/CartItem";
import EmptyCart from "./../components/features/cart/EmptyCart";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart } from "../store/cart/cartSlice";

function Cart() {
  const dispatchFn = useDispatch();
  const username = useSelector((s) => s.user.username);
  const cart = useSelector(getCart);

  const handleClearCart = function () {
    dispatchFn(clearCart());
  };

  return cart.length ? (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>
      <ul className="mt-3 divide-y divide-stone-200 border-b">
        {cart.map((itm) => (
          <CartItem item={itm} key={itm.pizzaId} />
        ))}
      </ul>
      <div className="mt-6 space-x-2">
        <Button to="/order/new" type="primary">
          Order pizzas
        </Button>
        <Button type="secondary" onClick={handleClearCart}>
          Clear cart
        </Button>
      </div>
    </div>
  ) : (
    <EmptyCart />
  );
}

export default Cart;
