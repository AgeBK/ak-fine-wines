import { MAX_CAROUSEL_PRODUCTS } from "../../data/appData.json";
import Button from "../Button";
import styles from "./CarouselPaging.module.css";

const CarouselPaging = ({ items, pageIndex, setPageIndex, handleClick }) => {
  if (items) {
    const html = [];
    const totalPages = Math.ceil(MAX_CAROUSEL_PRODUCTS / items);
    for (let i = 0; i < totalPages; i++) {
      const id = `CarouselPaging${i}`;
      html.push(
        <span key={id}>
          <label htmlFor={id}>{`page ${i + 1}`}</label>
          <input
            type="radio"
            name="carouselPaging"
            id={id}
            value={i}
            onChange={(e) => setPageIndex(Number(e.target.value))}
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
          disabled={pageIndex + 1 >= totalPages}
        >
          &gt;
        </Button>
      </div>
    );
  }
  return null;
};

export default CarouselPaging;
