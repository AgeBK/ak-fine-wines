import { useEffect, useState } from "react";
import { useGetWinesQuery } from "../../services/API";
import { useParams } from "react-router-dom";
import useMobileView from "../../hooks/useMobileView";
import { categoryPageData } from "../../data/utils";
import { MAX_MOBILE_WIDTH } from "../../data/appData.json";
import ProductList from "../ProductList";
import Sort from "../Sort";
import Pills from "../Pills";
import Blurb from "../Blurb";
import PageNumber from "../PageNumber";
import ResultsPP from "../ResultsPP";
import styles from "./Category.module.css";
import FilterList from "../Filters/FilterList";
import Button from "../Button";
// import Price from "../Price";
// import Error from "../Error"; TODO: error handling
// TODO: incorrect URL,what happens http://localhost:5173/Blue ?? zero results

function Category() {
  const { data } = useGetWinesQuery();
  const [initialData, setInitialData] = useState([]);
  const [filtered, setFiltered] = useState(null);
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
    setFilters({});
    setPaging({ page: 1, pageSize: 40 });
    setInitialData(arr);
  }, [urlCategory, urlVariety, data]);

  useEffect(() => {
    const { price, rating, variety } = filters;
    let arr = [...initialData];

    if (price) {
      const [min, max] = price.split("-");
      arr = arr.filter(
        ({ price: { current } }) => current >= min && current < max
      );
    }

    if (rating) {
      arr = arr.filter(
        ({ ratings: { average } }) => Math.round(average) === Number(rating)
      );
    }

    if (variety) {
      arr = arr.filter(({ variety: wineType }) => wineType === variety);
    }

    setFiltered(arr);
  }, [filters, initialData]);

  const currentData = filtered || initialData;
  const pagedData = currentData.slice(
    (paging.page - 1) * paging.pageSize,
    paging.page * paging.pageSize
  );

  const updateFilters = (filter) => setFilters({ ...filters, ...filter });

  const removeFilters = (val) => {
    val === "all" ? setFilters({}) : setFilters({ ...filters, [val]: null });
  };

  const scroll = () => window.scrollTo(0, 0);

  const updatePaging = ({ page, pageSize }) => {
    scroll();
    setPaging({ page, pageSize });
  };

  const toggleFilter = () => {
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
          <Button css="filters" onClick={toggleFilter}>
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
              <Sort currentData={currentData} setInitialData={setInitialData} />
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
              <div className={styles.noResults}>Sorry, no results:</div> // TODO:
            )}
          </section>
        )}
      </div>
    </article>
  );
}
export default Category;
