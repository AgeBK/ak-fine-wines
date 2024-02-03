import { useState, useEffect, useRef, useCallback } from "react";
import ProductItem from "../ProductItem";
import Button from "../Button";
import { MAX_CAROUSEL_PRODUCTS } from "../../data/appData.json";
import styles from "./Carousel.module.css";

function Carousel({ arr }) {
  const [pageIndex, setPageIndex] = useState(0);
  const [items, setItems] = useState(0);
  const ref = useRef(0);

  const handleClick = (val) => setPageIndex((prev) => prev + val);

  const handleChange = ({ target: { value } }) => setPageIndex(Number(value));

  const calculateItems = useCallback(() => {
    console.log("calculateItems");
    if (ref.current && ref.current.offsetWidth) {
      const {
        current: { offsetWidth },
      } = ref;
      console.log(offsetWidth);

      let currentItems = 0;
      if (offsetWidth >= 1200) {
        currentItems = 6;
      } else if (offsetWidth >= 875) {
        currentItems = 4;
      } else if (offsetWidth >= 650) {
        currentItems = 3;
      } else if (offsetWidth >= 420) {
        currentItems = 2;
      } else {
        currentItems = 1;
      }
      if (currentItems !== items) setItems(currentItems);
    }
  }, [items]);

  useEffect(() => {
    calculateItems();
    // TODO: have resize event on Category page?? hook expected?
    window.addEventListener("resize", calculateItems);
    return () => window.removeEventListener("resize", calculateItems);
  }, [calculateItems]);

  const CarouselPaging = () => {
    if (items) {
      let html = [];
      const totalPages = arr.length / items - 1;
      for (let i = 0; i < MAX_CAROUSEL_PRODUCTS / items; i++) {
        const id = `CarouselPaging${i}`;
        html.push(
          <span key={id}>
            <label htmlFor={id}>{`page ${i + 1}`}</label>
            <input
              type="radio"
              name="carouselPaging"
              id={id}
              value={i}
              onChange={handleChange}
              checked={i === pageIndex}
            />
          </span>
        );
      }
      return (
        <div className={styles.carouselPaging}>
          <Button
            css="pageNumber"
            onClick={() => handleClick(-1)}
            disabled={pageIndex <= 0}
          >
            &lt;
          </Button>
          {html}
          <Button
            css="pageNumber"
            onClick={() => handleClick(1)}
            disabled={pageIndex >= totalPages}
          >
            &gt;
          </Button>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <div className={styles.carousel} ref={ref}>
        {arr.map(
          (
            {
              id,
              category,
              variety,
              name,
              shortName,
              brand,
              ratings: { average },
              price: { current, normal, twoFor, percentOff },
              promotion: { calloutText, discountCode },
            },
            ind
          ) => {
            if (ind >= pageIndex * items && ind < pageIndex * items + items) {
              return (
                <ProductItem
                  props={{
                    id,
                    category,
                    variety,
                    name,
                    shortName,
                    brand,
                    average,
                    current,
                    normal,
                    twoFor,
                    percentOff,
                    calloutText,
                    discountCode,
                  }}
                  key={id}
                  css={"carouselItems" + items}
                />
              );
            }
          }
        )}
      </div>
      <CarouselPaging />
    </>
  );
}

export default Carousel;

// useEffect(() => {
//   // const id = setInterval(() => {
//   //   if (pageIndex + length < arr.length) {
//   //     console.log(pageIndex);
//   //     setPageIndex((prev) => prev + 1);
//   //   } else {
//   //     setPageIndex(0);
//   //   }
//   // }, 8000);
//   // return () => clearInterval(id);
// }, [pageIndex, arr]);

// const arr = all
//   .filter(
//     ({ isBundle, price: { current, normal } }) =>
//       current !== normal && isBundle === false
//   )
//   .sort(() => 0.5 - Math.random())
//   .slice(0, 12);
//   let pageIndex = 0;
// const length = 4;

// const arr2 = [1, 2, 3, 4, 5, 6, 7];
// let arr = useMemo(() => [...arr], [arr]);
