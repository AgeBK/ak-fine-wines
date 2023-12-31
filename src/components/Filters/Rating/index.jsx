import { useState, useEffect } from "react";
import styles from "./RatingFilter.module.css";

function RatingFilter({ setFilters, filters, reset }) {
  const [ratingFilter, setRatingFilter] = useState(null);

  const ratingfilter = [
    { value: "3", text: "3 star rating" },
    { value: "4", text: "4 star rating" },
    { value: "5", text: "5 star rating" },
  ];

  const handleChange = ({ target: { value } }) => {
    console.log("handleChange");
    setRatingFilter(value);
    setFilters({ ...filters, rating: value, reset: false }); // TODO: reset?
  };

  const Stars = ({ value }) => {
    let html = [];
    for (let i = 0; i < Number(value); i++) {
      html.push(<span className={styles.star} key={`star${value}${i}`}></span>);
    }
    return html;
  };

  useEffect(() => {
    reset && setRatingFilter(null);
  }, [reset]);

  return (
    <>
      <h3 className={styles.hdr}>Rating:</h3>
      <ul className={styles.list}>
        {ratingfilter.map(({ value, text }) => (
          <label
            htmlFor={value}
            className={styles.visuallyHiddenTODO}
            key={value}
          >
            <li>
              <input
                type="radio"
                id={value}
                name="rating"
                value={value}
                checked={ratingFilter === value}
                className={styles.radio}
                onChange={handleChange}
              />
              <Stars value={value} />
              {/* {text} */}
            </li>
          </label>
        ))}
      </ul>
    </>
  );
}

export default RatingFilter;
