import Img from "../Image";
import styles from "./Footer.module.css";

function Footer() {
  const paymentArr = [
    "amex",
    "applePay",
    "mc",
    "paypal",
    "visa",
    "zip",
    "afterPay",
  ];
  const yr = new Date().getFullYear();
  return (
    <footer className={styles.container}>
      <div className={styles.ak}>© {yr} AK Fine Wines All rights reserved</div>
      <ul className={styles.list}>
        {paymentArr.map((val, ind) => (
          <li key={ind}>
            <Img
              image={`payment/${val}.jpg`}
              imageStyle="footer"
              imageAlt={val}
            />
          </li>
        ))}
      </ul>
    </footer>
  );
}

export default Footer;
