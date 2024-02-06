import { blurb } from "../../data/appData.json";
import { deHyphenate } from "../../data/utils";
import styles from "./Blurb.module.css";

const Blurb = ({ urlCategory, urlVariety, header }) => {
  if (urlCategory) {
    const wineCategory = blurb[urlCategory];
    let wineVariety = blurb[urlVariety];
    if (header) {
      wineVariety = blurb["generic"];
    }

    return (
      <>
        <h2 className={styles.variety}>
          {header || deHyphenate(urlVariety) || deHyphenate(urlCategory)}
        </h2>
        <div className={styles.varietyBlurb}>{wineVariety || wineCategory}</div>
      </>
    );
  }
  return null;
};

export default Blurb;
