import { imgPath } from "../../data/appData.json";
import styles from "./image.module.css";

const Image = ({ image, imageStyle, imageAlt }) => (
  <img
    src={`${imgPath}${image}`}
    className={styles[imageStyle]}
    alt={imageAlt}
  />
);

export default Image;
