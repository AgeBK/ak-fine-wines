import ProductItem from "../ProductItem";
import styles from "./ProductList.module.css";

const ProductList = ({ arr, css }) => {
  console.log(arr);
  return (
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
          price: { current, normal, twoFor },
          promotion: { calloutText },
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
                calloutText,
              }}
              key={id}
            />
          );
        }
      )}
    </div>
  );
};

export default ProductList;
