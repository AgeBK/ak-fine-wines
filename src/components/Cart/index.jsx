import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, selectCart } from "../../slices/cartSlice";
import useCartState from "../../hooks/useCartState";
import CartOpen from "../CartOpen";
import CartClosed from "../CartClosed";
import styles from "./Cart.module.css";

function Cart() {
  const [discountCode, setDiscountCode] = useState("");

  console.log("Cart");
  // const [isOpen, setIsOpen] = useState(false);
  const cart = useSelector(selectCart);
  const [ref, isOpen, handleClose] = useCartState();

  console.log([{ ...cart }]);

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

  return (
    <div className={styles.cartOuterContainer} ref={ref}>
      <div className={styles.container}>
        {isOpen && totalQty && totalPrice ? (
          <CartOpen
            totalPrice={totalPrice}
            totalQty={totalQty}
            handleClose={handleClose}
            discountCode={discountCode}
            setDiscountCode={setDiscountCode}
          />
        ) : (
          <CartClosed totalPrice={totalPrice} totalQty={totalQty} />
        )}
      </div>
    </div>
  );
}

export default Cart;
