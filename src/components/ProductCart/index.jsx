import { useState } from "react";
import Button from "../Button";
import AddToCart from "../AddToCart";
import Img from "../Image";
import { checkDeals } from "../../data/utils";
import styles from "./ProductCart.module.css";

const ProductCart = ({
  twoFor,
  tenFor,
  percentOff,
  current,
  packaging,
  calloutText,
  id,
  name,
  brand,
  shortName,
}) => {
  const [count, setCount] = useState(1);

  const CartDeal = () =>
    twoFor ? <div className={styles.cartTwoFor}>{calloutText}</div> : null;

  const handleCount = ({ target: { textContent } }) =>
    textContent === "+" ? setCount(count + 1) : setCount(count - 1);

  const deal = checkDeals(twoFor, tenFor, percentOff);

  return (
    <div className={styles.cartTableCont}>
      <div className={styles.cartTable}>
        <div className={styles.cartBottle}>
          <div className={styles.price}>
            ${current}/{packaging}
          </div>
          <div className={styles.packImg}>
            <Img
              image={`icons/wineSil.png`}
              imageStyle="packaging"
              imageAlt={packaging}
            />
          </div>
        </div>
        <div className={styles.cartAmt}>
          <div className={styles.totalPrice}>${current * count}</div>
          <Button css="cartLge" onClick={handleCount} disabled={count < 2}>
            -
          </Button>
          <span className={styles.count}>{count}</span>
          <Button css="cartLge" onClick={handleCount}>
            +
          </Button>
        </div>
        <div className={styles.cartAdd}>
          <AddToCart
            id={id}
            name={name}
            brand={brand}
            shortName={shortName}
            price={current}
            quantity={count}
            deal={deal}
          />
        </div>
      </div>
      <CartDeal />
    </div>
  );
};

export default ProductCart;
