import styles from "./Sort.module.css";

function Sort({ sortName, setSortName }) {
  const choicesArr = ["Relevance", "A-Z", "Z-A", "$", "$$$", "Sale"];

  const update = (e) => {
    console.log(e);
    setSortName(e.target.value);
  };

  return (
    <div className={styles.container}>
      <label htmlFor="sort" id="lblSort">
        <select
          id="sort"
          name="filters"
          onChange={(e) => update(e)}
          className={styles.select}
          aria-labelledby="lblSort"
          value={sortName}
        >
          {choicesArr.map((val) => (
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
