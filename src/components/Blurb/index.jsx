import { memo } from "react";
import { blurb } from "../../data/appData.json";
import { deHyphenate } from "../../data/utils";
import styles from "./Blurb.module.css";

export const Blurb = memo(function Blurb({ urlCategory, urlVariety, header }) {
  const synopsis = blurb;

  if (urlCategory && blurb) {
    const wineCategory = synopsis[urlCategory];
    let wineVariety = urlVariety && synopsis[urlVariety];
    if (header) {
      wineVariety = blurb["generic"];
    }

    return (
      <section className={styles.categoryBlurb}>
        <h2 className={styles.variety}>
          {header ||
            (urlVariety && deHyphenate(urlVariety)) ||
            deHyphenate(urlCategory)}
        </h2>
        <div className={styles.varietyBlurb}>{wineVariety || wineCategory}</div>
      </section>
    );
  }
  return null;
});
