import { Link } from "react-router-dom";
import styles from "./PriceDrop.module.css";

function PriceDrop({ calloutText }) {
  console.log("PriceDrop");
  let arr = [];
  if (calloutText && calloutText.includes("2 for")) {
    arr = calloutText.split(" ");
  }
  console.log(arr);

  return arr.length > 0 ? (
    <Link to="/2-for-deals" className={styles.sale}>
      <span className={`${styles.priceDrop} ${styles.twoFor}`}>
        {arr.map((val) => (
          <span className={styles.info} key={val}>
            {val}
          </span>
        ))}
      </span>
      <span className={styles.seeAll}>
        See <br /> All
      </span>
    </Link>
  ) : (
    <Link to="/sale-items" className={styles.sale}>
      <span className={styles.priceDrop}>
        PRICE <br /> DROP
      </span>
      <span className={styles.seeAll}>
        See <br /> All
      </span>
    </Link>
  );
}

export default PriceDrop;
