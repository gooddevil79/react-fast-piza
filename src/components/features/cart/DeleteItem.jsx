import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { deleteItem } from "../../../store/cart/cartSlice";

const DeleteItem = function ({ pizzaId }) {
  const dispatchFn = useDispatch();
  return (
    <Button type="small" onClick={() => dispatchFn(deleteItem(pizzaId))}>
      Delete
    </Button>
  );
};

export default DeleteItem;
