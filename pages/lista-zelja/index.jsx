/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/legacy/image";
import dynamic from "next/dynamic";
import classes from "./WishListPage.module.scss";
import { ApiHandler } from "../../helpers/api";
import { useCartContext } from "../../helpers/cartContext";

const Seo = dynamic(() => import("../../components/Seo/Seo"));
const ProductBoxWishlist = dynamic(() =>
  import("../../components/ProductBoxWishlist")
);

const WishListPage = () => {
  const [wishListData, setWishListData] = useState(null);
  const [, , wishlist] = useCartContext();

  const [isLoading, setIsLoading] = useState(true);

  const getWishList = useCallback(() => {
    const api = ApiHandler();
    api
      .list("/wishlist", {render: false})
      .then((response) => {
        setWishListData(response?.payload);
      })
      .catch((error) => {
        console.warn(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    getWishList();
  }, [wishlist]);

  const wishListProducts = wishListData?.items ?? [];

  return (
    <>
      <Seo
        title="Lista želja"
        description="Lista želja"
        ogtitle="Lista želja"
        ogdescription="Lista želja"
        ogurl={`${process.env.BASE_URL}lista-zelja`}
      />
      <div className={classes.container}>
        <h5 className={classes["wishlist-heading"]}>Vaša lista želja</h5>
        {isLoading ? (
          <div className="gif">
            <Image
              src="/images/loading-buffering.gif"
              alt="Loading"
              width={200}
              height={200}
            />
          </div>
        ) : (
          <div className={`${classes.content} row`}>
            {wishListProducts.map((item) => (
              <div
                className={`${classes["product-col"]} col-xxl-3 col-lg-4 col-sm-6`}
                key={item?.id}
              >
                <ProductBoxWishlist
                  wishlistId={item?.id}
                />
              </div>
            ))}
            {wishListProducts.length === 0 && (
              <div>
                <p className="mb-3">Vaša lista želja je prazna!</p>
                <Link href="/" className="button-back-to-home">
                  Vratite se na početnu stranicu
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default WishListPage;

export async function getStaticProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
