// import { useContext } from "react";
// import { ComputerContext } from "../../context";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, selectCart } from "../../slices/cartSlice";
import Img from "../Image";
import Price from "../Price";
import Button from "../Button";
import styles from "./CartOpen.module.css";

function CartOpen({ totalPrice, totalQty, handleIsOpen }) {
  // const { addToCart, cart, removeFromCart } = useContext(ComputerContext);
  const dispatch = useDispatch();

  const cart = useSelector(selectCart);
  console.log(totalPrice, totalQty);

  // Object.entries(cart).map(([key, val]) => {
  //   console.log(key);
  //   console.log(val);
  // });

  console.log(cart);

  const CartPrice = ({ price, dealPrice, qty }) => {
    const cartPrice = (dealPrice || price) * qty;
    return <div className={styles.price}>${cartPrice.toFixed(2)}</div>;
  };

  const ItemSavings = ({ price, dealPrice }) =>
    dealPrice ? (
      <div className={styles.savings}>
        <span className={styles.triangle}></span>
        You save: ${(price - dealPrice).toFixed(2)}
      </div>
    ) : null;

  const handleClose = () => handleIsOpen(false);

  const handleKeyDown = ({ key }) => key === "Enter" && handleClose();

  const removeFromCart = (id, all) => {
    dispatch(decrement({ id, all }));
  };

  const addToCart = ({
    id,
    name,
    brand,
    shortName,
    price,
    quantity = 1,
    deal,
    dealPrice,
  }) => {
    console.log("addToCart");
    dispatch(
      increment({
        id,
        name,
        brand,
        shortName,
        price,
        quantity,
        deal,
        dealPrice,
      })
    );
  };

  return (
    <section className={styles.cart}>
      <div className={styles.totalItems}>
        <span>{totalQty} </span>
        items in your shopping cart
        <span
          className={styles.close}
          onClick={handleClose}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={0}
        >
          X
        </span>
      </div>
      <ul className={styles.list}>
        {Object.entries(cart).map(
          ([id, { name, brand, shortName, qty, price, deal, dealPrice }]) => (
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
                      <span className={styles.amount}>{qty}</span>
                      <Button
                        onClick={() => {
                          addToCart({
                            id,
                            name,

                            brand,
                            shortName,
                            price,
                            deal,
                            dealPrice,
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
                  {/* <div className={styles.qty}>Quantity: {qty}</div> */}

                  <CartPrice
                    qty={qty}
                    price={price}
                    // deal={deal}
                    dealPrice={dealPrice}
                  />

                  {/* <Price price={price} loc="cartItem" /> */}
                </div>
              </div>
              <div className={styles.itemSavings}>
                <ItemSavings // qty={qty}
                  price={price}
                  // deal={deal}
                  dealPrice={dealPrice}
                />
              </div>
            </li>
          )
        )}
      </ul>
      <div className={styles.total}>
        <span>
          Total Items: <b>{totalQty}</b>
        </span>
        <span className={styles.totalPrice}>
          Total: ${totalPrice.toFixed(2)}
        </span>
      </div>
    </section>
  );
}

export default CartOpen;
