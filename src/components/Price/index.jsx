import styles from "./Price.module.css";

function Price({ current, normal }) {
  return (
    <>
      {normal && current !== normal && (
        <span className={styles.normal}>${normal}</span>
      )}
      <span className={styles.current}>${current}</span>
    </>
  );
}

export default Price;
