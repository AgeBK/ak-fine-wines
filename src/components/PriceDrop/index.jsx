import { Link } from "react-router-dom";
import styles from "./PriceDrop.module.css";

function PriceDrop({ calloutText }) {
  // TODO: numToWord
  const numToWord = { 2: "two", 6: "six", 10: "ten" };
  let arr: string[] = [];
  let amount = "";
  let price = 0;
  let isTenPercent = false;

  if (calloutText) {
    if (calloutText.includes("for")) {
      arr = calloutText.split(" ");
      amount = numToWord[arr[0]];
      price = arr[2].replace("$", "");
    } else if (calloutText.startsWith("10%")) {
      isTenPercent = true;
    }
  }

  return arr.length > 0 ? (
    <Link
      to={`/${amount}-for-${price}`}
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
  ) : isTenPercent ? (
    <div className={styles.special}>
      <Link to="/ten-percent-off">{calloutText} </Link>
    </div>
  ) : (
    <Link to="/price-drop" className={styles.sale}>
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
