import { Link } from "react-router-dom";
import { hyphenate, checkDeals } from "../../data/utils";
import AddToCart from "../AddToCart";
import Img from "../Image";
import PriceDrop from "../PriceDrop";
import Price from "../Price";
import styles from "./ProductItem.module.css";

const ProductItem = ({ props, css }) => {
  const {
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
  } = props;

  const deal = checkDeals(twoFor, tenFor, percentOff);
  const onSpecial = current !== normal ? current : null;
  const avg = Math.round(average);

  return (
    <div className={`${styles.product} ${css ? styles[css] : ""}`} key={id}>
      {calloutText || onSpecial ? (
        <PriceDrop calloutText={calloutText} />
      ) : null}
      <Link
        to={`/${category.toLowerCase()}/${hyphenate(
          variety.toLowerCase()
        )}/${id}`}
        className={styles.itemCont}
      >
        <Img
          image={`wine/${id}.jpg`}
          imageStyle="campaignMini"
          imageAlt={name}
        />
        <div className={styles.productMeta}>
          <h2 className={styles.brand}>{brand}</h2>
          <h3 className={styles.shortName}>{shortName}</h3>
          {avg && avg > 2 ? (
            <Img
              image={`bg/${avg}star.jpg`}
              imageStyle="block"
              imageAlt={`${avg} star`}
            />
          ) : null}
        </div>
      </Link>
      <Price current={current} normal={normal} />
      <div className={styles.addCont}>
        <AddToCart
          id={id}
          name={name}
          brand={brand}
          shortName={shortName}
          price={current}
          quantity={1}
          deal={deal}
          discountCode={discountCode}
        />
      </div>
    </div>
  );
};

export default ProductItem;
