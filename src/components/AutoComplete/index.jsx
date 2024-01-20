import { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { createFilterOptions } from "@mui/material/Autocomplete";
import { hyphenate } from "../../data/functions";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import all from "../../data/allProducts.json";
import { useNavigate } from "react-router-dom";
import Img from "../../components/Image";
import styles from "./AutoComplete.module.css";

function AutoComplete() {
  console.log("AutoComplete");
  const [overlay, setOverlay] = useState(false);
  const navigate = useNavigate();

  let data = all.map(({ name, id, category, variety }) => {
    return { name, id, category, variety };
  });

  const handleClick = () => setOverlay(true);

  const handleBlur = () => setOverlay(false);

  const handleChange = (_, val) => {
    const { category, variety, id } = val;
    setOverlay(false);
    navigate(`/${category.toLowerCase()}/${hyphenate(variety)}/${id}`);
  };

  const handleKeyDown = (e) => {
    const {
      key,
      target: { value },
    } = e;

    if (key === "Enter" && value) {
      setOverlay(false);
      navigate(`/search=${value}`);
    }
  };

  return (
    <section className={styles.container}>
      <div className={overlay ? styles.overlay : ""}></div>
      <Autocomplete
        // disablePortal
        // autoComplete={true}
        // autoHighlight={true}
        // open={open}
        // includeInputInList
        onChange={(e, value) => handleChange(e, value)}
        // onInputChange={(e, value) => handleInputChange(e, value)}
        onKeyDown={handleKeyDown}
        getOptionLabel={(option) => option.name}
        className={styles.autoComplete}
        options={data}
        filterOptions={createFilterOptions({
          limit: 7,
        })}
        renderOption={(
          props,
          { id, name, category, variety },
          { inputValue }
        ) => {
          const matches = match(name, inputValue);
          const parts = parse(name, matches);
          return (
            <li
              key={id}
              {...props}
              className={styles.listItem}
              // onClick={handleSelect}
              // onKeyDown={handleSelect}
              // tabIndex={0}
            >
              {/* <Link
                to={`/${category.toLowerCase()}/${hyphenate(variety)}/${id}`}
              > */}
              <div className={styles.itemCont}>
                <div className={styles.itemImg}>
                  <Img
                    image={`wine/${id}.jpg`}
                    imageStyle="autoComplete"
                    imageAlt={name}
                  />
                </div>
                <div className={styles.itemLabel}>
                  {parts.map((part, index) => (
                    <span
                      key={index}
                      style={{
                        fontWeight: part.highlight ? 700 : 400,
                      }}
                    >
                      {part.text}
                    </span>
                  ))}
                </div>
              </div>
              {/* </Link> */}
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
    </section>
  );
}

export default AutoComplete;
