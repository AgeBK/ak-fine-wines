import { sortNameArr } from "../../data/appData.json";
import styles from "./Sort.module.css";

function Sort({ sortName, setSortName }) {
  const handleSelect = ({ target: { value } }) => setSortName(value);

  return (
    <div className={styles.container}>
      <label htmlFor="sort" id="lblSort">
        <select
          id="sort"
          name="filters"
          onChange={(e) => handleSelect(e)}
          className={styles.select}
          aria-labelledby="lblSort"
          value={sortName}
        >
          {sortNameArr.map((val) => (
            <option value={val.toLowerCase()} key={val}>
              {val}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default Sort;
