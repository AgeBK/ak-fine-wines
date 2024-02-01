import { useState } from "react";
import PriceFilter from "../Price";
import RatingFilter from "../Rating";
import VarietyFilter from "../Variety";
import Button from "../../Button";
import styles from "./FilterList.module.css";

const FilterList = ({
  initialData,
  filters,
  setFilters,
  urlVariety,
  showFilters,
  setShowFilters,
}) => {
  const handleClose = () => setShowFilters(!showFilters);

  return (
    <section className={styles.container}>
      <div className={styles.contInner}>
        <div className={styles.hdrCont}>
          <h2 className={styles.hdr}>Refine:</h2>
          <div className={styles.close}>
            <Button css="filterList" onClick={handleClose}>
              X
            </Button>
          </div>
        </div>
        <ul className={styles.filterList}>
          <li>
            <PriceFilter
              setFilters={setFilters}
              filters={filters}
              reset={filters.reset}
            />
          </li>
          <li>
            <RatingFilter
              setFilters={setFilters}
              filters={filters}
              reset={filters.reset}
            />
          </li>
          {!urlVariety && !filters.variety && (
            <li>
              <VarietyFilter
                setFilters={setFilters}
                filters={filters}
                reset={filters.reset}
                initialData={initialData}
              />
            </li>
          )}
        </ul>
      </div>
    </section>
  );
};

export default FilterList;
