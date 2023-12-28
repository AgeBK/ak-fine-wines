import { useState, useCallback, useEffect } from "react";
// // Whites
// import white from "./assets/white/white.json";
// import chardonnay from "./assets/white/chardonnay.json";
// import savBlanc from "./assets/white/savBlanc.json";
// import semSavBlanc from "./assets/white/semSavBlanc.json";
// import riesling from "./assets/white/riesling.json";
// import pinotGris from "./assets/white/pinotGris.json";
// import cask from "./assets/white/cask.json";
// import alternate from "./assets/white/alternate.json";
// import semillon from "./assets/white/semillon.json";
// import moscato from "./assets/white/moscato.json";
// import otherBlends from "./assets/white/otherBlends.json";
// import otherVar from "./assets/white/otherVar.json";
// import desert from "./assets/white/desert.json";
// import verdelho from "./assets/white/verdelho.json";
// import bundles from "./assets/white/bundles.json";
// import cheninBlanc from "./assets/white/cheninBlanc.json";
// import viognier from "./assets/white/viognier.json";
// Reds
// import red from "./assets/red/red.json";
// import sparkling from "./assets/sparkling.json";
// import shiraz from "./assets/red/shiraz.json";
// import pinotNoir from "./assets/red/pinotNoir.json";
// import cabSav from "./assets/red/cabSav.json";
// import blends from "./assets/red/blends.json";
// import fortified from "./assets/red/fortified.json";
// import redVar from "./assets/red/redVar.json";
// import grenache from "./assets/red/grenache.json";
// import tempranillo from "./assets/red/tempranillo.json";
// import cabMer from "./assets/red/cabMer.json";
// import merlot from "./assets/red/merlot.json";
// import cask from "./assets/red/cask.json";
// import malbec from "./assets/red/malbec.json";
// import sangi from "./assets/red/sangi.json";
// import cabShiraz from "./assets/red/cabShiraz.json";
// import shirazCab from "./assets/red/shirazCab.json";
// import sweet from "./assets/red/sweet.json";
// import bundle from "./assets/red/bundle.json";

import styles from "./App.module.css";

function App() {
  const filtered = red.filter((val) => !val.subCategory);
  console.log("no subCat: " + filtered.length);
  console.log(filtered);

  const prodIds = bundle.products.map((val) => val.id);
  console.log("variety: " + prodIds.length);

  const filter = red.reduce((acc, val) => {
    acc =
      prodIds.indexOf(val.id) !== -1
        ? [...acc, { ...val, subCategory: "Bundle" }]
        : [...acc, val];
    return acc;
  }, []);

  // doubles.sort((a, b) => {
  //   return a.id < b.id ? 1 : -1;
  // });

  console.log("filter");
  console.log(filter);
  // console.log("doubles");
  // console.log(prodIds);
  // const combinedWhite = [...white1.products, ...white2.products];
  // console.log(combinedWhite);
  //const combinedRed = [...red.products, ...red2.products];

  // const highlight = (id) => {
  //   console.log(id);
  //   const clickedObj = { ...clicked, [id]: true };
  //   setClicked(clickedObj);
  // };

  const handleKeyDown = (e, id) => {
    console.log(e);
    console.log(id);
    console.log(e.keyCode);
    //if (e.key === 88) {
    console.log("keydown");
    //window.reload()
    // setReload((prev) => prev + 1);
    //window.location.reload();v
    //}
  };

  return (
    <div className={styles.cont}>
      <div className={styles.count}></div>

      {filter.map((val, ind) => {
        // {
        //   val.id === "7266130" && console.log(val);
        // }
        return (
          //  ind < 200 && (
          // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
          <div
            key={val.id}
            className={` ${styles.item} ${styles.item + val.id}`}
            onKeyDown={(e) => handleKeyDown(e, val.id)}
          >
            <h3>{val.name}</h3>{" "}
            <div>
              {val.subCategory || <span className={styles.red}>NO SUBCAT</span>}
            </div>
            <div>{val.id}</div>
            {/* - <span>{ind}</span>{" "} */}
            {/* {val.price.normal !== val.price.current && (
              <b className={styles.red}>{val.price.normal}</b>
            )}
            <div className={styles.current}>{val.price.current}</div> */}
            {/*    - <span>{ind + 769}</span>
              <br />
           */}
            <a
              href={`/src/assets/orig/${ind + 769}.jpg`}
              // download={`${val.id}.jpg`}
            >
              <img
                src={`https://www.liquorland.com.au${val.image.heroImage}`}
                alt={val.name}
              />
              {/* <img src={`/src/assets/orig/${ind + 769}.jpg`} alt={val.name} /> */}
              <img
                src={`/src/assets/img/${val.id}.jpg`}
                alt={val.name}
                className={styles.gBorder}
              />
            </a>
          </div>
        );
        // );
      })}
    </div>
  );
}

export default App;
