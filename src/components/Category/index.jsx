import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import all from "../../data/allProducts.json";
import { categoryURLs } from "../../data/utils";
import ProductList from "../ProductList";
import Sort from "../Sort";
import Pills from "../Pills";
import Blurb from "../Blurb";
import PageNumber from "../PageNumber";
import ResultsPP from "../ResultsPP";
import styles from "./Category.module.css";
import FilterList from "../Filters/FilterList";
// import Price from "../Price";
// import Error from "../Error"; TODO: error handling

// TODO: incorrect URL,what happens http://localhost:5173/Blue ?? zero results

function Category() {
  console.log("Category");
  const [initialData, setInitialData] = useState([]);
  const [filtered, setFiltered] = useState(null);
  const [filters, setFilters] = useState({});
  const [paging, setPaging] = useState({ page: 1, pageSize: 40 });
  const [customHeader, setCustomHeader] = useState("");
  const { category: urlCategory, variety: urlVariety } = useParams();

  useEffect(() => {
    console.log("Category UE");
    const sp = new URLSearchParams(location.pathname.substring(1));
    let arr = [];
    let header = "";

    if (urlVariety) {
      // filter by wine variety or wine brand
      arr = categoryURLs["urlVariety"](all, urlVariety);
    } else if (sp.has("search")) {
      // filter by search param
      const query = sp.get("search");
      arr = categoryURLs["search"](all, query);
      header = `results: ${query}`;
    } else if (
      // filter by 2 for XX deals
      urlCategory.startsWith("two-for") &&
      urlCategory !== "two-for-deals"
    ) {
      const price = Number(urlCategory.split("-")[2]);
      arr = categoryURLs["two-for-price"](all, price);
      header = `2 for $${price}`;
    } else {
      switch (urlCategory) {
        case "two-for-deals":
          arr = categoryURLs["two-for-deals"](all);
          header = "2 for Deals";
          break;
        case "ten-percent-off":
          arr = categoryURLs["ten-percent-off"](all);
          header = "10% OFF";
          break;
        case "10-and-less":
          arr = categoryURLs["ten-and-less"](all);
          header = "$10 and less";
          break;
        case "ten-for-100":
          arr = categoryURLs["ten-for-100"](all);
          header = "10 for $100";
          break;
        case "price-drop":
          arr = categoryURLs["price-drop"](all);
          break;
        case "white":
        case "red":
        case "sparkling":
          arr = arr = categoryURLs["category"](all, urlCategory);
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
  }, [urlCategory, urlVariety]);

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

  let data = filtered || initialData;
  const pagedData = data.slice(
    (paging.page - 1) * paging.pageSize,
    paging.page * paging.pageSize
  );

  const removeFilters = (val) => {
    console.log(val);
    val === "all"
      ? setFilters({ reset: true })
      : setFilters({ ...filters, [val]: null, reset: true });
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
      <div className={styles.category}>
        <FilterList
          initialData={data}
          filters={filters}
          setFilters={setFilters}
          urlVariety={urlVariety}
        />
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
      </div>
    </article>
  );
}
export default Category;
