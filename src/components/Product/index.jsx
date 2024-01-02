import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { increment, selectCart } from "../../slices/cartSlice";
import { hyphenate, deHyphenate } from "../../data/functions";
import all from "../../data/allProducts.json";
import { blurb } from "../../data/appData.json";
import AddToCart from "../AddToCart";
import Img from "../Image";
import Button from "../Button";
import PriceDrop from "../PriceDrop";
import Price from "../Price";
import styles from "./Product.module.css";

function Product() {
  const [count, setCount] = useState(1);
  const { category: urlCategory, variety: urlVariety, id: urlId } = useParams();
  const dispatch = useDispatch();

  console.log(urlCategory, urlVariety, urlId);

  const product = all.find(({ id }) => id === urlId);

  const {
    id,
    category,
    variety,
    name,
    shortName,
    brand,
    ratings: { average },
    price: { current, normal },
    promotion: { calloutText },
  } = product;

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

  return (
    <article>
      <div className={styles.container}>
        <div className={styles.breadCrumb}>
          <Link to="/" className={styles.category}>
            <Img
              image={`icons/home.png`}
              imageStyle="homeIcon"
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
            {current !== normal ||
              (calloutText && <PriceDrop calloutText={calloutText} />)}
            <Img
              image={`wine/${id}.jpg`}
              imageStyle=""
              imageAlt="AK Fine Wines"
            />
          </div>

          <div className={styles.productMeta}>
            <h1 className={styles.brand}>{brand}</h1>
            <h2 className={styles.shortName}>{shortName}</h2>
            {average && Math.round(average) > 2 ? (
              <Img
                image={`bg/${Math.round(average)}starLge.png`}
                imageStyle="block"
                imageAlt="AK Fine Wines"
              />
            ) : null}

            <Price current={current} normal={normal} css="product" />
            <div className={styles.addCont}>
              <div className={styles.cartTable}>
                <div className={styles.totalPrice}>${current * count}</div>
                <Button
                  css="cartLge"
                  onClick={handleCount}
                  disabled={count < 1}
                >
                  -
                </Button>
                <span className={styles.count}>{count}</span>
                <Button css="cartLge" onClick={handleCount}>
                  +
                </Button>
                <br />
                <AddToCart
                  id={id}
                  name={name}
                  current={current}
                  quantity={count}
                />
              </div>
            </div>
          </div>
        </section>
        <section className={styles.info}>
          <ul className={styles.listInfo}>
            <li>
              <span>Style</span>
              <span>Dessert &amp; Fortified Wines</span>
            </li>
            <li>
              <span>Standard Drinks</span>
              <span>10.0</span>
            </li>
            <li>
              <span>Packaging</span>
              <span>Bottle</span>
            </li>
            <li>
              <span>Alcohol Content</span>
              <span>17.50%</span>
            </li>
            <li>
              <span>Closure</span>
              <span>Screw cap</span>
            </li>
            <li>
              <span>GTIN</span>
              <span>9312088000164</span>
            </li>
            <li>
              <span>Varieties</span>
              <span>Other Red Varietal</span>
            </li>
            <li>
              <span>Occasion</span>
              <span>After Dinner</span>
            </li>
            <li>
              <span>Organic</span>
              <span>No</span>
            </li>
            <li>
              <span>Food Pair</span>
              <span>Desserts</span>
            </li>
            <li>
              <span>Region</span>
              <span>South Eastern Australia, Australia</span>
            </li>
            <li>
              <span>Origin</span>
              <span>Australia</span>
            </li>
            <li>
              <span>Cellaring</span>
              <span>Drink now</span>
            </li>
            <li>
              <span>Product ID</span>
              <span>182577</span>
            </li>
            <li>
              <span>Brand</span>
              <span>
                <a
                  title="View details for Wolf Blass"
                  aria-label="View details for Wolf Blass"
                  href="/brands/wolf-blass"
                >
                  Wolf Blass
                </a>
              </span>
            </li>
          </ul>
        </section>
      </div>
    </article>
  );
}

export default Product;
