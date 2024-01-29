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
        {sortedArr.map(([variety, amount]) => (
          <li key={variety}>
            <input
              type="radio"
              id={variety}
              name="rating"
              value={variety}
              checked={varietyFilter === variety}
              className={styles.radio}
              onChange={handleChange}
            />
            <label htmlFor={variety} className={styles.visuallyHiddenTODO}>
              {variety} <span className={styles.amount}> ({amount})</span>
            </label>
          </li>
        ))}
      </ul>
    </>
  );
}

export default VarietyFilter;
