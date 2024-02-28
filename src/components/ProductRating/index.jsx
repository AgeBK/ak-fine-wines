import Img from "../Image";
import styles from "./ProductRating.module.css";


const ProductRating = ({ average, total }) => {
  return (
    <>
      {average && Math.round(average) > 2 ? (
        <>
          <Img
            image={`bg/${Math.round(average)}starLge.png`}
            imageStyle=""
            imageAlt={`${Math.round(average)} star rating`}
          />
          <div className={styles.totalRate}>{total} Reviews</div>
        </>
      ) : null}
    </>
  );
};

export default ProductRating;
