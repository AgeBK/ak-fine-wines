import Img from "../Image";
import styles from "./CartClosed.module.css";

function CartClosed({ totalPrice, totalQty, handleIsOpen, handleKeyDown }) {
  const cartImage = totalQty && totalPrice ? "cartNotEmpty" : "cartEmpty";

  return (
    <div
      className={styles.cartClosedCont}
      onClick={handleIsOpen}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <span
        className={`${styles.cartClosedQty} ${
          totalQty ? styles.cartClosedContQty : ""
        }`}
      >
        {totalQty}
      </span>
      <Img image={`icons/${cartImage}.png`} imageStyle="cart" imageAlt="cart" />
      {totalPrice > 0 && (
        <div className={styles.totalPrice}>${totalPrice.toFixed(2)}</div>
      )}
    </div>
  );
}

export default CartClosed;
