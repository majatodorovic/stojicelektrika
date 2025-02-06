import React from "react";
import Link from "next/link";
import Image from "next/legacy/image";
import wishlist from "../assets/images/elements/heart.png";
import cart from "../assets/images/elements/cart-white.png";
import classes from "./ActionProducts.module.scss";
import Slider from "./Slider/Slider";
import {
  useGlobalAddToCart,
  useGlobalAddToWishList,
} from "../pages/api/globals";
import { currencyFormat } from "../helpers/functions";
import "keen-slider/keen-slider.min.css";

const ActionProducts = ({ recommendedProducts }) => {
  const addToCart = useGlobalAddToCart();
  const addToWishList = useGlobalAddToWishList();
  return (
    <div className={`${classes["action-product-list-holder"]}`}>
      <div className={`${classes["action-product-list-title"]}`}>
        <p>Možda će Vas zanimati</p>
        <h3>Akcijski proizvodi</h3>
      </div>

      <div className={`${classes["custom-background"]}`}>
        <div className="container">
          <div className={`${classes["action-product-row"]}`}>
            <Slider>
              {(recommendedProducts ?? []).map((item) => (
                <div key={item?.id} className="keen-slider__slide">
                  <div className={`${classes["action-product-col"]} `}>
                    <div className={`${classes["action-product-holder"]}`}>
                      <Link href={`/proizvod/${item?.id}`} legacyBehavior>
                        <div className={classes["image-holder"]}>
                          <Image
                            src={item?.image[0] ?? "/products/missing.png"}
                            alt="React"
                            width={200}
                            height={215}
                            objectFit="contain"
                          />
                        </div>
                      </Link>
                      <div className={`${classes["info-holder"]}`}>
                        <Link href={`/proizvod/${item?.id}`} legacyBehavior>
                          <p>{item?.basic_data?.name}</p>
                        </Link>
                        <p className={`${classes["old-price"]}`}>
                          {currencyFormat(
                            item?.price?.discount?.active
                              ? item?.price?.price?.original
                              : null,
                            item?.price?.currency
                          )}
                        </p>
                        <p className={`${classes.price}`}>
                          {currencyFormat(
                            item?.price?.discount?.active
                              ? item?.price?.price?.discount
                              : item?.price?.price?.original,
                            item?.price?.currency
                          )}
                        </p>
                        <span
                          className={
                            item.action
                              ? `${classes["badge-action"]}`
                              : "d-none"
                          }
                        >
                          {item.action}
                        </span>
                        <span
                          className={
                            item.action
                              ? `${classes["badge-action-percent"]}`
                              : "d-none"
                          }
                        >
                          {item.actionpercent}
                        </span>
                        <div
                          className={`${classes.wishlist}`}
                          onClick={() => addToWishList(item?.id)}
                        >
                          <Image
                            src={wishlist}
                            className="d-inline-block w-100 img-fluid"
                            alt="React"
                          />
                        </div>
                        {Number(item?.inventory?.amount) > 0 && (
                          <div
                            className={classes["add-to-cart"]}
                            onClick={() => addToCart(item?.id, 1)}
                          >
                            <Image
                              src={cart}
                              className="d-inline-block align-top img-fluid"
                              alt="React"
                              width={26}
                              height={26}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionProducts;
