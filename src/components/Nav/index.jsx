import { Link } from "react-router-dom";
import { navArr } from "../../data/appData.json";
import styles from "./Nav.module.css";

function Nav() {
  const arr = navArr;

  return (
    <nav>
      <ul className={styles.nav}>
        {arr.map((val) => {
          const valLC = val.toLowerCase();
          return (
            <li className={styles.navItem} key={val}>
              <Link to={valLC}>
                <div className={styles[valLC]}></div>
                <span>
                  {val} <br />
                  Wine
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Nav;
