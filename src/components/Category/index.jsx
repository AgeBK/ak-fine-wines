import { useEffect, useState, useMemo } from "react";
import { useGetWinesQuery } from "../../services/API";
import { useParams, Link } from "react-router-dom";
import useMobileView from "../../hooks/useMobileView";
import {
  categoryPageData,
  sortCategoryPageData,
  filterCategoryPageData,
} from "../../data/utils";
import { MAX_MOBILE_WIDTH } from "../../data/appData.json";
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
  const [pageData, setPageData] = useState([]);
  const [sortName, setSortName] = useState("");
  const [filters, setFilters] = useState({});
  const [paging, setPaging] = useState({ page: 1, pageSize: 40 });
  const [customHeader, setCustomHeader] = useState("");
  const [mobileView, setMobileView] = useState({});
  const { category: urlCategory, variety: urlVariety } = useParams();
  const isMobileView = useMobileView(MAX_MOBILE_WIDTH);

  useEffect(() => {
    setMobileView({ filters: !isMobileView, items: true });
  }, [isMobileView]);

  useEffect(() => {
    const [arr, header] = categoryPageData(data, urlCategory, urlVariety);
    arr.sort((a, b) => (a.ratings.average > b.ratings.average ? -1 : 1));

    setCustomHeader(header);
    setSortName("");
    setFilters({});
    setPaging({ page: 1, pageSize: 40 });
    setPageData(arr);
  }, [urlCategory, urlVariety, data]);

  const currentData = useMemo(() => {
    console.log("useMemo");
    let arr = [...pageData];
    if (arr.length) {
      if (Object.keys(filters).length) {
        arr = filterCategoryPageData(arr, filters);
      }
      if (sortName) {
        arr = sortCategoryPageData(arr, sortName);
      }
    }
    return arr;
  }, [filters, pageData, sortName]);

  const pagedData = currentData?.slice(
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
          customHeader={customHeader}
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
