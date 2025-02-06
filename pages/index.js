import dynamic from "next/dynamic";
import Seo from "../components/Seo/Seo";
import { ApiHandler } from "../helpers/api";
import CategoryItems from "../components/CategoryItems/CategoryItems";

const MainSlider = dynamic(() => import("../components/MainSlider"));

const ActionBanners = dynamic(() =>
  import("../components/ActionBanners/ActionBanners")
);

const CardsSupport = dynamic(() =>
  import("../components/CardsSupport/CardsSupport")
);

const GridProducts = dynamic(() =>
  import("../components/GridProducts/GridProducts")
);

const Home = ({
  banners,
  mobileBanners,
  recommendedProducts,
  buttonTabs,
  saleProducts,
  positionProducts,
  actionBanners,
  recommendationCategoriesProducts,
}) => {
  console.log("recommendedProducts", recommendedProducts);
  return(
      <>
        <Seo title="Web shop" />
        <div>
          <MainSlider banners={banners} mobileBanners={mobileBanners} />
          <CardsSupport />
          <GridProducts
              recommendedProducts={recommendedProducts}
              saleProducts={saleProducts}
              positionProducts={positionProducts}
          />
          <ActionBanners actionBanners={actionBanners} />
          <CategoryItems
              buttonTabs={buttonTabs}
              recommendedCategoriesProducts={recommendationCategoriesProducts}
          />
        </div>
      </>
  )
};

export default Home;

export const getStaticProps = async () => {
  const api = ApiHandler();

  return {
    props: {
      banners: await api
        .get("banners/index_slider")
        .then((response) => response?.payload),
      mobileBanners: await api
        .get("banners/index_slider_mobile")
        .then((response) => response?.payload),
      actionBanners: await api
        .get("banners/action_banners")
        .then((response) => response?.payload),
      buttonTabs: await api
        .list("categories/section/recommended?render=false",)
        .then((response) => response?.payload),
      recommendationCategoriesProducts: await api
        .list("products/section/list/recommendation?render=false", { limit: -1 })
        .then((response) => response?.payload?.items),
      recommendedProducts: await api
        .list("products/section/list/action?render=false", )
        .then((response) => response?.payload?.items),
      saleProducts: await api
        .list("products/section/list/best_sell?render=false", { limit: 1})
        .then((response) => response?.payload?.items),
      positionProducts: await api
        .list("products/section/list/sale?render=false", { limit: 6})
        .then((response) => response?.payload?.items),
    },
    revalidate: 10,
  };
};
