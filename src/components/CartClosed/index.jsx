import Img from "../Image";
import styles from "./CartClosed.module.css";

function CartClosed({ totalPrice, totalQty }) {
  const notEmpty = totalQty > 0 && totalPrice > 0;
  const cartImage = notEmpty ? "cartNotEmpty" : "cartEmpty";

  return (
    <div
      className={styles.cartClosedCont}
      // onClick={notEmpty ? handleIsOpen : null}
      // onKeyDown={notEmpty ? handleKeyDown : null}
      // role="button"
      // tabIndex={0}
    >
      <span
        className={`${styles.cartClosedQty} ${
          totalQty ? styles.cartClosedContQty : ""
        }`}
      >
        {totalQty}
      </span>
      <Img image={`icons/${cartImage}.png`} imageStyle="cart" imageAlt="cart" />
      {notEmpty && (
        <div className={styles.totalPrice}>${totalPrice.toFixed(2)}</div>
      )}
    </div>
  );
}

export default CartClosed;
