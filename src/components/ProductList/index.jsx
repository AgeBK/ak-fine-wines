import ProductItem from "../ProductItem";
import styles from "./ProductList.module.css";

const ProductList = ({ arr }) => (
  <div className={styles.products}>
    {arr?.map(
      ({
        id,
        category,
        variety,
        name,
        shortName,
        brand,
        ratings: { average },
        price: { current, normal, twoFor, percentOff, tenFor },
        promotion: { calloutText, discountCode },
      }) => {
        return (
          <ProductItem
            props={{
              id,
              category,
              variety,
              name,
              shortName,
              brand,
              average,
              current,
              normal,
              twoFor,
              percentOff,
              tenFor,
              calloutText,
              discountCode,
            }}
            key={id}
          />
        );
      }
    )}
  </div>
);

export default ProductList;
