import { Link } from "react-router-dom";
import Img from "../Image";

import styles from "./BreadCrumb.module.css";

const BreadCrumb = ({ urlCategory, urlVariety, category, variety }) => {
  const Chevron = () => (
    <span className={styles.chevronCont}>
      <span className={styles.chevron}></span>
      <span className={styles.chevron}></span>
    </span>
  );

  return (
    <div className={styles.breadCrumb}>
      <Link to="/" className={styles.category}>
        <Img image={`icons/home.png`} imageStyle="" imageAlt="AK Fine Wines" />
        Home
      </Link>
      <Chevron />
      <Link to={`/${urlCategory}`} className={styles.category}>
        {category}
      </Link>
      <Chevron />
      <Link to={`/${urlCategory}/${urlVariety}`} className={styles.category}>
        {variety}
      </Link>
    </div>
  );
};

export default BreadCrumb;
