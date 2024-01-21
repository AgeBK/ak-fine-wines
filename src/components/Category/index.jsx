import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import all from "../../data/allProducts.json";
import { blurb } from "../../data/appData.json";
import { hyphenate, deHyphenate } from "../../data/functions";
import ProductList from "../ProductList";
import Sort from "../Sort";
import Pills from "../Pills";
import PageNumber from "../PageNumber";
import ResultsPP from "../ResultsPP";
import styles from "./Category.module.css";
import FilterList from "../Filters/FilterList";
// import Price from "../Price";// import Error from "../Error";

function Category() {
  console.log("Category");
  const [initialData, setInitialData] = useState([]);
  const [filtered, setFiltered] = useState(null);
  const [filters, setFilters] = useState({});
  const [paging, setPaging] = useState({ page: 1, pageSize: 40 });
  const { category: urlCategory, variety: urlVariety } = useParams();
  console.log(urlCategory, urlVariety);
  console.log(location.search);

  // only promotions that start with a number
  const promotions = all.map((val) => {
    const { calloutText } = val.promotion;
    val.price.percentOff = 0;
    val.price.tenFor = 0;

    if (calloutText) {
      if (calloutText.startsWith("10%")) {
        val.price.percentOff = 10;
      }
      if (calloutText.startsWith("10 for $100")) {
        val.price.tenFor = 100;
      }
    }

    delete val.price.acrossAnySix;
    delete val.price.memberOnlyPrice;
    delete val.unitOfMeasure;
    delete val.cartLimit;
    delete val.productUrl;

    return val;
  });

  console.log(promotions);

  useEffect(() => {
    console.log("Category UE");
    const sp = new URLSearchParams(location.pathname.substring(1));
    let arr = [];

    // firstly check if theres a variety(sub category) to filter by
    if (urlVariety) {
      // filter by wine variety or wine brand
      arr = all.filter(
        ({ variety, brand }) =>
          hyphenate(variety.toLowerCase()) === urlVariety ||
          brand.toLowerCase() === urlVariety
      );
    } else if (sp.has("search")) {
      // filter by search param
      const query = sp.get("search");
      arr = all.filter(({ name }) =>
        name.toLowerCase().includes(query.toLowerCase())
      );
      console.log(arr);
    } else if (
      // filter by 2 for XX deals
      urlCategory.startsWith("two-for") &&
      urlCategory !== "two-for-deals"
    ) {
      const price = Number(urlCategory.split("-")[2]); // TODO: two for XX didn't load any items twice, check
      arr = all.filter(({ price: { twoFor } }) => twoFor === price);
    } else {
      switch (urlCategory) {
        case "two-for-deals":
          arr = all.filter(
            ({ promotion: { calloutText } }) =>
              calloutText && calloutText.startsWith("2 for")
          );
          break;
        case "ten-percent-off":
          arr = all.filter(
            ({ promotion: { calloutText } }) =>
              calloutText && calloutText.startsWith("10% OFF")
          );
          break;
        case "ten-for-100":
          arr = all.filter(
            ({ promotion: { calloutText } }) =>
              calloutText && calloutText === "10 for $100"
          );
          break;
        case "sale-items":
          arr = all.filter(
            ({ price: { current, normal } }) => current !== normal
          );
          break;
        case "white":
        case "red":
        case "sparkling":
          arr = all.filter(
            ({ category, isBundle, packaging }) =>
              category.toLowerCase() === urlCategory &&
              isBundle === false &&
              packaging !== "Cask"
          );
          break;
        default:
          break;
      }
    }

    arr.sort((a, b) => (a.ratings.average > b.ratings.average ? -1 : 1));

    console.log(arr);
    setFilters({ reset: true });
    setInitialData([...arr]);
  }, [urlCategory, urlVariety]);

  useEffect(() => {
    console.log("UE price rating Filter");
    const { price, rating, variety } = filters;
    let arr = [...initialData];

    if (price) {
      const [min, max] = price.split("-");
      arr = arr.filter(
        ({ price: { current } }) => current >= min && current < max
      );
      //console.log(arr);
    }

    if (rating) {
      arr = arr.filter(
        ({ ratings: { average } }) => Math.round(average) === Number(rating)
      );
      //console.log(arr);
    }

    if (variety) {
      arr = arr.filter(({ variety: wineType }) => wineType === variety);
      //console.log(arr);
    }

    setFiltered(arr);
  }, [filters, setFilters, initialData]);

  let data = filtered || initialData;
  const pagedData = data.slice(
    (paging.page - 1) * paging.pageSize,
    paging.page * paging.pageSize
  );

  const handleRemoveFilter = (val) => {
    console.log(val);
    val === "all"
      ? setFilters({ reset: true })
      : setFilters({ ...filters, [val]: null, reset: true });
  };

  const Blurb = () => {
    const wineCategory = blurb[urlCategory]; // TODO: 2 for deals, no blurb
    const wineVariety = blurb[urlVariety];

    if (
      urlCategory.includes("two-for") &&
      !urlCategory.includes("two-for-deals")
    ) {
      console.log("yEaH bOi");
    }

    return (
      <>
        <h2 className={styles.variety}>
          {deHyphenate(urlVariety) || deHyphenate(urlCategory)}
        </h2>
        <div className={styles.varietyBlurb}>{wineVariety || wineCategory}</div>
      </>
    );
  };

  return (
    <article>
      <section className={styles.categoryBlurb}>
        <Blurb />
      </section>
      <div className={styles.categoryCont}>
        <FilterList
          initialData={initialData}
          filters={filters}
          setFilters={setFilters}
          urlVariety={urlVariety}
        />
        <section className={styles.categoryItems}>
          <div className={styles.detailsCont}>
            <Pills filters={filters} handleRemoveFilter={handleRemoveFilter} />
            <span className={styles.results}>({data.length}) Available</span>
            <div className={styles.sort}>Sort:</div>
            <Sort initialData={initialData} setInitialData={setInitialData} />
          </div>
          <ProductList arr={pagedData} />
          <div className={styles.categoryFooter}>
            <div className={styles.pageNumCont}>
              <PageNumber data={data} paging={paging} setPaging={setPaging} />
            </div>
            <div className={styles.resultsPPCont}>
              <div className={styles.resultsPP}>Results per page:</div>
              <div className={styles.resultsPPBtns}>
                <ResultsPP paging={paging} setPaging={setPaging} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}
export default Category;
