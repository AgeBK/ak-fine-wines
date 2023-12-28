import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useParams } from "react-router-dom";

import styles from "./Nav.module.css";

function Nav() {
  const ref = useRef(null);
  const [isHover, setIsHover] = useState({});
  const navObj = {
    White: [
      "https://cdn-icons-png.flaticon.com/128/11626/11626148.png",
      "https://cdn-icons-gif.flaticon.com/11626/11626148.gif",
    ],
    Red: [
      "https://cdn-icons-png.flaticon.com/128/11626/11626130.png",
      "https://cdn-icons-gif.flaticon.com/11626/11626130.gif",
    ],
    Sparkling: [
      "https://cdn-icons-png.flaticon.com/128/13121/13121461.png",
      "https://cdn-icons-gif.flaticon.com/13121/13121461.gif",
    ],
  };

  const onHover = useCallback((e, hover) => {
    const { id } = e.target;
    if (hover) {
      setIsHover(id);
    } else {
      // setIsHover({ [id]: false });
      setIsHover(null);
    }
  }, []);

  useEffect(() => {
    if (ref.current) {
      const elem = ref.current;

      [...elem.childNodes].map((child) => {
        if (child.tagName === "DIV") {
          child.addEventListener("mouseenter", (e) => onHover(e, true));
          child.addEventListener("mouseleave", (e) => onHover(e, false));
        }
      });

      return () => {
        [...elem.childNodes].map((child) => {
          if (child.tagName === "DIV") {
            child.removeEventListener("mouseenter", (e) => onHover(e, true));
            child.removeEventListener("mouseleave", (e) => onHover(e, false));
          }
        });
      };
    }
  }, [onHover]);
  return (
    <nav className={styles.nav} ref={ref}>
      {Object.entries(navObj).map((val, ind) => {
        const [variety] = val;
        const [img1, img2] = val[1];
        const id = `item${ind}`;
        return (
          <div
            className={`${styles.navItem} ${
              isHover === id ? styles.hover : ""
            }`}
            id={id}
            key={id}
          >
            <Link to={`/${variety.toLowerCase()}`}>
              <img
                src={img1}
                alt={variety}
                title={variety}
                className={styles.icon}
              />
              <img
                src={img2}
                alt={variety}
                title={variety}
                className={styles.icon}
              />
              <span className={styles.variety}>
                {variety}
                <br />
                Wine
              </span>
            </Link>
          </div>
        );
      })}
    </nav>
  );
}

export default Nav;
