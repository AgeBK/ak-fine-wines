import styles from "./Price.module.css";

function Price({ current, normal }) {
  return (
    <div className={styles.prices}>
      {current !== normal && <span className={styles.normal}>${normal}</span>}
      <span className={styles.current}>${current}</span>
    </div>
  );
}

export default Price;
