import { Link } from "react-router-dom";
import Img from "../Image";
import { errorMsg } from "../../data/appData.json";
import styles from "./Error.module.css";

function Error({ message }) {
  const errorText = message || { errorMsg };
  
  return (
    <section className={styles.container}>
      <Img image={"error/sad.png"} imageStyle="error" imageAlt="error" />
      <br />
      <div className={styles.error}>
        <h2 className={styles.hdr}>
          <strong>Whoops!!</strong>
          <div className={styles.errorMsg}>{errorText}</div>
        </h2>
        <div className={styles.info}>Sorry for the inconvenience</div>
        <Link to="/" className={styles.link}>
          Back to homepage
        </Link>
      </div>
    </section>
  );
}

export default Error;
