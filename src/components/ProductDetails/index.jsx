import WineBlurb from "../WineBlurb";
import ProductRating from "../ProductRating";
import ProductCart from "../ProductCart";
import Img from "../Image";
import styles from "./ProductDetails.module.css";

const ProductDetails = ({
  id,
  brand,
  name,
  shortName,
  average,
  total,
  twoFor,
  tenFor,
  percentOff,
  current,
  packaging,
  calloutText,
  discountCode,
  urlCategory,
  urlVariety,
  isSmallScreen,
}) => {
  return (
    <section className={styles.productCont}>
      <div className={styles.productImg}>
        <Img
          image={`wine/${id}.jpg`}
          imageStyle={
            packaging === "Bottle" ? "productMain" : "productMainCask"
          }
          imageAlt={name}
        />
      </div>
      <div className={styles.productMeta}>
        <h1 className={styles.brand}>{brand}</h1>
        <h2 className={styles.shortName}>{shortName}</h2>
        <WineBlurb urlCategory={urlCategory} urlVariety={urlVariety} />
        <ProductRating average={average} total={total} />
        {!isSmallScreen && (
          <ProductCart
            id={id}
            name={name}
            brand={brand}
            shortName={shortName}
            twoFor={twoFor}
            tenFor={tenFor}
            percentOff={percentOff}
            current={current}
            packaging={packaging}
            calloutText={calloutText}
            discountCode={discountCode}
          />
        )}
      </div>
    </section>
  );
};

export default ProductDetails;
