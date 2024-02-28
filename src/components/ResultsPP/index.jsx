import Button from "../Button";
import { pageSizes } from "../../data/appData.json";
import styles from "./ResultsPP.module.css";

const ResultsPP = ({ paging, updatePaging }) => {
  const handleClick = ({ currentTarget: { textContent } }) => {
    updatePaging({
      page: 1,
      pageSize: Number(textContent),
    });
  };

  return (
    <div className={styles.resultsPPCont}>
      <div className={styles.resultsPP}>Results per page:</div>
      <div className={styles.resultsPPBtns}>
        {pageSizes.map((val) => (
          <Button
            css="resultsPP"
            onClick={(e) => handleClick(e)}
            key={`btn${val}`}
          >
            {paging.pageSize === val ? <span>{val}</span> : val}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ResultsPP;
