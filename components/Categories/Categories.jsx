/* eslint-disable dot-notation */
/* eslint-disable no-return-await */
/* eslint-disable no-nested-ternary */

import Image from "next/legacy/image";
import dynamic from "next/dynamic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import classes from "../NavbarMenu.module.scss";

const Categories = ({
  menu,
  setCategoryItemHandler,
  closeLeftSidebarModal,
  categoryItem,
  selectedCategoryId,
  setSelectedCatIdHandler,
  setSearchCategoryhandler,
  searchCategory,
  isMobile = false,
}) => {
  const clearModalData = () => {
    closeLeftSidebarModal();
    setCategoryItemHandler(null);
  };

  const router = useRouter();

  const convertChirilicLetter = (word) => {
    if (word.includes("č")) {
      return word.replace("č", "c");
    }
    if (word.includes("ć")) {
      return word.replace("ć", "c");
    }
    if (word.includes("ž")) {
      return word.replace("ž", "z");
    }
    if (word.includes("đ")) {
      return word.replace("đ", "dj");
    }
    if (word.includes("š")) {
      return word.replace("š", "s");
    }
    return word;
  };

  const filterByLabel = (array, searchTerm) => {
    if ((array ?? []).length > 0 && !isMobile) {
      return array.reduce((prev, curr) => {
        const children = curr.children
          ? filterByLabel(curr.children, searchTerm)
          : undefined;
        return convertChirilicLetter(curr.name.toLowerCase()).includes(
          convertChirilicLetter(searchTerm.toLowerCase())
        ) || children?.length > 0
          ? [...prev, { ...curr, children }]
          : prev;
      }, []);
    }
    return [];
  };

  const categoryData = filterByLabel(categoryItem?.children, searchCategory);

  return (
    <div className={classes.categoriesTree}>
      <ul className={classes["nav-submenu"]}>
        <h5 className={`${classes["all-categories-title"]}`}>Sve kategorije</h5>
        {menu.map((item) => (
          <>
            {item.children && item.children.length > 0 ? (
              <li
                key={item.id}
                className={classes["nav-submenu-item"]}
                onClick={() => {
                  setCategoryItemHandler(item);
                  setSelectedCatIdHandler(item);
                  setSearchCategoryhandler("");
                }}
              >
                <div className={classes["submenu-item-holder"]}>
                  <div className={classes.iconNameCat}>
                    {item.icon ? (
                      <Image
                        src={item.icon}
                        alt="Stojic Elektrik doo"
                        width={30}
                        height={30}
                      />
                    ) : null}

                    <p
                      className={
                        categoryItem?.id === item.id
                          ? ` ${classes.active} ${classes["category-name"]}`
                          : ""
                      }
                    >
                      {item.name}
                    </p>
                  </div>

                  {item.children && item.children.length > 0 ? (
                    <FontAwesomeIcon
                      icon={faAngleRight}
                      className={
                        selectedCategoryId === item.id
                          ? `${classes.rotate}`
                          : "" || categoryItem?.id === item.id
                          ? ` ${classes.active}`
                          : ""
                      }
                      color="#000"
                    />
                  ) : (
                    ""
                  )}
                </div>
              </li>
            ) : (
              <a
                href={`/kategorije/${item.slug_path}`}
                className={classes["submenu-item-holder"]}
              >
                <li onClick={clearModalData}>
                  {item.icon ? (
                    <Image
                      src={item.icon}
                      alt="Stojic Elektrik doo"
                      width={30}
                      height={30}
                    />
                  ) : null}
                  <p>{item.name}</p>
                </li>
              </a>
            )}
            {/* ***** */}

            {selectedCategoryId === item.id && item ? (
              <div className={classes["subCategoryTreeMobile"]}>
                <div className={classes["subCategoryChildrenMobile"]}>
                  <a
                    href={`/kategorije/${item.slug_path}`}
                    className={classes["categoryNameMobile"]}
                    onClick={clearModalData}
                  >
                    {item.name}
                  </a>
                  {(categoryItem?.children ?? []).map((subCategory) => (
                    <ul key={subCategory.id}>
                      <a
                        href={`/kategorije/${subCategory.slug_path}`}
                        onClick={clearModalData}
                        className={classes.mainLink}
                      >
                        {subCategory.name}
                      </a>
                      {subCategory.children && subCategory.children.length > 0
                        ? subCategory.children.map((subSubCategory) => (
                            <a
                              href={`/kategorije/${subSubCategory.slug_path}`}
                              onClick={clearModalData}
                              className={classes.childLink}
                            >
                              {subSubCategory.name}
                            </a>
                          ))
                        : null}
                    </ul>
                  ))}
                </div>
              </div>
            ) : null}
            {/* ****** */}
          </>
        ))}
      </ul>

      {categoryItem ? (
        <div className={classes.subCategoryTree}>
          <a
            href={`/kategorije/${categoryItem.slug_path}`}
            className={classes.categoryName}
            onClick={clearModalData}
          >
            {categoryItem.name}
          </a>
          <div className={classes.gridRightSideSubCat}>
            <>
              <form
                className={`${classes["header-search"]} ${classes.headerSearchCat}`}
                // onSubmit={handleSearch}
              >
                <div className={classes.newsletter}>
                  <input
                    className={`${`${classes["newsletter-input"]} basic-input`}`}
                    type="text"
                    name="search"
                    id="search"
                    value={searchCategory}
                    onChange={({ target }) =>
                      setSearchCategoryhandler(target.value)
                    }
                    placeholder="Pretraga.."
                  />
                </div>
              </form>
              <div className={classes.subCategoryChildren}>
                {categoryData.length > 0 ? (
                  categoryData.map((subCategory) => (
                    <ul key={subCategory.id}>
                      <a
                        href={`/kategorije/${subCategory.slug_path}`}
                        onClick={clearModalData}
                        className={`${classes.headerLink}`}
                      >
                        {subCategory.name}
                      </a>
                      {(subCategory?.children ?? []).map((subSubCategory) => (
                        <a
                          key={subSubCategory.id}
                          href={`/kategorije/${subSubCategory.slug_path}`}
                          onClick={clearModalData}
                          className={`${classes.link}`}
                        >
                          {subSubCategory.name}
                        </a>
                      ))}
                    </ul>
                  ))
                ) : (
                  <p className={classes.noData}>Nema podataka za prikaz!</p>
                )}
              </div>
            </>

            {/* {categoryItem.image != null && (
							<div className={classes.banner}>
								<Image
									src={categoryItem.image}
									alt="Stojic Elektrik doo"
									width={300}
									height={500}
									objectFit="cover"
								/>
							</div>
						)} */}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Categories;
