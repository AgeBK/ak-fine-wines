import PriceFilter from "../Price";
import RatingFilter from "../Rating";
import VarietyFilter from "../Variety";
import styles from "./FilterList.module.css";

const FilterList = ({ initial, filters, setFilters, urlVariety }) => {
  return (
    <section className={styles.container}>
      <h2 className={styles.hdr}>Refine:</h2>
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
        {!urlVariety && (
          <li>
            <VarietyFilter
              setFilters={setFilters}
              filters={filters}
              reset={filters.reset}
              initial={initial}
            />
          </li>
        )}
      </ul>
    </section>
  );
};

export default FilterList;
