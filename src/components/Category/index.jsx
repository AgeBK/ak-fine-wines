import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { categoryURLs } from "../../data/utils";
import ProductList from "../ProductList";
import Sort from "../Sort";
import Pills from "../Pills";
import Blurb from "../Blurb";
import PageNumber from "../PageNumber";
import ResultsPP from "../ResultsPP";
import styles from "./Category.module.css";
import FilterList from "../Filters/FilterList";
import Button from "../Button";
import { useGetWinesQuery } from "../../services/API";
// import Error from "../Error"; TODO: error handling
// TODO: incorrect URL,what happens http://localhost:5173/Blue ?? zero results

function Category() {
  const MAX_MOBILE_WIDTH = 650;
  let showFilterBtnRef = useRef(window.innerWidth < MAX_MOBILE_WIDTH);
  const [initialData, setInitialData] = useState([]);
  const [filtered, setFiltered] = useState(null);
  const [filters, setFilters] = useState({});
  const [paging, setPaging] = useState({ page: 1, pageSize: 40 });
  const [customHeader, setCustomHeader] = useState("");
  const [mobileView, setMobileView] = useState({
    filters: !showFilterBtnRef.current,
    items: true,
  });
  const { category: urlCategory, variety: urlVariety } = useParams();
  const { data } = useGetWinesQuery();

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < MAX_MOBILE_WIDTH;
      if (showFilterBtnRef.current !== isMobile) {
        showFilterBtnRef.current = isMobile;
        setMobileView({ filters: isMobile ? false : true, items: true });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    console.log("Category UE");
    const sp = new URLSearchParams(location.pathname.substring(1));
    let arr = [];
    let header = "";

    if (urlVariety) {
      // filter by wine variety or wine brand
      arr = categoryURLs["urlVariety"](data, urlVariety);
    } else if (sp.has("search")) {
      // filter by search param
      const query = sp.get("search");
      arr = categoryURLs["search"](data, query);
      header = `results: ${query}`;
    } else if (
      // filter by 2 for XX deals
      urlCategory.startsWith("two-for") &&
      urlCategory !== "two-for-deals"
    ) {
      const price = Number(urlCategory.split("-")[2]);
      arr = categoryURLs["two-for-price"](data, price);
      header = `2 for $${price}`;
    } else {
      switch (urlCategory) {
        case "two-for-deals":
          arr = categoryURLs["two-for-deals"](data);
          header = "2 for Deals";
          break;
        case "ten-percent-off":
          arr = categoryURLs["ten-percent-off"](data);
          header = "10% OFF";
          break;
        case "10-and-less":
          arr = categoryURLs["ten-and-less"](data);
          header = "$10 and less";
          break;
        case "ten-for-100":
          arr = categoryURLs["ten-for-100"](data);
          header = "10 for $100";
          break;
        case "price-drop":
          arr = categoryURLs["price-drop"](data);
          break;
        case "white":
        case "red":
        case "sparkling":
          arr = arr = categoryURLs["category"](data, urlCategory);
          break;
        default:
          break;
      }
    }

    arr.sort((a, b) => (a.ratings.average > b.ratings.average ? -1 : 1));
    setCustomHeader(header);
    setFilters({ reset: true });
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

  const pagedData = (filtered || initialData).slice(
    (paging.page - 1) * paging.pageSize,
    paging.page * paging.pageSize
  );

  const updateFilters = (filter) => setFilters({ ...filters, ...filter });

  const removeFilters = (val) => {
    console.log(val);
    val === "data"
      ? setFilters({ reset: true })
      : setFilters({ ...filters, [val]: null, reset: true });
  };

  const toggleFilter = () => {
    const { filters, items } = mobileView;
    console.log(filters, items);
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
      {showFilterBtnRef.current && (
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
            initialData={data}
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
              <span className={styles.results}>({data.length}) Available</span>
              <div className={styles.sort}>Sort:</div>
              <Sort initialData={initialData} setInitialData={setInitialData} />
            </div>
            {data.length > 0 ? (
              <>
                <ProductList arr={pagedData} />
                <div className={styles.categoryFooter}>
                  <div className={styles.pageNumCont}>
                    <PageNumber
                      data={data}
                      paging={paging}
                      setPaging={setPaging}
                    />
                  </div>
                  <div className={styles.resultsPPCont}>
                    <div className={styles.resultsPP}>Results per page:</div>
                    <div className={styles.resultsPPBtns}>
                      <ResultsPP paging={paging} setPaging={setPaging} />
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
