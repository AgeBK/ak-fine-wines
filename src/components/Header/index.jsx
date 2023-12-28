import { Link } from "react-router-dom";
import Nav from "../Nav";
import Img from "../../components/Image";
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
        <div className={styles.cartCont}></div>
      </div>
      <Nav />
    </header>
  );
};

export default Header;
