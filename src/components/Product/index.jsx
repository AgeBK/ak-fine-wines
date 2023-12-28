import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import Img from "../Image";
import styles from "./Product.module.css";

function Product() {
  const { id } = useParams();

  // const product = data.find(({ productId }) => productId === id);

  // const ProductData = () => {
  //   const {
  //     mainCategory,
  //     category,
  //     productId,
  //     productName,
  //     productPicUrl,
  //     price,
  //     description,
  //     sale,
  //     quantity,
  //     width,
  //     depth,
  //     height,
  //     weightMeasure,
  //     weightUnit,
  //   } = product;

  return (
    <article>
      <div className={styles.container}>
        <div className={styles.breadCrumb}></div>
        <section className={styles.container}>
          <h1 className={styles.hdr}>Product</h1>
          <div className={styles.priceCont}></div>
          <div className={styles.infoCont}>
            <div className={styles.imgCont}>
              <Img image="XXX" imageStyle="product" imageAlt="Alt" />
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}

export default Product;
