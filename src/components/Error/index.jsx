import { Link } from "react-router-dom";
import Img from "../Image";
import { errorMsg } from "../../data/appData.json";
import styles from "./Error.module.css";

const Error = () => (
  <section className={styles.container}>
    <Img image={"error/sad.png"} imageStyle="error" imageAlt="error" />
    <h2 className={styles.hdr}>
      <strong>Whoops!!</strong>
      <div>{errorMsg}</div>
    </h2>
    <div>Sorry for the inconvenience</div>
    <Link to="/" className={styles.link}>
      Back to homepage
    </Link>
  </section>
);

export default Error;
