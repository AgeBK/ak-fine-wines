import styles from "./RatingFilter.module.css";
import { ratingArr } from "../../../data/appData.json";

const RatingFilter = ({ filters, updateFilters }) => {
  const handleChange = ({ target: { value } }) =>
    updateFilters({ rating: value });

  const arr = ratingArr;

  return (
    <>
      <h3 className={styles.hdr}>Rating:</h3>
      <ul>
        {arr.map(({ text, value }) => (
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
};

export default RatingFilter;
