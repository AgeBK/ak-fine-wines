import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { increment, selectCart } from "../../slices/cartSlice";
import all from "../../data/allProducts.json";
import { blurb } from "../../data/appData.json";
import { hyphenate, deHyphenate } from "../../data/functions";

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

  useEffect(() => {
    console.log("Category UE");
    let arr = [];

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
        arr = all
          .filter(
            ({ category, isBundle, packaging }) =>
              category.toLowerCase() === urlCategory &&
              isBundle === false &&
              packaging !== "Cask"
          )
          .sort((a, b) => (a.ratings.average > b.ratings.average ? -1 : 1));
        break;
      default:
        break;
    }

    if (urlVariety) {
      arr = arr.filter(({ variety }) => variety.toLowerCase() === urlVariety);
    }

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

  useEffect(() => {}, [paging]);

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

  const Blurb = () =>
    blurb[urlCategory] ? (
      <div className={styles.varietyBlurb}>{blurb[urlCategory]}</div>
    ) : null;

  return (
    <article>
      <section className={styles.hdrCont}>
        <h2 className={styles.variety}>{urlCategory.replace(/-/g, " ")}</h2>
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
          <div className={styles.products}>
            {pagedData?.map(
              ({
                id,
                category,
                variety,
                name,
                shortName,
                brand,
                ratings: { average },
                price: { current, normal },
                promotion: { calloutText },
              }) => {
                return (
                  <div className={styles.product} key={id}>
                    <Link
                      to={`/${category.toLowerCase()}/${hyphenate(
                        variety.toLowerCase()
                      )}/${id}`}
                      className={styles.itemCont}
                    >
                      {current !== normal ||
                        (calloutText && (
                          <PriceDrop calloutText={calloutText} />
                        ))}
                      <Img
                        image={`wine/${id}.jpg`}
                        imageStyle="campaignMini"
                        imageAlt="AK Fine Wines"
                      />

                      {/* // TODO:  */}
                      {urlCategory === "two-for-deals" && (
                        <h2 className={styles.deals}>{calloutText}</h2>
                      )}
                      <div className={styles.productMetaTODO}>
                        <h2 className={styles.brand}>{brand}</h2>
                        <h3 className={styles.shortName}>{shortName}</h3>
                        {average && Math.round(average) > 2 ? (
                          <Img
                            image={`bg/${Math.round(average)}star.jpg`}
                            imageStyle="block"
                            imageAlt="AK Fine Wines"
                          />
                        ) : null}
                      </div>
                    </Link>
                    <Price current={current} normal={normal} />
                    <div className={styles.addCont}>
                      <AddToCart id={id} name={name} current={current} />
                    </div>
                  </div>
                );
              }
            )}
          </div>
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
