import { useState, useEffect } from "react";
import styles from "./VarietyFilter.module.css";

function VarietyFilter({ setFilters, filters, reset, initialData }) {
  const [varietyFilter, setVarietyFilter] = useState(null);

  const handleChange = ({ target: { value } }) => {
    setVarietyFilter(value);
    setFilters({ ...filters, variety: value, reset: false }); // TODO: reset?
  };

  useEffect(() => {
    reset && setVarietyFilter(null);
  }, [reset]);

  let varietys = initialData.reduce((acc, { variety }) => {
    acc[variety] = (acc[variety] || 0) + 1;
    return acc;
  }, {});
  const sortedArr = Object.entries(varietys).sort(([, a], [, b]) => b - a);

  return (
    <>
      <h3 className={styles.hdr}>Variety:</h3>
      <ul className={styles.list}>
        {sortedArr.map(([text]) => (
          <li key={text}>
            <input
              type="radio"
              id={text}
              name="rating"
              value={text}
              checked={varietyFilter === text}
              className={styles.radio}
              onChange={handleChange}
            />
            <label htmlFor={text} className={styles.visuallyHiddenTODO}>
              {text}
            </label>
          </li>
        ))}
      </ul>
    </>
  );
}

export default VarietyFilter;

// // TODO: get wine sub categories for filter
// varietys = Object.fromEntries(sortedArr); // convert back to obj

// console.log(varietys);
