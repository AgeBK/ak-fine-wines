import styles from "./PriceFilter.module.css";

function PriceFilter({ updateFilters, filters }) {
  const priceArr = [
    { text: "Less than $10", value: "0-10" },
    { text: "$10-$20", value: "10-19" },
    { text: "$20-$30", value: "20-29" },
    { text: "$30 plus", value: "30-1000" },
  ];

  console.log(JSON.stringify(priceArr));

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
