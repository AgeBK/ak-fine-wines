import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  decrement,
  selectCart,
  applyDiscountCode,
} from "../../slices/cartSlice";
import Img from "../Image";
// import Price from "../Price";
import Button from "../Button";
import styles from "./CartOpen.module.css";

function CartOpen({
  totalPrice,
  totalQty,
  handleClose,
  discountCode,
  setDiscountCode,
}) {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);

  const CartPrice = ({ price, dealPrice, qty }) => {
    const cartPrice = (dealPrice || price) * qty;
    return <div className={styles.price}>${cartPrice.toFixed(2)}</div>;
  };

  const ItemSavings = ({ price, dealPrice, qty }) =>
    dealPrice ? (
      <div className={styles.savings}>
        <span className={styles.triangle}></span>
        You save: ${((price - dealPrice) * qty).toFixed(2)}
      </div>
    ) : null;

  const handleKeyDown = ({ key }) => key === "Enter" && dispatchDiscountCode();

  const handleChange = ({ target: { value } }) => setDiscountCode(value);

  const dispatchDiscountCode = () => dispatch(applyDiscountCode(discountCode));

  const removeFromCart = (id, all) => dispatch(decrement({ id, all }));

  const addToCart = ({
    id,
    name,
    brand,
    shortName,
    price,
    quantity = 1,
    deal,
    dealPrice,
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
        dealPrice,
        discountCode,
      })
    );
  };

  return (
    <section className={styles.cart}>
      <div className={styles.totalItems}>
        <span>{totalQty} </span>
        items in your shopping cart
        <Button css="close" onClick={handleClose}>
          X
        </Button>
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
                  <CartPrice qty={qty} price={price} dealPrice={dealPrice} />
                </div>
              </div>
              <div className={styles.itemSavings}>
                <ItemSavings
                  price={price}
                  // deal={deal}
                  dealPrice={dealPrice}
                  qty={qty}
                />
              </div>
            </li>
          )
        )}
      </ul>
      <div className={styles.discountCode}>
        <input
          className={styles.inputCode}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          type="text"
          placeholder="Enter promo/discount code here"
          value={discountCode}
        />
        <Button css="discount" onClick={dispatchDiscountCode}>
          Apply
        </Button>
      </div>

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
