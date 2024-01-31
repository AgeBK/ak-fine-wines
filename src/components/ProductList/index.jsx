import ProductItem from "../ProductItem";
import Error from "../Error";
import styles from "./ProductList.module.css";

const ProductList = ({ arr, css }) => (
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
// : (
//   <Error message="Your search returned no results or an error has occured" />
// );

export default ProductList;
