import { useSelector, useDispatch } from "react-redux";
import {
  //decrement,
  increment,
  // incrementByAmount,
  // incrementAsync,
  // incrementIfOdd,
  // selectCount,
} from "../../slices/cartSlice";
import Button from "../Button";

function AddToCart({ id, name, current, quantity }) {
  const dispatch = useDispatch();
  const handleClick = () => dispatch(increment({ id, name, current, quantity }));

  return (
    <Button css="cart" onClick={handleClick}>
      Buy
    </Button>
  );
}

export default AddToCart;
