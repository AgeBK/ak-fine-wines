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

function AddToCart({ id, name, current }) {
  const dispatch = useDispatch();
  const handleClick = () => dispatch(increment({ id, name, current }));

  return (
    <Button css="cart" onClick={handleClick}>
      Buy
    </Button>
  );
}

export default AddToCart;
