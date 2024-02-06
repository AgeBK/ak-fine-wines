import { useEffect, useState, useMemo, useRef } from "react";
import { useGetWinesQuery } from "../../services/API";
import { useParams, Link } from "react-router-dom";
import useMobileView from "../../hooks/useMobileView";
import {
  categoryPageData,
  sortCategoryPageData,
  filterCategoryPageData,
} from "../../data/utils";
import { MAX_MOBILE_WIDTH, pagingSettings } from "../../data/appData.json";
import ProductList from "../ProductList";
import Sort from "../Sort";
import Pills from "../Pills";
import Blurb from "../Blurb";
import PageNumber from "../PageNumber";
import ResultsPP from "../ResultsPP";
import FilterList from "../Filters/FilterList";
import Button from "../Button";
import styles from "./Category.module.css";

function Category() {
  const { data } = useGetWinesQuery();
  const [sortName, setSortName] = useState("");
  const [filters, setFilters] = useState({});
  const [paging, setPaging] = useState(pagingSettings);
  const [mobileView, setMobileView] = useState({});
  const { category: urlCategory, variety: urlVariety } = useParams();
  const isMobileView = useMobileView(MAX_MOBILE_WIDTH);
  const dataRef = useRef([]);
  const headerRef = useRef("");

  useEffect(() => {
    setMobileView({ filters: !isMobileView, items: true });
  }, [isMobileView]);

  if (dataRef.current.length === 0) {
    const [arr, header] = categoryPageData(data, urlCategory, urlVariety);
    arr.sort((a, b) => (a.ratings.average > b.ratings.average ? -1 : 1));
    dataRef.current = arr;
    headerRef.current = header;
  }

  useEffect(() => {
    // reset page
    setSortName("");
    setFilters({});
    setPaging(pagingSettings);
    dataRef.current = [];
    headerRef.current = "";
  }, [urlCategory, urlVariety]);

  const currentData = useMemo(() => {
    let arr = [...dataRef.current];
    if (arr.length) {
      if (Object.keys(filters).length) {
        arr = filterCategoryPageData(arr, filters);
      }
      if (sortName) {
        arr = sortCategoryPageData(arr, sortName);
      }
    }
    return arr;
  }, [filters, sortName]);

  const pagedData = dataRef.current?.slice(
    (paging.page - 1) * paging.pageSize,
    paging.page * paging.pageSize
  );

  const updateFilters = (filter) => setFilters({ ...filters, ...filter });

  const removeFilters = (val) => {
    if (val === "all") {
      setFilters({});
    } else {
      delete filters[val];
      setFilters({ ...filters });
    }
  };

  const updatePaging = ({ page, pageSize }) => {
    window.scrollTo(0, 0);
    setPaging({ page, pageSize });
  };

  const togglePageItems = () => {
    // either show filters or items on small screen
    const { filters, items } = mobileView;
    setMobileView({ filters: !filters, items: !items });
  };

  return (
    <article>
      <section className={styles.categoryBlurb}>
        <Blurb
          urlCategory={urlCategory}
          urlVariety={urlVariety}
          header={headerRef.current}
        />
      </section>
      {isMobileView && (
        <div className={styles.smlScreen}>
          <Button css="filters" onClick={togglePageItems}>
            {mobileView.filters ? (
              <span className={styles.close}>X</span>
            ) : (
              "Filters"
            )}
          </Button>
        </div>
      )}
      <div className={styles.category}>
        {mobileView.filters && (
          <FilterList
            currentData={currentData}
            filters={filters}
            setFilters={setFilters}
            urlVariety={urlVariety}
            updateFilters={updateFilters}
          />
        )}
        {mobileView.items && (
          <section className={styles.categoryItems}>
            <div className={styles.detailsCont}>
              <Pills filters={filters} removeFilters={removeFilters} />
              <span className={styles.results}>
                ({currentData.length}) Available
              </span>
              <div className={styles.sort}>Sort:</div>
              <Sort sortName={sortName} setSortName={setSortName} />
            </div>
            {currentData.length > 0 ? (
              <>
                <ProductList arr={pagedData} />
                <div className={styles.categoryFooter}>
                  <div className={styles.pageNumCont}>
                    <PageNumber
                      currentData={currentData}
                      paging={paging}
                      updatePaging={updatePaging}
                    />
                  </div>
                  <div className={styles.resultsPPCont}>
                    <div className={styles.resultsPP}>Results per page:</div>
                    <div className={styles.resultsPPBtns}>
                      <ResultsPP paging={paging} updatePaging={updatePaging} />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className={styles.noResults}>
                Sorry, no results:
                <br />
                <Link to="/" className={styles.link}>
                  Back to homepage
                </Link>
              </div>
            )}
          </section>
        )}
      </div>
    </article>
  );
}
export default Category;
