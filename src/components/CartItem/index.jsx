import { useSelector, useDispatch } from "react-redux";
import { selectCart, increment, decrement } from "../../slices/cartSlice";
import CartPrice from "../CartPrice";
import CartItemSaving from "../CartItemSaving";
import Img from "../Image";
import Button from "../Button";
import styles from "./CartItem.module.css";

const CartItem = () => {
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();

  const addToCart = ({
    id,
    name,
    brand,
    shortName,
    price,
    quantity,
    deal,
    discountCode,
  }) => {
    dispatch(
      increment({
        id,
        name,
        brand,
        shortName,
        price,
        quantity,
        deal,
        discountCode,
      })
    );
  };

  const removeFromCart = (id, all) =>
    dispatch(decrement({ id, all }));

  return (
    <ul className={styles.list}>
      {Object.entries(cart).map(
        ([
          id,
          { name, brand, shortName, quantity, price, deal, dealPrice, discountCode },
        ]) => (
          <li className={styles.itemCont} key={id} value={name}>
            <div className={styles.item}>
              <div className={styles.cartImg}>
                <Img
                  image={`wine/${id}.jpg`}
                  imageStyle="cartOpen"
                  imageAlt={name}
                />
              </div>
              <div className={styles.cartProd}>
                <h3 className={styles.hdr}>{brand}</h3>
                <div className={styles.shortName}>{shortName}</div>
                <div className={styles.buttons}>
                  <span className={styles.oneItem}>
                    <Button
                      onClick={() => {
                        removeFromCart(id, false);
                      }}
                      css="cartMinus"
                    ></Button>
                    <span className={styles.amount}>{quantity}</span>
                    <Button
                      onClick={() => {
                        addToCart({
                          id,
                          name,
                          brand,
                          shortName,
                          price,
                          quantity: 1,
                          deal,
                          discountCode,
                        });
                      }}
                      css="cartAdd"
                    ></Button>
                  </span>
                </div>
              </div>
              <div className={styles.details}>
                <Button
                  onClick={() => {
                    removeFromCart(id, true);
                  }}
                  css="noStyle"
                >
                  <Img
                    image={`btn/remove.png`}
                    imageStyle="cartOpenBtn"
                    imageAlt={name}
                  />
                </Button>
                <CartPrice
                  quantity={quantity}
                  price={price}
                  dealPrice={dealPrice}
                />
              </div>
            </div>
            <div className={styles.itemSavings}>
              <CartItemSaving
                price={price}
                dealPrice={dealPrice}
                quantity={quantity}
              />
            </div>
          </li>
        )
      )}
    </ul>
  );
};

export default CartItem;
