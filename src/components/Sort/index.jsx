import { useState } from "react";
import styles from "./Sort.module.css";

function Sort({ currentData, setInitialData }) {
  const [selected, setSelected] = useState("");
  const choicesArr = ["Relevance", "A-Z", "Z-A", "$", "$$$", "Sale"];
  let sortedArr = [...currentData];

  const alphabetically = (reverseOrder) => {
    sortedArr.sort((a, b) =>
      a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
    );
    reverseOrder && sortedArr.reverse();
  };

  const financially = (reverseOrder) => {
    sortedArr.sort((a, b) => (a.price.current < b.price.current ? -1 : 1));
    reverseOrder && sortedArr.reverse();
  };

  const salesItems = () =>
    (sortedArr = sortedArr.filter(
      ({ price: { normal, current } }) => normal !== current
    ));

  // const salesItemsFirst = () => sortedArr.sort((a) => (a.sale ? -1 : 1));

  const sortDDL = ({ target: { value } }) => {
    switch (value) {
      case "a-z":
        alphabetically(false);
        break;
      case "z-a":
        alphabetically(true);
        break;
      case "$":
        financially(false);
        break;
      case "$$$":
        financially(true);
        break;
      case "sale":
      case "relevance":
        salesItems();
        break;
      default:
        break;
    }
    setInitialData(sortedArr);
    setSelected(value);
  };

  return (
    <div className={styles.container}>
      <label htmlFor="sort" id="lblSort">
        <select
          id="sort"
          name="filters"
          onChange={sortDDL}
          className={styles.select}
          aria-labelledby="lblSort"
          value={selected}
        >
          {choicesArr.map((val, ind) => (
            <option value={val.toLowerCase()} key={ind}>
              {val}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default Sort;
