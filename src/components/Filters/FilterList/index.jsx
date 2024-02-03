import PriceFilter from "../Price";
import RatingFilter from "../Rating";
import VarietyFilter from "../Variety";
import styles from "./FilterList.module.css";

const FilterList = ({
  currentData,
  filters,
  setFilters,
  urlVariety,
  updateFilters,
}) => {
  console.log("FilterList");

  const filterArr = [
    <PriceFilter
      updateFilters={updateFilters}
      filters={filters}
      key="PriceFilter"
    />,
    <RatingFilter
      setFilters={setFilters}
      filters={filters}
      updateFilters={updateFilters}
      key="RatingFilter"
    />,
  ];

  return (
    <section className={styles.container}>
      <div className={styles.contInner}>
        <div className={styles.hdrCont}>
          <h2 className={styles.hdr}>Refine:</h2>
        </div>
        <ul className={styles.filterList}>
          {filterArr.map((val) => {
            return <li key={val.key}>{val}</li>;
          })}
          {!urlVariety && !filters.variety && (
            <li>
              <VarietyFilter
                updateFilters={updateFilters}
                filters={filters}
                currentData={currentData}
              />
            </li>
          )}
        </ul>
      </div>
    </section>
  );
};

export default FilterList;
