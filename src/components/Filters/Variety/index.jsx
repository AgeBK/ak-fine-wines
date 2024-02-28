import styles from "./VarietyFilter.module.css";


const VarietyFilter = ({
  updateFilters,
  filters,
  currentData,
}) => {
  const handleChange = ({ target: { value } }) =>
    updateFilters({ variety: value });

  const varietys = currentData.reduce((acc, { variety }) => {
    acc[variety] = (acc[variety] || 0) + 1;
    return acc;
  }, {});

  const sortedArr = Object.entries(varietys).sort(([, a], [, b]) => b - a);

  return (
    <>
      <h3 className={styles.hdr}>Variety:</h3>
      {sortedArr.length > 0 ? (
        <ul>
          {sortedArr.map(([variety, amount]) => (
            <li key={variety}>
              <input
                type="radio"
                id={variety}
                name="variety"
                value={variety}
                checked={filters.variety === variety}
                className={styles.radio}
                onChange={handleChange}
              />
              <label htmlFor={variety}>
                {variety} <span className={styles.amount}> ({amount})</span>
              </label>
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.noResults}>No results</div>
      )}
    </>
  );
};

export default VarietyFilter;
