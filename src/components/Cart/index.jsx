import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, selectCart } from "../../slices/cartSlice";
import CartOpen from "../CartOpen";
import CartClosed from "../CartClosed";
import styles from "./Cart.module.css";

function Cart() {
  const [isOpen, setIsOpen] = useState(false);
  const cart = useSelector(selectCart);
  console.log(cart);

  const cartDetails = Object.values(cart).reduce(
    (acc, { qty, price, dealPrice }) => {
      acc.totalQty += qty;
      acc.totalPrice += (dealPrice || price) * qty;
      return acc;
    },
    {
      totalQty: 0,
      totalPrice: 0,
    }
  );

  const { totalPrice, totalQty } = cartDetails;
  console.log(totalPrice, totalQty);

  const handleClick = () => setIsOpen(!isOpen);

  const handleKeyDown = ({ key }) => key === "Enter" && handleClick();

  return (
    <div
      className={styles.cartOuterContainer}
      // onClick={handleClick}
      // onKeyDown={handleKeyDown}
      // role="button"
      // tabIndex={0}
    >
      <div className={styles.container}>
        {isOpen && totalQty && totalPrice ? (
          <CartOpen
            totalPrice={totalPrice}
            totalQty={totalQty}
            handleClick={handleClick}
            handleKeyDown={handleKeyDown}
          />
        ) : (
          <CartClosed
            totalPrice={totalPrice}
            totalQty={totalQty}
            handleClick={handleClick}
            handleKeyDown={handleKeyDown}
          />
        )}
      </div>
    </div>
  );
}

export default Cart;
