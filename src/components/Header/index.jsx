import { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { createFilterOptions } from "@mui/material/Autocomplete";
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
  const [overlay, setOverlay] = useState(false);

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
    let wineList = all.map(({ name, id, category, variety }) => {
      return { label: name, id, category, variety };
    });
    console.log(wineList);
    setInitial(wineList);
    setData(wineList);
  }, []);

  // .slice(0, 1000);

  // .sort();

  // const handleChange = (e) => {
  //   console.log(e.target.value);

  //   //}
  // };

  const handleClick = () => {
    setOverlay(true);
  };

  const handleBlur = () => {
    setOverlay(false);
  };

  return (
    <header className={styles.header}>
      <div className={overlay ? styles.overlay : ""}></div>

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

        <Autocomplete
          // disablePortal
          // autoComplete={true}
          // autoHighlight={true}
          onChange={(e, value) => console.log(e.target, value.title)}
          className={styles.autoComplete}
          options={data}
          filterOptions={createFilterOptions({
            limit: 7,
          })}
          renderOption={(props, { id, label, category, variety }) => {
            return (
              <li key={id} {...props}>
                <Link
                  to={`/${category.toLowerCase()}/${variety.toLowerCase()}/${id}`}
                >
                  <div className={styles.itemCont}>
                    <div className={styles.itemImg}>
                      <Img
                        image={`wine/${id}.jpg`}
                        imageStyle="autoComplete"
                        imageAlt={label}
                      />
                    </div>
                    <div className={styles.itemLabel}>{label}</div>
                  </div>
                </Link>
              </li>
            );
          }}
          renderInput={(params) => (
            <TextField
              label="What are you looking for?"
              {...params}
              onClick={handleClick}
              onBlur={handleBlur}
            />
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
