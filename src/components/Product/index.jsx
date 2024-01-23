import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  hyphenate,
  deHyphenate,
  randomProducts,
  productPageCarouselProducts,
} from "../../data/utils";
import all from "../../data/allProducts.json";
import { blurb, reviews } from "../../data/appData.json";
import AddToCart from "../AddToCart";
import Img from "../Image";
import Button from "../Button";
import PriceDrop from "../PriceDrop";
import ProductInfo from "../ProductInfo";
import Carousel from "../Carousel";

// import Price from "../Price";
import styles from "./Product.module.css";

function Product() {
  const [count, setCount] = useState(1);
  const { category: urlCategory, variety: urlVariety, id: urlId } = useParams();
  console.log(urlCategory, urlVariety, urlId);

  const sameVariety = randomProducts(
    all.filter(({ variety }) => variety.toLowerCase() === urlVariety)
  ).slice(0, 4);
  console.log(sameVariety);

  console.log(productPageCarouselProducts(all, urlVariety, 12));

  const product = all.find(({ id }) => id === urlId);

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
    promotion: { calloutText },
  } = product;

  const onSpecial = current !== normal ? current : null;

  const Chevron = () => (
    <span className={styles.chevronCont}>
      <span className={styles.chevron}></span>
      <span className={styles.chevron}></span>
    </span>
  );

  const handleCount = ({ target: { textContent } }) => {
    console.log(textContent);
    textContent === "+" ? setCount(count + 1) : setCount(count - 1);
  };

  const CartDeal = () =>
    twoFor ? <div className={styles.cartTwoFor}>{calloutText}</div> : null;

  let deal = 0; // TODO: have this same code in ProductItem
  let discountCode =
    calloutText && calloutText.includes(":") ? calloutText.split(":")[1] : null; // TODO: ??
  if (twoFor) {
    deal = { twoFor };
  } else if (tenFor) {
    deal = { tenFor };
  } else if (percentOff) {
    deal = { percentOff };
  }

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
            {/*    {calloutText ||
              (onSpecial && (
                <PriceDrop calloutText={calloutText} onSpecial={onSpecial} /> // TODO:  check this
              ))}
            {twoFor && <div className={styles.twoFor}>{calloutText}</div>} */}
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
          <Carousel arr={productPageCarouselProducts(all, urlVariety)} />
          {/* <ProductList arr={sameVariety} /> */}
        </section>
      </div>
    </article>
  );
}

export default Product;
