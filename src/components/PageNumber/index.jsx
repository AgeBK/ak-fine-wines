import Button from "../Button";
import styles from "./PageNumber.module.css";

function PageNumber({ currentData, paging, updatePaging }) {
  const { page, pageSize } = paging;
  const totalPages = Math.ceil(currentData.length / pageSize);
  const prevPage = page - 1;
  const nextPage = page + 1;

  return (
    <div className={styles.container}>
      <Button
        css="pageNumber"
        onClick={() => updatePaging({ pageNumber: prevPage, pageSize })}
        disabled={page <= 1}
      >
        &lt;
      </Button>
      <span className={styles.pageCurrent}>{page}</span>
      <span className={styles.divider}>of</span>
      <span className={styles.pageTotal}>{totalPages}</span>
      <Button
        css="pageNumber"
        onClick={() => updatePaging({ pageNumber: nextPage, pageSize })}
        disabled={page === totalPages}
      >
        &gt;
      </Button>
    </div>
  );
}

export default PageNumber;
