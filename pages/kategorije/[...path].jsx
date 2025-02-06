/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable eqeqeq */
/* eslint-disable no-const-assign */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-syntax */
import dynamic from "next/dynamic";

import { Accordion } from "react-bootstrap";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import Image from "next/legacy/image";
import Loader from "rsuite/Loader";
import { route } from "fontawesome";
import classes from "./CategoriesPage.module.scss";
import { ApiHandler } from "../../helpers/api";
import { queryKeys, sortKeys } from "../../helpers/const";

const Breadcrumbs = dynamic(() => import("../../components/Breadcrumbs"));
const Filters = dynamic(() => import("../../components/Filters"));
const ProductBoxComplexSmall = dynamic(() =>
  import("../../components/ProductBoxComplexSmall")
);
const Seo = dynamic(() => import("../../components/Seo/Seo"));

const CategoriesPage = ({ categoryData, productsItems, filters }) => {
  const router = useRouter();

  const { asPath } = router;
  const { query } = router;

  const [isLoading, setIsLoading] = useState(false);

  const replaceQuery = (newQuery) => {
    delete newQuery.path;
    delete newQuery.id;

    router.replace(
      {
        pathname: router?.asPath?.split("?")[0],
        query: newQuery,
      },
      undefined,
      { scroll: false, shallow: true }
    );
  };

  const [productsData, setProductsData] = useState([]);

  const [limit, setLimit] = useState(
    query[queryKeys.limit] ? parseInt(query[queryKeys.limit]) : 24
  );

  const newSort = Object.keys(sortKeys).find(
    (key) => sortKeys[key].query === query[queryKeys.sort]
  );

  const [sort, setSort] = useState(
    newSort
      ? { field: newSort?.split("_")[0], direction: newSort?.split("_")[1] }
      : undefined
  );

  const [page, setPage] = useState(
    query[queryKeys.page] ? parseInt(query[queryKeys.page]) : 1
  );

  const newSelected = [];

  const [selectedFilters, setSelectedFilters] = useState(newSelected);
  const [availableFilters, setAvailableFilters] = useState([]);

  const [changeFilters, setChangeFilters] = useState(true);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    setProductsData(productsItems);
    setAvailableFilters(filters);
  }, [router.isFallback]);
  // useEffect(() => {
  // 	for (const item in query) {
  // 		if (item !== 'id' && !Object.values(queryKeys)?.includes(item))
  // 			newSelected?.push({
  // 				column: item,
  // 				value: { selected: query[item]?.split('/') },
  // 			});
  // 	}
  //
  // 	setSelectedFilters(newSelected);
  // }, [router.isReady]);

  useEffect(() => {
    if (changeFilters) {
      // setIsLoading(true);
      const api = ApiHandler();
      api
        .post(`/products/category/filters/${categoryData?.id}`, {
          filters: selectedFilters,
        })
        .then((response) => {
          const newFilters = response.payload;
          let ret = availableFilters;
          for (const filter of newFilters) {
            if (
              selectedFilters.filter((item) => item.column === filter.key)
                .length === 0
            ) {
              ret = ret.map((item) => {
                if (item.key === filter.key) {
                  return filter;
                }
                return item;
              });
            }
          }
          setAvailableFilters(newFilters);
          setChangeFilters(false);
        });
    }

    const arr = selectedFilters.reduce(
      (obj, item) => ({
        ...obj,
        [item.column]: String([item.value.selected]),
      }),
      {}
    );

    let newQuery = {};
    if (queryKeys.page in query) {
      newQuery[queryKeys.page] = page;
    }

    if (queryKeys.limit in query) {
      newQuery[queryKeys.limit] = query[queryKeys.limit];
    }

    if (queryKeys.sort in query) {
      newQuery[queryKeys.sort] = query[queryKeys.sort];
    }

    newQuery = { ...newQuery, ...arr };

    if (Object.keys(newQuery).length > 0) {
      replaceQuery(newQuery);
    }
  }, [selectedFilters, changeFilters]);

  const getProductList = useCallback(
    (limit, sort, page, selectedFilters) => {
      if (
        queryKeys.page in query ||
        queryKeys.limit in query ||
        queryKeys.sort in query
      ) {
        setIsLoading(true);
        const api = ApiHandler();
        api
          .list(`products/category/list/${categoryData?.id}`, {
            limit,
            page,
            sort,
            filters: selectedFilters,
            render : false,
          })
          .then((response) => {
            setProductsData(response?.payload);
            setIsLoading(false);
          })
          .catch((error) => {
            console.warn(error);
            setIsLoading(false);
          });
      } else {
        const api = ApiHandler();
        api
          .list(`products/category/list/${categoryData?.id}`, {
            limit,
            page,
            sort,
            filters: selectedFilters,
            render : false,
          })
          .then((response) => {
            setProductsData(response?.payload);
            setIsLoading(false);
          })
          .catch((error) => {
            console.warn(error);
            setIsLoading(false);
          });
      }
    },
    [page, limit, sort, selectedFilters]
  );

  useEffect(() => {
    if (
      !showSearch ||
      queryKeys.page in query ||
      queryKeys.limit in query ||
      queryKeys.sort in query
    ) {
      getProductList(limit, sort, page, selectedFilters);
    }
  }, [selectedFilters, showSearch]);

  const searchProducts = () => {
    getProductList(limit, sort, page, selectedFilters, showSearch);
  };

  useEffect(() => {
    setPage(query[queryKeys.page] ? parseInt(query[queryKeys.page]) : 1);

    setLimit(query[queryKeys.limit] ? parseInt(query[queryKeys.limit]) : 24);

    const newSort = Object.keys(sortKeys).find(
      (key) => sortKeys[key].query === query[queryKeys.sort]
    );

    setSort(
      newSort
        ? { field: newSort?.split("_")[0], direction: newSort?.split("_")[1] }
        : undefined
    );
  }, [query]);

  const onSortChange = ({ target }) => {
    if (target.value != "none") {
      const newQuery = query;
      newQuery[queryKeys.sort] = sortKeys[target.value].query;
      newQuery[queryKeys.page] = 1;
      replaceQuery(newQuery);
      const [field, direction] = target.value?.split("_");
      setSort({ field, direction });
    } else {
      const newQuery = query;
      delete newQuery[queryKeys.sort];
      newQuery[queryKeys.page] = 1;
      replaceQuery(newQuery);
      setSort(null);
    }
    setPage(1);
  };

  const onLimitChange = ({ target }) => {
    const newQuery = query;
    newQuery[queryKeys.limit] = target.value;
    newQuery[queryKeys.page] = 1;
    replaceQuery(newQuery);

    setLimit(target.value);
    setPage(1);
  };

  const onPageChange = (num) => {
    const newQuery = query;
    newQuery[queryKeys.page] = num;

    replaceQuery(newQuery);

    setPage(num);
  };

  const products = productsData?.items;
  const pagination = productsData?.pagination;

  if (router.isFallback) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loader center content="Loading..." vertical size="lg" />
      </div>
    );
  }
console.log(productsItems, "pro:")
  return (
    <>
      <>
        <Seo
          title={categoryData?.basic_data?.name}
          description={`${categoryData?.seo?.description}`}
          ogtitle={`${categoryData?.seo?.title}`}
          ogdescription={`${categoryData?.seo?.description}`}
          ogimage={
            categoryData?.seo.image !== null
              ? categoryData?.seo?.image
              : categoryData?.images?.image
          }
          ogurl={
            categoryData?.seo.url !== null
              ? categoryData?.seo?.url
              : `${process.env.BASE_URL}kategorije/${categoryData?.parents[0]?.id}/${categoryData?.id}`
          }
        />
        <div className={`${classes.categoriespage}`}>
          <div className={`${classes.catBanner}`}>
            <div className="container-fluid">
              {categoryData?.images?.image ? (
                <Image
                  src={categoryData.images.image}
                  alt={categoryData.name}
                  layout="fill"
                  objectFit="cover"
                />
              ) : (
                <Image
                  src="/images/cartBanner.webp"
                  alt="Stojic Elektrik doo"
                  layout="fill"
                  objectFit="cover"
                />
              )}
              <div className={`${classes.title}`}>
                <h5>{categoryData?.basic_data?.name}</h5>
              </div>
            </div>
          </div>
          <div className="container">
            <Breadcrumbs
              crumbs={categoryData?.parents || []}
              end={{ label: categoryData?.basic_data?.name, path: asPath }}
            />

            <div className={`${classes["mobile-display"]}`}>
              <Accordion className={`${classes["filters-mobile-holder"]}`}>
                <Accordion.Item eventKey="0">
                  <Accordion.Header
                    className={`${classes["mobile-filters-heading"]}`}
                  >
                    Filteri
                  </Accordion.Header>
                  <Accordion.Body>
                    <Filters
                      filters={availableFilters}
                      selectedFilters={selectedFilters}
                      setSelectedFilters={setSelectedFilters}
                      changeFilters={changeFilters}
                      setChangeFilters={setChangeFilters}
                      showSearch={showSearch}
                      setShowSearch={setShowSearch}
                      searchProducts={searchProducts}
                    />
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>

            <div className="row">
              <div className="col-xl-3 col-md-3 col-12">
                <div className={`${classes["desktop-display"]}`}>
                  <Filters
                    filters={availableFilters}
                    selectedFilters={selectedFilters}
                    setSelectedFilters={setSelectedFilters}
                    changeFilters={changeFilters}
                    setChangeFilters={setChangeFilters}
                    showSearch={showSearch}
                    setShowSearch={setShowSearch}
                    searchProducts={searchProducts}
                  />
                </div>
              </div>
              <div
                className={`${classes["right-side-container"]} col-xl-9 col-lg-9 col-12 col-sm-12 col-xs-12`}
              >
                <div className={`${classes.controls} row`}>
                  <div
                    className={`${classes["number-of-products"]} col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12`}
                  >
                    {isLoading ? (
                      <span>Loading...</span>
                    ) : (
                      <span>
                        {pagination?.total_items}{" "}
                        {pagination?.total_items !== 1
                          ? "proizvoda"
                          : "proizvod"}
                      </span>
                    )}
                  </div>
                  <div
                    className={`${classes["sort-container"]} col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6`}
                  >
                    <span>Sortiraj:</span>
                    <span>
                      <select
                        name="sort"
                        id="sort"
                        className={classes.select}
                        onChange={onSortChange}
                        value={
                          sort ? `${sort.field}_${sort.direction}` : "none"
                        }
                      >
                        <option
                          value="none"
                          className={`${classes["sort-title"]}`}
                        >
                          Sortirajte
                        </option>
                        {Object.entries(sortKeys).map((item) => (
                          <option value={item[0]} key={item[0]}>
                            {item[1].label}
                          </option>
                        ))}
                      </select>
                    </span>
                  </div>
                  <div
                    className={`${classes["products-per-page"]} col-xl-5 col-lg-4 col-md-3 col-sm-6 col-6`}
                  >
                    <span>Prikaži:</span>
                    <span className={classes["select-span"]}>
                      <select
                        name="limit"
                        id="limit"
                        className={classes.select}
                        onChange={onLimitChange}
                        value={limit}
                      >
                        <option value={4} key="4">
                          4
                        </option>
                        <option value={8} key="8">
                          8
                        </option>
                        <option value={12} key="12">
                          12
                        </option>
                        <option value={24} key="24">
                          24
                        </option>
                        <option value={36} key="36">
                          36
                        </option>
                      </select>
                    </span>
                    <span>po strani</span>
                  </div>
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
                    <>
                      <div className={`${classes["product-row"]} row`}>
                        {products?.map((product) => (
                          <div
                            className={`${classes["product-col"]} col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-6 col-12`}
                            key={product.id}
                          >
                            <ProductBoxComplexSmall product_id={product.id} />
                          </div>
                        ))}
                        {products?.length === 0 && (
                          <p>Trenutno nema podataka za prikaz!</p>
                        )}
                      </div>
                      <div className={classes.paginationHolder}>
                        <div>
                          Strana {pagination?.selected_page} od{" "}
                          {pagination?.total_pages}
                        </div>
                        {pagination?.selected_page && (
                          <div className={classes.pagination}>
                            {Array.from(
                              {
                                length: Math.min(
                                  5,
                                  pagination?.total_pages -
                                    pagination?.selected_page +
                                    3,
                                  pagination?.total_pages
                                ),
                              },
                              (x, i) =>
                                i + Math.max(pagination?.selected_page - 2, 1)
                            ).map((num) => (
                              <span
                                key={num}
                                className={`${classes.paginationItem} ${
                                  num === pagination?.selected_page &&
                                  classes.paginationItemSelected
                                }`}
                                onClick={() => onPageChange(num)}
                              >
                                {num}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default CategoriesPage;

export const getStaticPaths = async (context) => {
  const api = ApiHandler();
  const data = await api.list(`products/category/list/805`);

  const paths = data?.payload?.items.map((item) => {
    const category = item?.categories[0]?.id?.toString();

    return {
      params: {
        path: category?.split(","),
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  const { path } = context.params;
  console.log("par", path);
  const api = ApiHandler();

  return {
    props: {
      categoryData: await api
        .get(`/categories/product/single/${path[path?.length - 1]}`)
        .then((response) => response.payload),

      productsItems: await api
        .list(`/products/category/list/${path[path?.length - 1]}`, {
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            limit: 24,
            page: 1,
            sort: { field: "stickers", direction: "asc" },
            filters: [],
            render : false,
          }),
          
        })
        .then((response) => response.payload.items),
      filters: await api
        .post(`/products/category/filters/${path[path?.length - 1]}`)
        .then((response) => response.payload),
    },
    revalidate: 60,
  };
};

// export const getServerSideProps = async (context) => {
// // 	context.res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
// // 	const { path } = context.query;
// // 	const id = path[path.length - 1];
// // 	const api = ApiHandler();
// // 	return {
// // 		props: {
// // 			categoryData: await api.get(`/categories/product/single/${id}`).then((response) => response.payload),
// // 			filters: await api.post(`/products/category/filters/${id}`).then((response) => response.payload),
// // 		},
// // 	};
// // };
