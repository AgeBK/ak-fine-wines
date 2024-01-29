import { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { createFilterOptions } from "@mui/material/Autocomplete";
import { hyphenate } from "../../data/utils";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import all from "../../data/allProducts.json";
import { useNavigate } from "react-router-dom";
import Img from "../../components/Image";
import styles from "./AutoComplete.module.css";

function AutoComplete() {
  const [overlay, setOverlay] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  let data = all.map(({ name, id, category, variety, packaging }) => {
    return { name, id, category, variety, packaging };
  });

  const handleClick = () => setOverlay(true);

  const handleBlur = () => setOverlay(false);

  const handleChange = (e, val) => {
    if (val) {
      const { category, variety, id } = val;
      setOverlay(false);
      setOpen(false);
      navigate(`/${category.toLowerCase()}/${hyphenate(variety)}/${id}`);
    }
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
        open={open}
        // includeInputInList
        onChange={(e, value) => handleChange(e, value)}
        onInputChange={(_, value) => {
          if (value.length <= 1) {
            if (open) setOpen(false);
          } else {
            if (!open) setOpen(true);
          }
        }}
        onKeyDown={handleKeyDown}
        getOptionLabel={(option) => option.name}
        className={styles.autoComplete}
        options={data}
        filterOptions={createFilterOptions({
          limit: 7,
        })}
        renderOption={(props, { id, name, packaging }, { inputValue }) => {
          const matches = match(name, inputValue);
          const parts = parse(name, matches);
          return (
            <li key={id} {...props} className={styles.listItem}>
              <div className={styles.itemCont}>
                <div className={styles.itemImg}>
                  <Img
                    image={`wine/${id}.jpg`}
                    imageStyle={packaging === "Bottle" ? "acBottle" : "acCask"}
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
