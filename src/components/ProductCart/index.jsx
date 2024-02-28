import { useState } from "react";
import Button from "../Button";
import AddToCart from "../AddToCart";
import Img from "../Image";
import { checkDeals } from "../../data/utils";
import styles from "./ProductCart.module.css";

const ProductCart = ({
  id,
  name,
  brand,
  shortName,
  twoFor,
  tenFor,
  percentOff,
  current,
  packaging,
  calloutText,
  discountCode,
}) => {
  const [count, setCount] = useState(1);

  const handleCount = (e) => {
    const { textContent } = e.currentTarget;
    if (textContent === "+") {
      setCount(count + 1);
    } else {
      setCount(count - 1);
    }
  };

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
              image={
                packaging === "Bottle"
                  ? `icons/wineSil.png`
                  : `icons/barrelSil.png`
              }
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
            discountCode={discountCode}
          />
        </div>
      </div>
      {twoFor || tenFor || percentOff ? (
        <div className={styles.cartTwoFor}>{calloutText}</div>
      ) : null}
    </div>
  );
};

export default ProductCart;
