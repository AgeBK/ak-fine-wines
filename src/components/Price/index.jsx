import styles from "./Price.module.css";

function Price({ current, normal, css }) {
  return (
    <div className={styles[css]}>
      {normal && current !== normal && (
        <span className={styles.normal}>${normal}</span>
      )}
      <span className={styles.current}>${current}</span>
    </div>
  );
}

export default Price;
