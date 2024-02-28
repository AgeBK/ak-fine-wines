import { Link } from "react-router-dom";
import styles from "./CategoryNoResults.module.css";

const CategoryNoResults = () => (
  <>
    Sorry, no results:
    <br />
    <Link to="/" className={styles.link}>
      Back to homepage
    </Link>
  </>
);

export default CategoryNoResults;
