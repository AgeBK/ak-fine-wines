import sparkling from "./assets/sparkling/sparkling.json";
import white from "./assets/sparkling/white.json";
import prosecco from "./assets/sparkling/prosecco.json";
import rose from "./assets/sparkling/rose.json";
import champ from "./assets/sparkling/champ.json";
import prosRose from "./assets/sparkling/prosRose.json";
import sweet from "./assets/sparkling/sweet.json";
import champRose from "./assets/sparkling/champRose.json";
import red from "./assets/sparkling/red.json";
import cava from "./assets/sparkling/cava.json";
import petilant from "./assets/sparkling/petilant.json";

import styles from "./App.module.css";
import { redirect } from "react-router-dom";

function App() {
  const filtered = sparkling
    .filter((val) => !val.subCategory)
    .map((val) => val.id);
  console.log("no subCat: " + filtered.length);
  console.log(filtered);

  const prodIds = petilant.products.map((val) => val.id);
  console.log("variety: " + prodIds.length);

  const filter = sparkling.reduce((acc, val) => {
    acc =
      filtered.indexOf(val.id) !== -1
        ? [...acc, { ...val, subCategory: "Champagne" }]
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
