import { reviews, productSource } from "../../data/appData.json";
import styles from "./ProductReview.module.css";
const review = reviews;

const ProductReview = ({ urlCategory, variety }) => {
  return (
    <div className={styles.reviews}>
      <h2>Product Review:</h2>
      {urlCategory && review[urlCategory]}
      <div
        className={styles.source}
        dangerouslySetInnerHTML={{
          __html: productSource.replace("[variety]", variety),
        }}
      ></div>
    </div>
  );
};

export default ProductReview;
