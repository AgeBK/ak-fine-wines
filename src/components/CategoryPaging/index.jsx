import CategoryPageNumber from "../CategoryPageNumber";
import ResultsPP from "../ResultsPP";
import styles from "./CategoryPaging.module.css";

const CategoryPaging = ({ currentData, paging, updatePaging }) => {
  return (
    <div className={styles.categoryPaging}>
      <div className={styles.pageNumCont}>
        <CategoryPageNumber
          currentData={currentData}
          paging={paging}
          updatePaging={updatePaging}
        />
      </div>
      <ResultsPP paging={paging} updatePaging={updatePaging} />
    </div>
  );
};

export default CategoryPaging;
