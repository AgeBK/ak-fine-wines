import Button from "../Button";
import styles from "./ResultsPP.module.css";

const ResultsPP = ({paging, setPaging}) => {
    const pageSizes = [20, 40, 60, 80];

    const handlePageSize = ({ target: { textContent } }) => {
      console.log(textContent);
      setPaging({ page: 1, pageSize: Number(textContent) }); //{ page: 1, pageSize: 40 }
    };

    return pageSizes.map((val) => (
      <Button css="resultsPP" onClick={handlePageSize} key={`btn${val}`}>
        {paging.pageSize === val ? <span>{val}</span> : val}
      </Button>
    ));
};

export default ResultsPP;
