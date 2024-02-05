import { Link } from "react-router-dom";
import { hyphenate } from "../../data/utils";
import styles from "./ProductInfo.module.css";

const ProductInfo = ({
  id,
  category,
  variety,
  brand,
  packaging,
  unitOfMeasureLabel,
  current,
  normal,
  shortName,
  urlCategory,
}) => {
  return (
    <section className={styles.info}>
      <h2 className={styles.infoHdr}>Product Information:</h2>
      <ul>
        <li>
          <span>Category</span>
          <span>
            <Link to={`/${urlCategory}`}>{category}</Link>
          </span>
        </li>
        <li>
          <span>Style</span>
          <span>
            <Link to={`/${urlCategory}/${hyphenate(variety)}`}>{variety}</Link>
          </span>
        </li>
        <li>
          <span>Standard Drinks</span>
          <span>8.3</span>
        </li>
        <li>
          <span>Packaging</span>
          <span>{packaging}</span>
        </li>
        <li>
          <span>Alcohol Content</span>
          <span>11.7%</span>
        </li>
        <li>
          <span>Unit Measure</span>
          <span>{unitOfMeasureLabel}</span>
        </li>
        <li>
          <span>Closure</span>
          <span>{packaging === "Bottle" ? "Screw cap" : "Self close"}</span>
        </li>
        <li>
          <span>On special</span>
          <span>{current !== normal ? "Yes" : "No"}</span>
        </li>
        <li>
          <span>Occasion</span>
          <span>Drinking :)</span>
        </li>
        <li>
          <span>Organic</span>
          <span>
            {shortName.toLowerCase().includes("organic") ? "Yes" : "No"}
          </span>
        </li>
        <li>
          <span>Food Pair</span>
          <span>{category === "Red" ? "Meat" : "Chicken/Fish"}</span>
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
          <span>{id}</span>
        </li>
        <li>
          <span>Brand</span>
          <span>
            <Link to={`/${urlCategory}/${hyphenate(brand)}`}>{brand}</Link>
          </span>
        </li>
      </ul>
    </section>
  );
};

export default ProductInfo;
