import { useContext, useState, useEffect, useMemo } from "react";
import ProductList from "../ProductList";
import { Link } from "react-router-dom";
import Img from "../Image";
import Button from "../Button";
import styles from "./Carousel.module.css";
import all from "../../data/allProducts.json";

function Carousel() {
  console.log("Carousel");
  // create list of unique categories from data
  const [startIndex, setStartIndex] = useState(0);
  console.log(startIndex);

  const productListArr = all
    .filter(({ price: { current, normal } }) => current !== normal)
    .sort(() => 0.5 - Math.random())
    .slice(0, 10);
  //   let startIndex = 0;
  const length = 4;

  const arr2 = [1, 2, 3, 4, 5, 6, 7];
  let arr = useMemo(() => [...productListArr], [productListArr]);
  arr.slice(startIndex, startIndex + length);

  useEffect(() => {
    const id = setInterval(() => {
      if (startIndex + length < arr2.length) {
        console.log(startIndex);
        setStartIndex((prev) => prev + 1);
      } else {
        setStartIndex(0);
      }
    }, 10000);

    return () => clearInterval(id);
  }, [startIndex, productListArr, arr2]);

  return (
    <>
      {/* <div className={styles.cont}>
        <ProductList arr={arr} css="carousel" />
      </div> */}
      <div className={styles.cont}>
        {arr2.map((val, ind) => {
          if (ind >= startIndex && ind < startIndex + length) {
            return (
              <div className={styles.item} key={val}>
                <ProductList arr={[arr[ind]]} css="carousel" />
              </div>
            );
          }
        })}
      </div>
    </>
  );
}

export default Carousel;
