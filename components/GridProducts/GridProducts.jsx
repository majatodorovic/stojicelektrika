import { useState } from "react";
import Image from "next/legacy/image";
import dynamic from "next/dynamic";
import classes from "./GridProducts.module.scss";

const HomeTabButton = dynamic(() =>
  import("../UI/HomeTabButton/HomeTabButton")
);
const ProductBoxComplexSmall = dynamic(() =>
  import("../ProductBoxComplexSmall")
);

function GridProducts({
  recommendedProducts = [],
  saleProducts = [],
  positionProducts = [],
}) {
  const [products, setProducts] = useState(recommendedProducts);
  const [tabList, setTabList] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className={`${classes.gridProducts}`}>
      <div className={`${classes.pResetMob} container`}>
        <div className={`${classes.gridColumn}`}>
          <div className={`${classes.singleProduct}`}>
            {saleProducts.map((item) => (
              <ProductBoxComplexSmall
                isSpecialOffer
                product_id={item.id}
                key={item.id}
                className="homeActionItem"
              />
            ))}
          </div>
          <div className={`${classes.articles}`}>
            <div className={`${classes.articlesButtons}`}>
              <HomeTabButton
                onButtonClick={() => {
                  setProducts(recommendedProducts);
                  setTabList(0);
                }}
                buttonClass={tabList === 0 ? "active" : ""}
              >
                Izdvojeni artikli
              </HomeTabButton>
              <HomeTabButton
                onButtonClick={() => {
                  setProducts(positionProducts);
                  setTabList(1);
                }}
                buttonClass={tabList === 1 ? "active" : ""}
              >
                Rasprodaja
              </HomeTabButton>
              {/* <HomeTabButton
                onButtonClick={() => {
                  setProducts(positionProducts);
                  setTabList(2);
                }}
                buttonClass={tabList === 2 ? 'active' : ''}
              >
                Najbolje ocenjeni proizvodi
              </HomeTabButton> */}
            </div>
            {products <= 0 && (
              <div className={`${classes.noProduct}`}>
                <h3>Trenutno nema podataka za prikaz.</h3>
              </div>
            )}
            {!isLoading ? (
              <div className={`${classes.articlesGrid}`}>
                {products.map((item, i) => (
                  <ProductBoxComplexSmall
                    key={item.id}
                    product_id={item.id}
                    noBorder="noBorder"
                    className="homeProductArticle"
                  />
                ))}
              </div>
            ) : (
              <div className="gif">
                {/* <Image src="images/loading-buffering.gif" alt="Loading" objectFit="contain" /> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GridProducts;
