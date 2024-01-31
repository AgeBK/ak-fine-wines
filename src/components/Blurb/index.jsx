import { blurb } from "../../data/appData.json";
import { deHyphenate } from "../../data/utils";
import styles from "./Blurb.module.css";

const Blurb = ({ urlCategory, urlVariety, customHeader }) => {
  if (urlCategory) {
    const wineCategory = blurb[urlCategory];
    let wineVariety = blurb[urlVariety];
    if (customHeader) {
      wineVariety = blurb["generic"];
    }

    return (
      <>
        <h2 className={styles.variety}>
          {customHeader || deHyphenate(urlVariety) || deHyphenate(urlCategory)}
        </h2>
        <div className={styles.varietyBlurb}>{wineVariety || wineCategory}</div>
      </>
    );
  }
  return null;
};

export default Blurb;
