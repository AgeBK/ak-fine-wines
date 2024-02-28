import { blurb } from "../../data/appData.json";
import styles from "./WineBlurb.module.css";

const WineBlurb = ({ urlCategory, urlVariety }) => {
  const wineData = blurb;
  let synopsis = "";
  if (urlVariety && wineData[urlVariety]) {
    synopsis = wineData[urlVariety];
  } else if (urlCategory && wineData[urlCategory]) {
    synopsis = wineData[urlCategory];
  }

  return synopsis ? (
    <div className={styles.productBlurb}>{synopsis}</div>
  ) : null;
};

export default WineBlurb;
