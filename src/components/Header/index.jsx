import AutoComplete from "../AutoComplete";
import { Link } from "react-router-dom";
import Nav from "../Nav";
import Img from "../Image";
import Cart from "../Cart";
import styles from "./Header.module.css";

const Header = () => {
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
        <AutoComplete />
        <div className={styles.cartCont}>
          <Cart />
        </div>
      </div>
      <Nav />
    </header>
  );
};

export default Header;
