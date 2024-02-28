import styles from "./CartPrice.module.css";

const CartPrice = ({ price, quantity, dealPrice }) => {
  const cartPrice = (dealPrice || price) * quantity;
  return <div className={styles.price}>${cartPrice.toFixed(2)}</div>;
};

export default CartPrice;
