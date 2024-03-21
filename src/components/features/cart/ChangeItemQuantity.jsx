import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import {
  decreaseItemQuantity,
  getCurrentQtyById,
  increaseItemQuantity,
} from "../../../store/cart/cartSlice";

const ChangeItemQuantity = function ({ pizzaId }) {
  const dispatchFn = useDispatch();
  const currentQty = useSelector(getCurrentQtyById(pizzaId));

  return (
    <div className="md:ga-5 flex items-center gap-3">
      <Button
        type="round"
        onClick={() => {
          dispatchFn(decreaseItemQuantity(pizzaId));
        }}
      >
        -
      </Button>
      <p className="text-sm font-medium">{currentQty}</p>
      <Button
        type="round"
        onClick={() => {
          dispatchFn(increaseItemQuantity(pizzaId));
        }}
      >
        +
      </Button>
    </div>
  );
};

export default ChangeItemQuantity;
