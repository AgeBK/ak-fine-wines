import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCart } from "../../slices/cartSlice";
import useCartState from "../../hooks/useCartState";
import CartOpen from "../CartOpen";
import CartClosed from "../CartClosed";
import styles from "./Cart.module.css";

const Cart = () => {
  const [discountCode, setDiscountCode] = useState("");
  const cart = useSelector(selectCart);
  const [ref, isOpen, handleClose] = useCartState();

  const CartQtyPrice = Object.values(cart).reduce(
    (acc, { quantity, price, dealPrice }) => {
      acc.totalQty += quantity;
      acc.totalPrice += (dealPrice || price) * quantity;
      return acc;
    },
    {
      totalQty: 0,
      totalPrice: 0,
    }
  );

  const { totalPrice, totalQty } = CartQtyPrice;

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
};

export default Cart;
