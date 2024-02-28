import Pills from "../Pills";
import Sort from "../Sort";
import styles from "./CategoryHeader.module.css";

const CategoryHeader = ({
  filters,
  removeFilters,
  dataLength,
  sortName,
  setSortName,
}) => {
  return (
    <div className={styles.detailsCont}>
      <Pills filters={filters} removeFilters={removeFilters} />
      <span className={styles.results}>({dataLength}) Available</span>
      <div className={styles.sort}>Sort:</div>
      <Sort sortName={sortName} setSortName={setSortName} />
    </div>
  );
};

export default CategoryHeader;
