import { useState, useEffect } from "react";
import styles from "./PriceFilter.module.css";

function PriceFilter({ setFilters, filters, reset }) {
  console.log("PriceFilter");

  const [priceFilter, setPriceFilter] = useState(null);
  // const pricefilters = ["0-10", "10-19", "20-29", "30-1000"];
  const pricefilterObj = [
    { text: "<$10", value: "0-10" },
    { text: "$10-$20", value: "10-19" },
    { text: "$20-$30", value: "20-29" },
    { text: "$30+", value: "30-1000" },
  ];

  const handleChange = ({ target: { value } }) => {
    console.log(value);
    setPriceFilter(value);
    setFilters({ ...filters, price: value, reset: false }); // TODO: reset?
  };

  useEffect(() => {
    reset && setPriceFilter(null);
  }, [reset]);

  return (
    <>
      <h3 className={styles.hdr}>Price:</h3>
      <ul className={styles.list}>
        {pricefilterObj.map(({ text, value }) => (
          <li key={value}>
            <input
              type="radio"
              id={value}
              name="price"
              value={value}
              checked={priceFilter === value}
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
