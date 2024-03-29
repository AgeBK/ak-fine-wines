import Button from "../Button";
import { pillsArr } from "../../data/appData.json";
import styles from "./Pills.module.css";

const Pills = ({ filters, removeFilters }) => {
  const arr = pillsArr;
  const html = arr.reduce(
    (acc, val) =>
      filters[val]
        ? (acc = [
            ...acc,
            <Button css="pills" onClick={() => removeFilters(val)} key={val}>
              {val} <span className={styles.close}>X</span>
            </Button>,
          ])
        : acc,
    []
  );

  return (
    <>
      {html.length > 0 ? (
        <div className={styles.pillCont}>
          {html}
          <Button css="link" onClick={() => removeFilters("all")}>
            Clear all
          </Button>
        </div>
      ) : null}
    </>
  );
};

export default Pills;
