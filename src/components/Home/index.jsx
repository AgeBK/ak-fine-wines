import { homePageCarouselProducts } from "../../data/functions";
import Carousel from "../Carousel";
import { Link } from "react-router-dom";
import Img from "../Image";
import styles from "./Home.module.css";
import all from "../../data/allProducts.json";

function Home() {
  // console.log("Home");
  // console.log(homePageCarouselProducts(all));

  return (
    <article>
      <h2 className={styles.slogan}>
        All of your fine wine needs at the best prices guaranteed!!
      </h2>
      <Link to="/ten-for-100">
        <Img
          image={"promotion/tenFor100.jpg"}
          imageStyle="tenFor100"
          imageAlt="AK Fine Wines"
        />
        <Img
          image={"promotion/tenFor100Sml1.jpg"}
          imageStyle="tenFor100sml"
          imageAlt="AK Fine Wines"
        />
      </Link>
      <h2 className={styles.topOffers}>Top offers of the week</h2>
      <Carousel arr={homePageCarouselProducts(all)} />
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
            <h3 className={styles.hdr}>2 for Deals</h3>
            <div className={styles.twoForBlurb}>2 great bottles</div>
            <div className={styles.twoForBlurb}>1 amazing price</div>
            {/* <div className={styles.twoForBlurb}>1 amazing price</div> */}
            <Img
              image={"promotion/twoBotBlk1.jpg"}
              imageStyle="campaignMini"
              imageAlt="two for deals"
            />
            <h3 className={styles.shopNow}>SHOP NOW</h3>
          </Link>
        </div>
        <div className={styles.offer}>
          <Link to="/10-and-less">
            <h3 className={styles.hdr}>Get Down</h3>
            <div className={styles.twoForBlurb}>$10 and less</div>
            <div className={styles.twoForBlurb}>
              Don&apos;t miss out on these
            </div>
            <Img
              image={"promotion/multiBot.jpg"}
              imageStyle="campaignMini"
              imageAlt="AK Fine Wines"
            />
            <h3 className={styles.shopNow}>SHOP NOW</h3>
          </Link>
        </div>
        {/* <div className={styles.offer}>
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
        </div> */}
      </div>

      {/* <section className={styles.randomSpecials}>
        <ProductList arr={productListArr} />
      </section> */}
    </article>
  );
}

export default Home;
