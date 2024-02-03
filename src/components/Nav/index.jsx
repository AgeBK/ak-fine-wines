import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { navObj } from "../../data/appData.json";
import styles from "./Nav.module.css";

function Nav() {
  const ref = useRef(null);
  const [isHover, setIsHover] = useState({});

  const onHover = useCallback((e, hover) => {
    const { id } = e.target;
    hover ? setIsHover(id) : setIsHover(null);
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
