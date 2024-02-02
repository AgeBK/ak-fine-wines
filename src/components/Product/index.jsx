import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { randomProducts, productPageCarouselProducts } from "../../data/utils";
import { useGetWinesQuery } from "../../services/API";
import { blurb, reviews } from "../../data/appData.json";
import { checkDeals } from "../../data/utils";
import AddToCart from "../AddToCart";
import Img from "../Image";
import Button from "../Button";
import PriceDrop from "../PriceDrop";
import ProductInfo from "../ProductInfo";
import Carousel from "../Carousel";

// TODO: haven't used useMemo or useCdataback anywhere??
// import Price from "../Price";
import styles from "./Product.module.css";

function Product() {
  const [count, setCount] = useState(1);
  const { category: urlCategory, variety: urlVariety, id: urlId } = useParams();
  const { data } = useGetWinesQuery();

  const product = data.find(({ id }) => id === urlId);

  const sameVariety = randomProducts(
    data.filter(({ variety }) => variety.toLowerCase() === urlVariety)
  ).slice(0, 4);
  console.log(sameVariety);

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

  const Chevron = () => (
    <span className={styles.chevronCont}>
      <span className={styles.chevron}></span>
      <span className={styles.chevron}></span>
    </span>
  );

  const handleCount = ({ target: { textContent } }) =>
    textContent === "+" ? setCount(count + 1) : setCount(count - 1);

  const CartDeal = () =>
    twoFor ? <div className={styles.cartTwoFor}>{cdataoutText}</div> : null;

  let deal = checkDeals(twoFor, tenFor, percentOff);

  return (
    <article>
      <div className={styles.container}>
        <div className={styles.breadCrumb}>
          <Link to="/" className={styles.category}>
            <Img
              image={`icons/home.png`}
              imageStyle=""
              imageAlt="AK Fine Wines"
            />
            Home
          </Link>
          <Chevron />
          <Link to={`/${urlCategory}`} className={styles.category}>
            {category}
          </Link>
          <Chevron />
          <Link
            to={`/${urlCategory}/${urlVariety}`}
            className={styles.category}
          >
            {variety}
          </Link>
        </div>
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

            {/* <Price current={current} normal={normal} css="product" /> */}
            <div className={styles.cartTableCont}>
              <div className={styles.cartTable}>
                <div className={styles.cartBottle}>
                  {/* <div className={styles.packaging}>{packaging}</div> */}
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
          <div className={styles.source}>
            <i>Source *Wine Monthly: August 2023 </i> - {variety} blends from
            South Eastern Austraila
          </div>
        </div>

        <section className={styles.similar}>
          <h2>Similar Products:</h2>
          <Carousel arr={productPageCarouselProducts(data, urlVariety)} />
          {/* <ProductList arr={sameVariety} /> */}
        </section>
      </div>
    </article>
  );
}

export default Product;
