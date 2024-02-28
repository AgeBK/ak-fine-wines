import styles from "./CartItemSaving.module.css";

const CartItemSaving = ({ price, dealPrice, quantity }) =>
  dealPrice ? (
    <div className={styles.savings}>
      <span className={styles.triangle}></span>
      You save: ${((price - dealPrice) * quantity).toFixed(2)}
    </div>
  ) : null;

export default CartItemSaving;
