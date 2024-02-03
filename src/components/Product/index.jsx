import { useState } from "react";
import { useParams } from "react-router-dom";
import { productPageCarouselProducts } from "../../data/utils";
import { useGetWinesQuery } from "../../services/API";
import { blurb, reviews, productSource } from "../../data/appData.json";
import { checkDeals } from "../../data/utils";
import AddToCart from "../AddToCart";
import Img from "../Image";
import Button from "../Button";
import ProductInfo from "../ProductInfo";
import Carousel from "../Carousel";
import BreadCrumb from "../BreadCrumb";

// TODO: haven't used useMemo or useCallback anywhere??
import styles from "./Product.module.css";

function Product() {
  const [count, setCount] = useState(1);
  const { category: urlCategory, variety: urlVariety, id: urlId } = useParams();
  const { data } = useGetWinesQuery();

  const product = data.find(({ id }) => id === urlId);

  const {
    id,
    category,
    variety,
    name,
    shortName,
    brand,
    packaging,
    unitOfMeasureLabel,
    ratings: { average, total },
    price: { current, normal, twoFor, percentOff, tenFor },
    promotion: { cdataoutText },
  } = product;

  const handleCount = ({ target: { textContent } }) =>
    textContent === "+" ? setCount(count + 1) : setCount(count - 1);

  const CartDeal = () =>
    twoFor ? <div className={styles.cartTwoFor}>{cdataoutText}</div> : null;

  let deal = checkDeals(twoFor, tenFor, percentOff);

  return (
    <article>
      <div className={styles.container}>
        <BreadCrumb
          urlCategory={urlCategory}
          urlVariety={urlVariety}
          category={category}
          variety={variety}
        />
        <section className={styles.productCont}>
          <div className={styles.productImg}>
            <Img
              image={`wine/${id}.jpg`}
              imageStyle="productMain"
              imageAlt="AK Fine Wines"
            />
          </div>
          <div className={styles.productMeta}>
            <h1 className={styles.brand}>{brand}</h1>
            <h2 className={styles.shortName}>{shortName}</h2>
            <div className={styles.productBlurb}>
              {blurb[urlVariety] || blurb[urlCategory]}
            </div>
            {average && Math.round(average) > 2 ? (
              <>
                <Img
                  image={`bg/${Math.round(average)}starLge.png`}
                  imageStyle=" "
                  imageAlt="AK Fine Wines"
                />
                <div className={styles.totalRate}>{total} Reviews</div>
              </>
            ) : null}

            <div className={styles.cartTableCont}>
              <div className={styles.cartTable}>
                <div className={styles.cartBottle}>
                  <div className={styles.price}>
                    ${current}/{packaging}
                  </div>
                  <div className={styles.packImg}>
                    <Img
                      image={`icons/wineSil.png`}
                      imageStyle="packaging"
                      imageAlt={packaging}
                    />
                  </div>
                </div>
                <div className={styles.cartAmt}>
                  <div className={styles.totalPrice}>${current * count}</div>
                  <Button
                    css="cartLge"
                    onClick={handleCount}
                    disabled={count < 2}
                  >
                    -
                  </Button>
                  <span className={styles.count}>{count}</span>
                  <Button css="cartLge" onClick={handleCount}>
                    +
                  </Button>
                </div>
                <div className={styles.cartAdd}>
                  <AddToCart
                    id={id}
                    name={name}
                    brand={brand}
                    shortName={shortName}
                    price={current}
                    quantity={count}
                    deal={deal}
                  />
                </div>
              </div>
              <CartDeal />
            </div>
          </div>
        </section>
        <ProductInfo
          id={id}
          category={category}
          variety={variety}
          brand={brand}
          packaging={packaging}
          unitOfMeasureLabel={unitOfMeasureLabel}
          current={current}
          normal={normal}
          shortName={shortName}
          urlCategory={urlCategory}
        />
        <div className={styles.reviews}>
          <h2>Product Review:</h2>
          {reviews[urlCategory]}
          <div
            className={styles.source}
            dangerouslySetInnerHTML={{ __html: productSource }}
          ></div>
        </div>
        <section className={styles.similar}>
          <h2>Similar Products:</h2>
          <Carousel arr={productPageCarouselProducts(data, urlVariety)} />
        </section>
      </div>
    </article>
  );
}

export default Product;
