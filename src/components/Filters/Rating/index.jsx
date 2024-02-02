import styles from "./RatingFilter.module.css";

function RatingFilter({ filters, updateFilters }) {
  const ratingArr = [
    { value: "3", text: "3 star rating" },
    { value: "4", text: "4 star rating" },
    { value: "5", text: "5 star rating" },
  ];

  const handleChange = ({ target: { value } }) =>
    updateFilters({ rating: value });

  const Stars = ({ value }) => {
    let html = [];
    for (let i = 0; i < Number(value); i++) {
      html.push(<span className={styles.star} key={`star${value}${i}`}></span>);
    }
    return html;
  };

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
            <Stars value={value} />
            <label htmlFor={`rating${value}`} className={styles.visuallyHidden}>
              {text}
            </label>
          </li>
        ))}
      </ul>
    </>
  );
}

export default RatingFilter;
