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

function AddToCart({
  id,
  name,
  brand,
  shortName,
  price,
  quantity,
  deal,
  discountCode,
}) {
  const dispatch = useDispatch();
  const handleClick = () =>
    dispatch(
      increment({
        id,
        name,
        brand,
        shortName,
        price,
        quantity,
        deal,
        discountCode,
      })
    );

  return (
    <Button css="cart" onClick={handleClick}>
      Buy
    </Button>
  );
}

export default AddToCart;
