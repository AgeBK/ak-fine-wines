import styles from "./PriceFilter.module.css";
import { priceArr } from "../../../data/appData.json";

function PriceFilter({ updateFilters, filters }) {
  const handleChange = ({ target: { value } }) =>
    updateFilters({ price: value });

  return (
    <>
      <h3 className={styles.hdr}>Price:</h3>
      <ul className={styles.list}>
        {priceArr.map(({ text, value }) => (
          <li key={value}>
            <input
              type="radio"
              id={value}
              name="price"
              value={value}
              checked={filters.price === value}
              onChange={handleChange}
              className={styles.radio}
            />
            <label htmlFor={value} className={styles.label}>
              {text}
            </label>
          </li>
        ))}
      </ul>
    </>
  );
}

export default PriceFilter;
