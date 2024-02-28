import Button from "../Button";
import styles from "./CategoryPageNumber.module.css";



function CategoryPageNumber({
  currentData,
  paging,
  updatePaging,
}) {
  const { page, pageSize } = paging;
  const totalPages = Math.ceil(currentData.length / pageSize);
  const prevPage = page - 1;
  const nextPage = page + 1;

  return (
    <div className={styles.container}>
      <Button
        css="pageNumber"
        onClick={() => updatePaging({ page: 1, pageSize })}
        disabled={page <= 1}
      >
        &lt;&lt;
      </Button>
      <Button
        css="pageNumber"
        onClick={() => updatePaging({ page: prevPage, pageSize })}
        disabled={page <= 1}
      >
        &lt;
      </Button>
      <span className={styles.pageCurrent}>{page}</span>
      <span className={styles.divider}>of</span>
      <span className={styles.pageTotal}>{totalPages}</span>
      <Button
        css="pageNumber"
        onClick={() => updatePaging({ page: nextPage, pageSize })}
        disabled={page >= totalPages}
      >
        &gt;
      </Button>
      <Button
        css="pageNumber"
        onClick={() => updatePaging({ page: totalPages, pageSize })}
        disabled={page >= totalPages}
      >
        &gt;&gt;
      </Button>
    </div>
  );
}

export default CategoryPageNumber;
