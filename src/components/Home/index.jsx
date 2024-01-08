// import { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  decrement,
  increment,
  incrementByAmount,
  incrementIfOdd,
  selectCount,
} from "../../slices/cartSlice";
import ProductList from "../ProductList";
import Carousel from "../Carousel";
import { Link } from "react-router-dom";
import Img from "../Image";
import Button from "../Button";
import styles from "./Home.module.css";
import all from "../../data/allProducts.json";

function Home() {
  console.log("Home");
  // create list of unique categories from data
  const categoriesObj = all.reduce(
    (acc, { productId, category, productPicUrl }) => {
      acc = !acc[category]
        ? { ...acc, [category]: { productId, category, productPicUrl } }
        : acc;
      return acc;
    },
    {}
  );
  console.log(categoriesObj);

  const test = all.filter((val, ind) => ind < 5);
  console.log(test);

  const deals = all.reduce((acc, val) => {
    const text = val.promotion.calloutText;
    if (text) {
      if (acc[text] !== undefined) {
        const count = acc[text] + 1;
        acc = { ...acc, [text]: count };
      } else {
        acc[text] = 1;
      }
    }
    return acc;
  }, {});

  console.log(deals);

  const productListArr = all
    .filter(({ price: { current, normal } }) => current !== normal)
    .sort(() => 0.5 - Math.random())
    .slice(0, 10);
  console.log(productListArr);

  return (
    <article>
      <h2 className={styles.slogan}>
        All of your fine wine needs at the best prices guaranteed!!
      </h2>
      <Carousel />
      <div className={styles.campaign}>
        <a href="/ten-percent-off">
          {/* <h2 className={styles.toGood}>To good to be true!!!</h2> */}
          <h2 className={styles.tenOff}>10% OFF</h2>
          <h2 className={styles.selected}>Huge range of selected wines</h2>
          <h2 className={styles.shopNow}>SHOW NOW</h2>
          <div className={styles.finePrint}>(Ends Sunday, 5pm)</div>
        </a>
      </div>
      <div className={styles.campaignMini}>
        <div className={styles.offer}>
          <Link to="/two-for-deals">
            <h3>2 for Deals</h3>
            <div className={styles.twoForBlurb}>
              2 great bottles - 1 amazing price
            </div>
            {/* <div className={styles.twoForBlurb}>1 amazing price</div> */}
            <Img
              image={"wine/507509.jpg"}
              imageStyle="campaignMini"
              imageAlt="AK Fine Wines"
            />
            <h3 className={styles.shopNow}>SHOW NOW</h3>
          </Link>
        </div>
        <div className={styles.offer}>
          <Link to="/10-and-less">
            <h3>Get Down</h3>
            <div className={styles.twoForBlurb}>$10 and less</div>
            <div className={styles.twoForBlurb}>
              Don&apos;t miss out on these
            </div>
            <Img
              image={"promotion/gift.jpg"}
              imageStyle="campaignMini"
              imageAlt="AK Fine Wines"
            />
            <h3 className={styles.shopNow}>SHOW NOW</h3>
          </Link>
        </div>
        <div className={styles.offer}>
          <Link to="/10-for-100">
            <h3>Are you serious?</h3>
            <div className={styles.twoForBlurb}>10 for $100</div>
            <div className={styles.twoForBlurb}>
              Stop mucking around, buy these now
            </div>
            <Img
              image={"promotion/10wines.jpg"}
              imageStyle="campaignMini"
              imageAlt="AK Fine Wines"
            />
            <h3 className={styles.shopNow}>SHOW NOW</h3>
          </Link>
        </div>
      </div>

      {/* <section className={styles.randomSpecials}>
        <ProductList arr={productListArr} />
      </section> */}
    </article>
  );
}

export default Home;
