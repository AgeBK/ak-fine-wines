// import React, {} from "react";
import Button from "../Button";
import styles from "./Pills.module.css";

const Pills = ({ filters, handleRemoveFilter }) => {
  const arr = [];
  const { price, rating, variety } = filters;
  price && arr.push("price"); // TODO:
  rating && arr.push("rating");
  variety && arr.push("variety");

  if (arr.length) {
    let html = [];
    html.push(
      arr.map((val) => (
        <Button css="pills" onClick={() => handleRemoveFilter(val)} key={val}>
          {val} <span className={styles.close}>X</span>
        </Button>
      ))
    );
    return (
      <div className={styles.pillCont}>
        {html}
        <Button css="link" onClick={() => handleRemoveFilter("all")}>
          Clear all
        </Button>
      </div>
    );
  }
  return null;
};

export default Pills;
