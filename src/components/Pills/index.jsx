// import React, {} from "react";
import Button from "../Button";
import styles from "./Pills.module.css";

const Pills = ({ filters, removeFilters }) => {
  const arr = ["price", "rating", "variety"];

  if (arr.length) {
    let html = [];
    html.push(
      arr.map(
        (val) =>
          filters[val] && (
            <Button css="pills" onClick={() => removeFilters(val)} key={val}>
              {val} <span className={styles.close}>X</span>
            </Button>
          )
      )
    );
    return (
      <div className={styles.pillCont}>
        {html}
        <Button css="link" onClick={() => removeFilters("all")}>
          Clear all
        </Button>
      </div>
    );
  }
  return null;
};

export default Pills;
