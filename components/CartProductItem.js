/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
/* eslint-disable eqeqeq */
import { useEffect, useState } from "react";
import Image from "next/legacy/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import classes from "./CartProductItem.module.scss";
import PlusMinusInputCart from "./PlusMinusInputCart";
import { currencyFormat } from "../helpers/functions";
import {
  useGlobalAddToCart,
  useGlobalRemoveFromCart,
} from "../helpers/globals";
import { openAlertBox } from "../helpers/tostify";

const CartProductItem = ({ item }) => {
  // State that holds amount of products
  const [productAmount, setProductAmount] = useState(
    Number(item.cart.quantity)
  );

  const removeFromCart = useGlobalRemoveFromCart();

  const [addToCart, loading] = useGlobalAddToCart(true);

  useEffect(() => {
    if (productAmount != item.cart.quantity) {
      addToCart(item?.product?.id, productAmount, true);
    }
  }, [productAmount, item.cart.quantity, item?.product?.id]);

  const per_item = item?.product?.price?.per_item;
  const total = item?.product?.price?.cost;
  const currency = item?.product?.price?.currency;
  return (
    <>
      <div className={`${classes.container} row`}>
        <div
          className={`${classes.cols} col-xl-2 col-lg-2 col-md-2 col-sm-12 col-xs-12`}
        >
          <div className={classes["product-image"]}>
            <Image
              alt="product"
              src={item.product.image[0] ?? "/products/missing.png"}
              layout="fill"
              objectFit="contain"
              priority
            />
          </div>
        </div>
        <div
          className={`${classes.cols} col-xl-4 col-lg-4 col-md-4 col-xs-12 col-sm-12`}
        >
          <span>{item.product.basic_data.name}</span>
        </div>
        <div
          className={`${classes.cols} col-xl-2 col-lg-2 col-md-2 col-xs-12 col-sm-12`}
        >
          <span>{currencyFormat(per_item?.price_with_vat, currency)}</span>
        </div>
        <div className={`${classes.cols} col-2`}>
          <PlusMinusInputCart
            className={classes["amount-input"]}
            amount={productAmount}
            setCount={setProductAmount}
          />
        </div>
        <div className={`${classes.cols} col-2`}>
          <span>{currencyFormat(total?.with_vat, currency)}</span>
        </div>
        <div className={classes.delete}>
          <FontAwesomeIcon
            icon={faXmark}
            onClick={() => {
              removeFromCart(item?.product?.id);
              openAlertBox("Uspešno obrisan proizvod.", "success");
            }}
          />
        </div>
      </div>
      <div className={`${classes["mobile-container"]} row`}>
        <div className={`${classes.cols} col-xl-3 col-lg-3 col-md-3 col-sm-12`}>
          <div className={classes["product-image-mobile"]}>
            <Image
              alt="product"
              src={item.product.image[0] ?? "/products/missing.png"}
              width={180}
              height={220}
              priority
            />
          </div>
        </div>
        <div className="col-xl-9 col-lg-9 col-md-9 col-12 col-sm-12">
          <div className="row">
            <div className={`${classes.cols} col-12`}>
              <span>{item.product.name}</span>
            </div>
            <div
              className={`${classes.cols} col-xl-6 col-lg-6 col-12 col-sm-12`}
            >
              <span>Količina</span>
              <PlusMinusInputCart
                className={classes["amount-input"]}
                amount={productAmount}
                setCount={setProductAmount}
              />
            </div>
            <div
              className={`${classes.cols} col-xl-6 col-lg-6 col-md-6 col-12 col-sm-12`}
            >
              <span>{currencyFormat(total?.with_vat, currency)}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartProductItem;
