import { useDispatch, useSelector } from "react-redux";
import { formatCurrency } from "../../../utils/helpers";
import Button from "../../ui/Button";
import { addItem, getCurrentQtyById } from "../../../store/cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import ChangeItemQuantity from "../cart/ChangeItemQuantity";

function MenuItem({ pizza }) {
  const dispatchFn = useDispatch();
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const currentQty = useSelector(getCurrentQtyById(id));
  const isInCart = currentQty > 0;
  const handleAddItem = function (id) {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatchFn(addItem(newItem));
  };

  return (
    <li className="flex list-none gap-4 py-2  ">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-80 grayscale" : ""}`}
      />
      <div className="flex grow flex-col">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex  items-center justify-between ">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}
          {isInCart && (
            <div className="flex items-center gap-2 md:gap-8">
              <ChangeItemQuantity pizzaId={id} />
              <DeleteItem pizzaId={id} />
            </div>
          )}
          {!soldOut && !isInCart && (
            <Button type="small" onClick={() => handleAddItem(id)}>
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
