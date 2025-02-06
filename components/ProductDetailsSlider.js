import React, { useState } from "react";
import Slider from "react-slick";
import Image from "next/legacy/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import classes from "./ProductDetails.module.scss";
import { useWindowDimensions } from "../helpers/functions";
import { convertHttpToHttps } from "../helpers/convertHttpToHttps";

/**
 * Slider for product images on Single product page of B2B
 *
 * @author Aleksandar Ječmenić <aleksandar.jecmenic@croonus.com>
 */
function Arrow(props) {
  let className = props.type === "next" ? "nextArrow" : "prevArrow";
  className += " arrow";
  const char =
    props.type === "next" ? (
      <FontAwesomeIcon className="slick-next-arrow" icon={faChevronDown} />
    ) : (
      <FontAwesomeIcon className="slick-prev-arrow" icon={faChevronUp} />
    );
  return (
    <span className={className} onClick={props.onClick}>
      {char}
    </span>
  );
}
function Arrow2(props) {
  let className = props.type === "next" ? "nextArrow" : "prevArrow";
  className += " arrow";
  const char =
    props.type === "next" ? (
      <FontAwesomeIcon className="slick-next-arrow" icon={faChevronRight} />
    ) : (
      <FontAwesomeIcon className="slick-prev-arrow" icon={faChevronLeft} />
    );
  return (
    <span className={className} onClick={props.onClick}>
      {char}
    </span>
  );
}

const ProductDetailsSlider = ({
  images = [],
  addToWishList,
  isLoadingWish,
  ...props
}) => {
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  const [numberOfImages, setNumberOfImages] = useState(images?.length ?? 5);
  const { height, width } = useWindowDimensions();

  return (
    <>
      <div className=" col-12 product-details-slider-container">
        <div className={`row flex-start ${classes["row-print"]}`}>
          <div
            className={`col-md-2 slick-flex-down ${classes["slick-img-print-l"]}`}
          >
            <div className="col-10">
              <Slider
                asNavFor={nav2}
                ref={(slider1) => setNav1(slider1)}
                focusOnSelect
                centerPadding="20px"
                arrows={false}
                vertical={width > 767.98}
                infinite
                verticalSwiping={width > 767.98}
                dots={false}
                slidesToShow={numberOfImages > 3 ? 3 : numberOfImages}
                className="vertical-slider"
              >
                {images.map((item, index) => (
                  <div key={item.image} className="slick-small-img-div">
                    <Image
                      className="slick-small-img"
                      alt=""
                      src={convertHttpToHttps(item.image)}
                      layout="fill"
                      priority
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>

          <div className={`col-md-10 ${classes["slick-img-print-r"]}`}>
            <Slider
              asNavFor={nav1}
              ref={(slider2) => setNav2(slider2)}
              focusOnSelect={false}
              infinite
              draggable
              vertical={false}
              arrows={width > 767.98}
              nextArrow={<Arrow2 type="next" />}
              prevArrow={<Arrow2 type="prev" />}
              dots={false}
              className="big-slick-slider"
            >
              {images.length === 0 && (
                <div key="missing" className="slick-small-img-div">
                  <Image
                    alt=""
                    src="/images/logo-color.webp"
                    width={600}
                    height={450}
                    priority
                  />
                </div>
              )}
              {images.map((item) => (
                <div key={item.image} className="slick-big-img-div">
                  <Image
                    className="slick-small-img"
                    alt=""
                    src={convertHttpToHttps(item.image)}
                    layout="fill"
                    priority
                  />
                </div>
              ))}
            </Slider>

            {props.children}
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div
              className={`${classes["under-details-buttons"]} ${classes["mobile-show"]}`}
            >
              <div className={classes["under-details-buttons-surrounder"]}>
                <button
                  className={classes["under-details-buttons-button"]}
                  onClick={props.onClick}
                  type="button"
                >
                  <Image
                    alt="compare"
                    src="/images/print.webp"
                    width={20}
                    height={20}
                  />
                  Štampaj
                </button>
              </div>
              <div className={classes["under-details-buttons-surrounder"]}>
                {isLoadingWish ? (
                  <button
                    className={`${classes["under-details-buttons-button"]}`}
                    type="button"
                  >
                    <Image
                      src="/images/loading-buffering.gif"
                      alt="Loading"
                      width={200}
                      height={200}
                    />
                  </button>
                ) : (
                  <button
                    className={classes["under-details-buttons-button"]}
                    onClick={addToWishList}
                    type="button"
                  >
                    <Image
                      alt="compare"
                      src="/images/heart.webp"
                      width={20}
                      height={20}
                    />
                    Sačuvaj
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailsSlider;
