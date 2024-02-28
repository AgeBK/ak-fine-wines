import styles from "./CartItemSaving.module.css";

type ItemSavingsProps = {
  price: number;
  dealPrice?: number;
  quantity: number;
};

const CartItemSaving = ({ price, dealPrice, quantity }: ItemSavingsProps) =>
  dealPrice ? (
    <div className={styles.savings}>
      <span className={styles.triangle}></span>
      You save: ${((price - dealPrice) * quantity).toFixed(2)}
    </div>
  ) : null;

export default CartItemSaving;
