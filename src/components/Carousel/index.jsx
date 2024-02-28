import { useState, useEffect, useRef, useCallback } from "react";
import ProductItem from "../ProductItem";
import CarouselPaging from "../CarouselPaging";
import Button from "../Button";
import Img from "../Image";
import {
  SIX_CAROUSEL_ITEMS,
  FOUR_CAROUSEL_ITEMS,
  THREE_CAROUSEL_ITEMS,
  TWO_CAROUSEL_ITEMS,
  ONE_CAROUSEL_ITEM,
} from "../../data/appData.json";
import styles from "./Carousel.module.css";

const Carousel = ({ arr }) => {
  const [pageIndex, setPageIndex] = useState(0);
  const [items, setItems] = useState(0);
  const ref = useRef(null);
  const totalPages = arr && arr.length / items - 1;

  const handleClick = (val) =>
    setPageIndex((prev) => prev + val);

  const calculateItems = useCallback(() => {
    if (ref.current && ref.current.offsetWidth) {
      const {
        current: { offsetWidth },
      } = ref;

      let currentItems = 0;
      if (offsetWidth >= 1200) {
        currentItems = SIX_CAROUSEL_ITEMS;
      } else if (offsetWidth >= 875) {
        currentItems = FOUR_CAROUSEL_ITEMS;
      } else if (offsetWidth >= 650) {
        currentItems = THREE_CAROUSEL_ITEMS;
      } else if (offsetWidth >= 380) {
        currentItems = TWO_CAROUSEL_ITEMS;
      } else {
        currentItems = ONE_CAROUSEL_ITEM;
      }
      if (currentItems !== items) setItems(currentItems);
    }
  }, [items]);

  useEffect(() => {
    calculateItems();
    window.addEventListener("resize", calculateItems);
    return () => window.removeEventListener("resize", calculateItems);
  }, [calculateItems]);

  return (
    <>
      <div className={styles.carousel} ref={ref}>
        <div className={`${styles.arrow} ${styles.arrowLeft}`}>
          <Button
            css="carousel"
            onClick={() => handleClick(-1)}
            disabled={pageIndex <= 0}
          >
            <Img
              image={`icons/arrowLeft.png`}
              imageStyle="carousel"
              imageAlt="previous"
            />
          </Button>
        </div>
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
              price: { current, normal, twoFor, tenFor, percentOff },
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
                    tenFor,
                    percentOff,
                    calloutText,
                    discountCode,
                  }}
                  key={id}
                  css={"carouselItems" + items}
                />
              );
            }
            return null;
          }
        )}
        <div className={`${styles.arrow} ${styles.arrowRight}`}>
          <Button
            css="carousel"
            onClick={() => handleClick(1)}
            disabled={pageIndex >= totalPages}
          >
            <Img
              image={`icons/arrowRight.png`}
              imageStyle="carousel"
              imageAlt="next"
            />
          </Button>
        </div>
      </div>
      <CarouselPaging
        items={items}
        pageIndex={pageIndex}
        setPageIndex={setPageIndex}
        handleClick={handleClick}
      />
    </>
  );
};

export default Carousel;
