import { decreaseItemQuantity } from "../../../store/cart/cartSlice";
import { formatCurrency } from "../../../utils/helpers";
import ChangeItemQuantity from "./ChangeItemQuantity";
import DeleteItem from "./DeleteItem";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>

        <div className="flex gap-2 md:gap-8">
          <ChangeItemQuantity pizzaId={pizzaId} />
          <DeleteItem pizzaId={pizzaId} />
        </div>
      </div>
    </li>
  );
}

export default CartItem;
