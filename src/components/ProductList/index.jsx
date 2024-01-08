import { Link } from "react-router-dom";
import { hyphenate } from "../../data/functions";
import AddToCart from "../AddToCart";
import Img from "../Image";
import PriceDrop from "../PriceDrop";
import Price from "../Price";
import styles from "./ProductList.module.css";

const ProductList = ({ arr, css }) => {
  return (
    <div className={css ? styles[css] : styles.products}>
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
            <div className={styles.product} key={id}>
              <Link
                to={`/${category.toLowerCase()}/${hyphenate(
                  variety.toLowerCase()
                )}/${id}`}
                className={styles.itemCont}
              >
                {current !== normal ||
                  (calloutText && <PriceDrop calloutText={calloutText} />)}
                <Img
                  image={`wine/${id}.jpg`}
                  imageStyle="campaignMini"
                  imageAlt="AK Fine Wines"
                />

                {/* // TODO:  */}
                {/* {urlCategory === "two-for-deals" && (
                    <h2 className={styles.deals}>{calloutText}</h2>
                  )} */}
                <div className={styles.productMetaTODO}>
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
                  deal={twoFor}
                />
              </div>
            </div>
          );
        }
      )}
    </div>
  );
};

export default ProductList;
