import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { increment, selectCart } from "../../slices/cartSlice";
import all from "../../data/allProducts.json";
import { blurb } from "../../data/appData.json";
import { hyphenate, deHyphenate } from "../../data/functions";
import ProductList from "../ProductList";
import AddToCart from "../AddToCart";
import Img from "../Image";
import Button from "../Button";
import Sort from "../Sort";
import PriceDrop from "../PriceDrop";
import PriceFilter from "../Filters/Price";
import Price from "../Price";
import PageNumber from "../PageNumber";
import ResultsPP from "../ResultsPP";
import RatingFilter from "../Filters/Rating";
import VarietyFilter from "../Filters/Variety";
import styles from "./Category.module.css";
import FilterList from "../Filters/FilterList";
// import Price from "../Price";// import Error from "../Error";

function Category() {
  console.log("Category");
  const [initial, setInitial] = useState([]);
  const [filtered, setFiltered] = useState(null);
  const [filters, setFilters] = useState({});
  const [paging, setPaging] = useState({ page: 1, pageSize: 40 });
  const { category: urlCategory, variety: urlVariety } = useParams();
  console.log(filters);
  console.log(urlCategory, urlVariety);

  const arr = [];
  all.forEach(
    ({ variety }) => arr.indexOf(variety) === -1 && arr.push(variety)
  );
  console.log(arr.sort());

  useEffect(() => {
    console.log("Category UE");
    let arr = [];

    if (urlVariety) {
      arr = all.filter(
        ({ variety }) => hyphenate(variety.toLowerCase()) === urlVariety
      );
    } else if (
      urlCategory.includes("two-for") &&
      urlCategory !== "two-for-deals"
    ) {
      const price = Number(urlCategory.split("-")[2]);
      arr = all.filter(({ price: { twoFor } }) => twoFor === price);
    } else {
      switch (urlCategory) {
        case "two-for-deals":
          arr = all.filter(
            ({ promotion: { calloutText } }) =>
              calloutText && calloutText.startsWith("2 for")
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
    setInitial([...arr]);
  }, [urlCategory, urlVariety]);

  useEffect(() => {
    console.log("UE price rating Filter");
    const { price, rating, variety } = filters;
    let arr = [...initial];

    if (price) {
      const [min, max] = price.split("-");
      arr = arr.filter(
        ({ price: { current } }) => current >= min && current < max
      );
      console.log(arr);
    }

    if (rating) {
      arr = arr.filter(
        ({ ratings: { average } }) => Math.round(average) === Number(rating)
      );
      console.log(arr);
    }

    if (variety) {
      arr = arr.filter(({ variety: wineType }) => wineType === variety);
      console.log(arr);
    }

    setFiltered(arr);
  }, [filters, setFilters, initial]);

  // useEffect(() => {}, [paging]);

  let data = filtered || initial;

  const pagedData = data.slice(
    (paging.page - 1) * paging.pageSize,
    paging.page * paging.pageSize
  );

  console.log(pagedData);

  const handleRemoveFilter = (val) => {
    console.log(val);
    val === "all"
      ? setFilters({ reset: true })
      : setFilters({ ...filters, [val]: null, reset: true });
  };

  const Pills = () => {
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
      html.push(
        <Button css="link" onClick={() => handleRemoveFilter("all")}>
          Clear all
        </Button>
      );
      return <div className={styles.pillCont}>{html}</div>;
    }
    return null;
  };

  const Blurb = () => {
    const wineCategory = blurb[urlCategory];
    const wineVariety = blurb[urlVariety];

    return (
      <>
        <h2 className={styles.variety}>{urlVariety || urlCategory}</h2>
        <div className={styles.varietyBlurb}>{wineVariety || wineCategory}</div>
      </>
    );
  };

  return (
    <article>
      <section className={styles.hdrCont}>
        <Blurb />
      </section>

      <div className={styles.categoryCont}>
        <FilterList
          initial={initial}
          filters={filters}
          setFilters={setFilters}
          urlVariety={urlVariety}
        />
        <section className={styles.productsCont}>
          <div className={styles.detailsCont}>
            <Pills />
            <span className={styles.results}>({data.length}) Available</span>
            <div className={styles.sort}>Sort:</div>
            <Sort initial={initial} setInitial={setInitial} />
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
