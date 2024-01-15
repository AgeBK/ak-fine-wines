import Button from "../Button";
import styles from "./PageNumber.module.css";

function PageNumber({ data, paging, setPaging }) {
  // console.log(data.length);
  // console.log(paging.pageSize);
  const { page, pageSize } = paging;

  const totalPages = Math.ceil(data.length / pageSize);
  const prevPage = page - 1;
  let nextPage = page + 1;
  return (
    <div className={styles.container}>
      <Button
        css="pageNumber"
        onClick={() => setPaging({ page: prevPage, pageSize })}
        disabled={page <= 1}
      >
        &lt;
      </Button>
      <span className={styles.pageCurrent}>{page}</span>
      <span className={styles.divider}>of</span>
      <span className={styles.pageTotal}>{totalPages}</span>
      <Button
        css="pageNumber"
        onClick={() => setPaging({ page: nextPage, pageSize })}
        disabled={page === totalPages}
      >
        &gt;
      </Button>
    </div>
  );
}

export default PageNumber;
