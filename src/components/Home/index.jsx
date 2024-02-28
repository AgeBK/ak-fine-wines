import { homePageCarouselProducts } from "../../data/utils";
import { useGetWinesQuery } from "../../services/API";
import { HOME_10_100_IMG, campaingMini } from "../../data/appData.json";
import usePageWidth from "../../hooks/usePageWidth";
import { Link } from "react-router-dom";
import Carousel from "../Carousel";
import Img from "../Image";
import styles from "./Home.module.css";

function Home() {
  const { data } = useGetWinesQuery();
  const isSmallScreen = usePageWidth(HOME_10_100_IMG);

  if (data) {
    return (
      <article>
        <h2 className={styles.slogan}>
          All of your fine wine needs at the best prices guaranteed!!
        </h2>
        <Link to="/ten-for-100">
          <Img
            image={
              isSmallScreen
                ? "promotion/tenFor100Sml1.jpg"
                : "promotion/tenFor100.jpg"
            }
            imageStyle="tenFor100"
            imageAlt="10 for 100"
          />
        </Link>
        <h2 className={styles.topOffers}>Top offers of the week</h2>
        <Carousel arr={homePageCarouselProducts(data)} />
        <div className={styles.campaign}>
          <Link to="/ten-percent-off">
            <h2 className={styles.tenOff}>10% OFF</h2>
            <h2 className={styles.selected}>Huge range of selected wines</h2>
            <h2 className={styles.shopNow}>SHOP NOW</h2>
            <div className={styles.finePrint}>(Ends Sunday, 5pm)</div>
          </Link>
        </div>
        <div className={styles.campaignMini}>
          {campaingMini.map(
            ({ id, link, hdr, blurb1, blurb2, imgSrc, imgAlt }) => (
              <div className={styles.offer} key={id}>
                <Link to={link}>
                  <h3 className={styles.hdr}>{hdr}</h3>
                  <div className={styles.twoForBlurb}>{blurb1}</div>
                  <div className={styles.twoForBlurb}>{blurb2}</div>
                  <Img
                    image={imgSrc}
                    imageStyle="campaignMini"
                    imageAlt={imgAlt}
                  />
                  <h3 className={styles.shopNow}>SHOP NOW</h3>
                </Link>
              </div>
            )
          )}
        </div>
        <div className={styles.campaign}>
          <Link to="/price-drop">
            <h2 className={styles.tenOff}>WEEKLY SPECIALS</h2>
            <h2 className={styles.selected}>100s of discounted wines</h2>
            <h2 className={styles.shopNow}>SHOP NOW</h2>
            <div className={styles.finePrint}>(Ends Sunday, 5pm)</div>
          </Link>
        </div>
      </article>
    );
  }
  return null;
}

export default Home;
