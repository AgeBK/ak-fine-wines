import { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import useAutoComplete from "../../hooks/useAutoComplete";
import { Link } from "react-router-dom";
import Nav from "../Nav";
import Img from "../../components/Image";
import Cart from "../Cart";
import all from "../../data/allProducts.json";
import styles from "./Header.module.css";

const Header = () => {
  const [initial, setInitial] = useState([]);
  const [data, setData] = useState([]);

  const maxResults = 10;

  const test = all.map(({ name, id }) => {
    return { title: name, id };
  });

  console.log(test);

  const {
    bindInput,
    bindOptions,
    bindOption,
    isBusy,
    suggestions,
    selectedIndex,
  } = useAutoComplete({
    onChange: (value) => console.log(value),
    source: (search) =>
      all
        .map(({ name, id }) => {
          return { label: name, id };
        })
        .filter((val) =>
          val.label.toLowerCase().includes(search.toLowerCase())
        ),
    // .slice(0, maxResults),
  });

  useEffect(() => {
    let wineList = all.map(({ name, id }) => {
      return { label: name, id };
    });
    console.log(wineList);
    setInitial(wineList);
    setData(wineList);
  }, []);

  // .slice(0, 1000);

  // .sort();

  const handleChange = (e) => {
    console.log(e.target.value);
    const { value } = e.target;
    console.log(value);
    //if (value.length < 3) {
    const arr = initial.filter(({ label }) => {
      console.log(label);
      return label.toLowerCase().includes(value.toLowerCase());
    });
    console.log(arr);
    setData(arr);
    //}
  };
  return (
    <header className={styles.header}>
      <div className={styles.headerRow}>
        <div className={styles.logo}>
          <Link to="/">
            <Img
              image={"logos/AK.png"}
              imageStyle="logo"
              imageAlt="AK Fine Wines"
            />
          </Link>
        </div>
        <h1 className={styles.hdr}>
          AK <span>FINE WINES</span>
        </h1>
        {/* <div className={styles.searchCont}>
          <input
            placeholder="Search"
            className={styles.searchInput}
            {...bindInput}
          />
          {isBusy && <div className={styles.searchBusy}>Loading...</div>}
          <ul {...bindOptions} className={styles.searchResults}>
            {suggestions.map((_, index) => (
              <li
                className={selectedIndex === index ? styles.selected : null}
                key={index}
                {...bindOption}
              >
                <div>{suggestions[index].label}</div>
              </li>
            ))}
          </ul>
        </div> */}

        <Autocomplete
          disablePortal
          autoComplete={true}
          autoHighlight={true}
          className={styles.autoComplete}
          options={data}
          onInputChange={handleChange}
          renderInput={(params) => (
            <TextField label="What are you looking for?" {...params} />
          )}
        ></Autocomplete>
        <div className={styles.cartCont}>
          <Cart />
        </div>
      </div>
      <Nav />
    </header>
  );
};

export default Header;
