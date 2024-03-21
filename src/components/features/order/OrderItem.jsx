import { formatCurrency } from "../../../utils/helpers";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li>
      <div className="flex items-center justify-between py-2">
        <p>
          <span>{quantity}&times;</span> {name}
        </p>
        <p className="text-stone-500">{formatCurrency(totalPrice)}</p>
      </div>
      <p className="text-sm italic text-stone-500">
        {isLoadingIngredients ? "Loading...." : ingredients.join(", ")}
      </p>
    </li>
  );
}

export default OrderItem;
