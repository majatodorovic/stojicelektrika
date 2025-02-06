import Link from "next/link";
import Image from "next/legacy/image";
import {useState, useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import classes from "./ProductBoxComplexSmall.module.scss";
import { currencyFormat } from "../helpers/functions";
import {
  useGlobalAddToCart,
  useGlobalRemoveFromWishlist,
} from "../helpers/globals";
import { openAlertBox } from "../helpers/tostify";
import { ApiHandler } from "../helpers/api";
import { Loader } from "rsuite";

const ProductBoxWishlist = ({ wishlistId }) => {
  const [addToCart] = useGlobalAddToCart();
  const removeFromWishList = useGlobalRemoveFromWishlist();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [productImage, setProductImage] = useState(null);

  useEffect(() => {
    const api = ApiHandler();

    const fetchProductDetails = api
    .get(`/product-details/basic-data/${wishlistId}`)
    .then((response) => {
      setProduct(response?.payload?.data?.item);
    })
    .catch((error) => {
      console.error("Error fetching product details:", error);
    });

  const fetchProductImage = api
    .get(`/product-details/gallery/${wishlistId}`)
    .then((response) => {
      setProductImage(response?.payload);
    })
    .catch((error) => {
      console.error("Error fetching product images:", error);
    });

  
  Promise.all([fetchProductDetails, fetchProductImage]).finally(() => {
    setIsLoading(false);
  });
}, [wishlistId]);

  if (isLoading) {
    return <div>
      <Loader/>
    </div>;
  }


  return (
       <div className={classes.container}>
      {product && (
        <>
          <Link
            href={`/proizvod/${product?.basic_data?.id_product}`}
            legacyBehavior
          >
            <a className={classes["product-img"]}>
              <Image
                alt={product?.basic_data?.slug}
                src={
                  productImage?.gallery[0]?.image ?? "/products/missing.png" }
                layout="fill"
                objectFit="contain"
              />
            </a>
          </Link>
          {product?.categories && (
            <Link
              href={`/kategorije/${product?.categories[0]?.id}`}
              legacyBehavior
            >
              <a className={classes["category-name"]}>
                {product?.categories[0]?.name ?? ""}
              </a>
            </Link>
          )}
          <Link
            href={`/proizvod/${product?.basic_data?.id_product}`}
            legacyBehavior
          >
            <a className={classes["product-name"]}>
              {product?.basic_data?.name ?? ""}
            </a>
          </Link>
          <div className={classes.price}>
            <p className={classes["new-price"]}>
              {currencyFormat(
                product?.price?.discount?.active
                  ? product?.price?.price?.discount
                  : product?.price?.price?.original,
                product?.price?.currency
              )}
            </p>
          </div>
          {product?.price?.discount?.active && (
            <div className={classes.discount}>
              <span>{product?.price?.discount?.amount}</span>
            </div>
          )}
          {(product?.stickers ?? []).map((sticker) => (
            <div className={classes["top-deal"]} key={sticker.slug}>
              <span>{sticker.name}</span>
            </div>
          ))}
          <div
            className={classes["fav-heart"]}
            onClick={() => {
              removeFromWishList(wishlistId);
              openAlertBox("Uspešno obrisan proizvod.", "success");
            }}
          >
            <Image
              alt="fav-heart"
              src="/images/heart.webp"
              width={35}
              height={35}
            />
          </div>
          {Number(product?.inventory?.amount) > 0 && (
            <div className={classes["add-to-cart"]}>
              <div
                className={classes["add-to-cart-image"]}
                onClick={() => addToCart(product?.basic_data?.id_product, 1)}
              >
                <FontAwesomeIcon icon={faBagShopping} color="white" />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductBoxWishlist;
