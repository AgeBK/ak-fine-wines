import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { increment, selectCart } from "../../slices/cartSlice";
import all from "../../data/allProducts.json";
import { WineBlurb } from "../../data/appData.json";
import AddToCart from "../AddToCart";
import Img from "../Image";
import Button from "../Button";
import Sort from "../Sort";
import PriceDrop from "../PriceDrop";
import PriceFilter from "../Filters/Price";
import Price from "../Price";
import PageNumber from "../PageNumber";
import RatingFilter from "../Filters/Rating";
import VarietyFilter from "../Filters/Variety";
import styles from "./Category.module.css";
// import Price from "../Price";// import Error from "../Error";

function Category() {
  console.log("Category");
  const [initial, setInitial] = useState([]);
  const [filtered, setFiltered] = useState(null);
  const [filters, setFilters] = useState({});
  const [paging, setPaging] = useState({ page: 1, pageSize: 40 });
  const { id: urlId } = useParams();
  console.log(filters);

  useEffect(() => {
    console.log("Category UE");
    let arr = [];

    switch (urlId) {
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
              category.toLowerCase() === urlId &&
              isBundle === false &&
              packaging !== "Cask"
          )
          .sort((a, b) => (a.ratings.average > b.ratings.average ? -1 : 1));
        break;
      default:
        break;
    }
    console.log(arr);
    setInitial([...arr]);
  }, [urlId]);

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

  const ResultsPP = () => {
    const pageSizes = [20, 40, 60, 80];

    const handlePageSize = ({ target: { textContent } }) => {
      console.log(textContent);
      setPaging({ page: 1, pageSize: Number(textContent) }); //{ page: 1, pageSize: 40 }
    };

    return pageSizes.map((val) => (
      <Button css="resultsPP" onClick={handlePageSize} key={`btn${val}`}>
        {paging.pageSize === val ? <span>{val}</span> : val}
      </Button>
    ));
  };

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

  return (
    <article>
      <div className={styles.hdrCont}>
        <h2 className={styles.variety}>{urlId.replace("-", " ")}</h2>
        <div className={styles.varietyBlurb}>{WineBlurb[urlId]} </div>
      </div>
      <div className={styles.detailsCont}>
        <div className={styles.info}>
          <Pills />
          <span className={styles.results}>({data.length}) Available</span>
        </div>
        <div className={styles.resultsPP}>Results per page:</div>
        <div className={styles.resultsPPBtns}>
          <ResultsPP />
        </div>
        <div className={styles.sort}>Sort:</div>
        <Sort initial={initial} setInitial={setInitial} />
      </div>
      <div className={styles.categoryCont}>
        <section className={styles.filter}>
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
            <li>
              <VarietyFilter
                setFilters={setFilters}
                filters={filters}
                reset={filters.reset}
                initial={initial}
              />
            </li>
          </ul>
        </section>
        <section className={styles.container}>
          {pagedData?.map(
            ({
              id,
              name,
              shortName,
              brand,
              ratings: { average },
              price: { current, normal },
              promotion: { calloutText },
            }) => {
              return (
                <div className={styles.category} key={id}>
                  {current !== normal ||
                    (calloutText && <PriceDrop calloutText={calloutText} />)}
                  <Img
                    image={`wine/${id}.jpg`}
                    imageStyle="campaignMini"
                    imageAlt="AK Fine Wines"
                  />
                  <Link to="/" className={styles.itemCont}>
                    {/* // TODO:  */}
                    {urlId === "two-for-deals" && (
                      <h2 className={styles.deals}>{calloutText}</h2>
                    )}
                    <h2 className={styles.brand}>{brand}</h2>
                    <h3 className={styles.shortName}>{shortName}</h3>
                    {average && Math.round(average) > 2 ? (
                      <Img
                        image={`bg/${Math.round(average)}star.jpg`}
                        imageStyle="block"
                        imageAlt="AK Fine Wines"
                      />
                    ) : null}
                  </Link>
                  <Price current={current} normal={normal} />
                  <AddToCart id={id} name={name} current={current} />
                </div>
              );
            }
          )}
          <div className={styles.pageFooter}>
            <PageNumber data={data} paging={paging} setPaging={setPaging} />
          </div>
        </section>
      </div>
    </article>
  );
}
export default Category;
