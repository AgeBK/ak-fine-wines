import Button from "../Button";
import styles from "./CategoryToggleItems.module.css";

const CategoryToggleItems = ({ togglePageItems, isItems }) => {
  return (
    <div className={styles.smlScreen}>
      <Button css="filters" onClick={togglePageItems}>
        {isItems ? "X" : "Filters"}
      </Button>
    </div>
  );
};

export default CategoryToggleItems;
