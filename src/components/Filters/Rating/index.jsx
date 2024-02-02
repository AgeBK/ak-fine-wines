import styles from "./RatingFilter.module.css";
import { ratingArr } from "../../../data/appData.json";

function RatingFilter({ filters, updateFilters }) {
  const handleChange = ({ target: { value } }) =>
    updateFilters({ rating: value });

  return (
    <>
      <h3 className={styles.hdr}>Rating:</h3>
      <ul className={styles.list}>
        {ratingArr.map(({ value, text }) => (
          <li key={value}>
            <input
              type="radio"
              id={`rating${value}`}
              name="rating"
              value={value}
              checked={filters.rating === value}
              className={styles.radio}
              onChange={handleChange}
            />
            <label
              htmlFor={`rating${value}`}
              className={`${styles[`rating${value}`]} ${styles.rating}`}
            >
              {text}
            </label>
          </li>
        ))}
      </ul>
    </>
  );
}

export default RatingFilter;
