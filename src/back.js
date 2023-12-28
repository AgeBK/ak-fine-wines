import { useState, useCallback, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import data from "./assets/products.json";
import data2 from "./assets/products2.json";
import red from "./assets/red.json";
import red2 from "./assets/red2.json";
import sparkling from "./assets/sparkling.json";
import styles from "./App.module.css";

function App() {
  // console.log(data.products); // DONE
  // console.log(data2.products); // DONE
  // console.log(red.products); // DONE
  // console.log(red2.products);
  //console.log(sparkling.products); // DONE
  const [clicked, setClicked] = useState({});
  const [reload, setReload] = useState(0);

  useEffect(() => {
    console.log(clicked);
    console.log(reload);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  const highlight = (id) => {
    console.log(id);
    const clickedObj = { ...clicked, [id]: true };
    setClicked(clickedObj);
  };

  const handleKeyDown = (e, id) => {
    console.log(e);
    console.log(id);
    console.log(e.keyCode);
    //if (e.key === 88) {
    console.log("keydown");
    //window.reload()
    setReload((prev) => prev + 1);
    highlight(id);
    //window.location.reload();v
    //}
  };

  return (
    <div className={styles.cont}>
      <div className={styles.count}>{reload}</div>

      {data2.products.map((val, ind) => {
        // {
        //   val.id === "7266130" && console.log(val);
        // }
        return (
          ind < 200 && (
            // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
            <div
              key={val.id}
              className={`${clicked[val.id] && styles.border} ${styles.item} ${
                styles.item + val.id
              }`}
              onClick={() => highlight(val.id)}
              onKeyDown={(e) => handleKeyDown(e, val.id)}
            >
              <h3>{val.name}</h3>
              <div>{val.id}</div>
              {/*    - <span>{ind + 769}</span>
              <br />
              {val.price.normal !== val.price.current && (
                <b className={styles.red}>{val.price.normal}</b>
              )}
              <div className={styles.current}>{val.price.current}</div> */}
              <a
                href={`/src/assets/orig/${ind + 769}.jpg`}
                download={`${val.id}.jpg`}
              >
                <img
                  src={`https://www.liquorland.com.au${val.image.heroImage}`}
                  alt={val.name}
                />
                <img src={`/src/assets/orig/${ind + 769}.jpg`} alt={val.name} />
                <img
                  src={`/src/assets/img/${val.id}.jpg`}
                  alt={val.name}
                  className={styles.gBorder}
                />
              </a>
            </div>
          )
        );
      })}
    </div>
  );
}

export default App;
