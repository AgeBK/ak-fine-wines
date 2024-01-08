import { Link } from "react-router-dom";
import styles from "./PriceDrop.module.css";

function PriceDrop({ calloutText }) {
  let arr = [];
  let price = 0;
  if (calloutText && calloutText.includes("2 for")) {
    arr = calloutText.split(" ");

    price = arr[2].replace("$", "");
  }
  return arr.length > 0 ? (
    <Link
      to={`/two-for-${price}`}
      className={`${styles.sale} ${styles.twoFor}`}
    >
      <span className={`${styles.priceDrop} `}>
        {arr.map((val) => (
          <div className={styles.info} key={val}>
            {val}
          </div>
        ))}
      </span>
      <span className={styles.seeAll}>
        See
        <br />
        All
      </span>
    </Link>
  ) : (
    <Link to="/sale-items" className={styles.sale}>
      <span className={styles.priceDrop}>
        PRICE <br /> DROP
      </span>
      <span className={styles.seeAll}>
        See
        <br />
        All
      </span>
    </Link>
  );
}

export default PriceDrop;
