import { Link } from "react-router-dom";
import { hyphenate } from "../../data/utils";
import AddToCart from "../AddToCart";
import Img from "../Image";
import PriceDrop from "../PriceDrop";
import Price from "../Price";
import styles from "./ProductItem.module.css";

const ProductItem = ({ props, css }) => {
  console.log("ProductItem");
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
  } = props;

  console.log(twoFor, percentOff, tenFor);

  let deal = 0;
  let discountCode =
    calloutText && calloutText.includes(":") ? calloutText.split(":")[1] : null; // TODO: ??
  if (twoFor) {
    deal = { twoFor };
  } else if (tenFor) {
    deal = { tenFor };
  } else if (percentOff) {
    deal = { percentOff };
  }

  console.log(deal);

  // console.log(css); // TODO: lots of undefined?

  const onSpecial = current !== normal ? current : null;

  return (
    <div className={`${styles.product} ${css ? styles[css] : ""}`} key={id}>
      {calloutText || onSpecial ? (
        <PriceDrop calloutText={calloutText} onSpecial={onSpecial} />
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
          imageAlt="AK Fine Wines"
        />

        {/* // TODO:  */}
        {/* {urlCategory === "two-for-deals" && (
            <h2 className={styles.deals}>{calloutText}</h2>
         )} */}
        <div className={styles.productMeta}>
          <h2 className={styles.brand}>{brand}</h2>
          <h3 className={styles.shortName}>{shortName}</h3>
          {average && Math.round(average) > 2 ? (
            <Img
              image={`bg/${Math.round(average)}star.jpg`}
              imageStyle="block"
              imageAlt="AK Fine Wines"
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
