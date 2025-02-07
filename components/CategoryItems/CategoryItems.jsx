import { useCallback, useState, useEffect } from "react";
import Image from "next/legacy/image";
import classes from "./CategoryItems.module.scss";
import HomeTabButton from "../UI/HomeTabButton/HomeTabButton";
import ProductBoxComplexSmall from "../ProductBoxComplexSmall";

function CategoryItems({ buttonTabs, recommendedCategoriesProducts }) {
  const [tabCategory, setTabsCategory] = useState("");
  const [items, setItems] = useState([]);

  const filterItems = (id) => {
    setTabsCategory(id);
    setItems(
      recommendedCategoriesProducts?.filter((item) =>
        item?.categories[0]?.category_path?.some((itemId) => itemId.id === id)
      )
    );
  };

  const tabs = buttonTabs.filter(
    (item) =>
      recommendedCategoriesProducts?.filter((itemId) =>
        itemId?.categories[0]?.category_path?.some(
          (itemId) => itemId?.id === item?.id
        )
      ).length > 0
  );

  useEffect(() => {
    filterItems(tabs[4]?.id);
    setTabsCategory(tabs[4]?.id);
  }, []);

  return (
    <div className={`${classes.categoryItems}`}>
      <div className="container">
        <div className={`${classes.categoryTabs}`}>
          {tabs.slice(0, 6).map((item) => (
            <HomeTabButton
              key={item.id}
              onButtonClick={() => {
                filterItems(item.id);
              }}
              buttonClass={tabCategory === item.id ? "active" : ""}
              changeStyle="tabCategoryButton"
            >
              {item.basic_data.name}
            </HomeTabButton>
          ))}
        </div>

        <div className={`${classes.categoryGrid}`}>
          {items.map((item, index) => (
            <div
              key={item.id}
              className={index === 2 ? `${classes.item3}` : ""}
            >
              <ProductBoxComplexSmall
                className="homeBoxCategory"
                biggerImg={index === 2 ? "biggerImg" : ""}
                product_id={item.id}
              />
            </div>
          ))}
        </div>

        {items <= 0 && (
          <div className={`${classes.noProduct}`}>
            <h3>Trenutno nema podataka za prikaz.</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoryItems;
