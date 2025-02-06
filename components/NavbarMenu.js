/* eslint-disable no-unused-expressions */
/* eslint-disable no-use-before-define */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-irregular-whitespace */
import React, { useState, useCallback, useEffect, useRef } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { NavDropdown } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import CloseButton from "react-bootstrap/CloseButton";
import Nav from "react-bootstrap/Nav";
import Link from "next/link";
import Image from "next/legacy/image";
import { useRouter } from "next/router";
// import { BsHandbag, BsSearch, BsEnvelope, BsX } from 'react-icons/bs';
// import { SlUser } from 'react-icons/sl';
// import { FaRegUser, FaPhoneAlt } from 'react-icons/fa';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBag,
  faMagnifyingGlass,
  faPhone,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import classes from "./NavbarMenu.module.scss";
import { ApiHandler } from "../helpers/api";
import { generateMenu } from "../helpers/generateMenu";
import Categories from "./Categories/Categories";
import { useCartContext } from "../helpers/cartContext";
import { currencyFormat } from "../helpers/functions";
// import { TfiLocationPin } from 'react-icons/tfi';

const NavbarMenu = ({ categoryData }) => {
  const [isShown, setIsShown] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishCount, setWishCount] = useState(0);
  const [headerTotal, setHeaderTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryItem, setCategoryItem] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [searchCategory, setSearchCategory] = useState("");
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);

  const [showDivCartCount, setShowDivCartCount] = useState(false);
  const [showDivWishListCount, setShowDivWishListCount] = useState(false);

  const myRef = useRef(null);

  const setCategoryItemHandler = (item) => {
    setCategoryItem(item);
  };

  const setSelectedCatIdHandler = (item) => {
    setSelectedCategoryId(selectedCategoryId === item.id ? null : item.id);
  };

  const closeLeftSidebarModal = () => {
    setIsShown(false);
    setSelectedCategoryId(null);
  };

  const closeLeftSideMobileModal = () => {
    onMobileDivShow();
    setSelectedCategoryId(null);
  };

  const setSearchCategoryhandler = (searchTermCat) => {
    setSearchCategory(searchTermCat);
  };

  const router = useRouter();

  // Shows mobile hamburger div
  const [showMobileDiv, setShowMobileDiv] = useState(false);
  const onMobileDivShow = () => {
    if (!showMobileDiv) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "scroll";
    setShowMobileDiv((prev) => !prev);
  };

  const [cart] = useCartContext();
  const [, , , wishList] = useCartContext();

  const getCartCount = useCallback(() => {
    const api = ApiHandler();
    api
      .get("/cart/badge-count")
      .then((response) => {
        setCartCount(response?.payload?.summary?.items_count ?? 0);
      })
      .catch((error) => {
        console.warn(error);
      });
  }, []);

  const getWishCount = useCallback(() => {
    const api = ApiHandler();
    api
      .get("/wishlist/badge-count")
      .then((response) => {
        setWishCount(response?.payload?.summary?.items_count ?? 0);
      })
      .catch((error) => {
        console.warn(error);
      });
  }, []);

  useEffect(() => {
    getCartCount();
  }, [getCartCount, cart]);

  useEffect(() => {
    getWishCount();
  }, [getWishCount, wishList]);

  useEffect(() => {
    const api = ApiHandler();
    api
      .list("cart?render=false",)
      .then((response) => {
        setHeaderTotal(response?.payload.summary.total);
      })
      .catch((error) => console.warn(error));
  }, [cart]);

  const handleSearch = (event) => {
    setIsLoadingSearch(true);
    event.preventDefault();
    router.push(`/search?search=${searchTerm}`);
  };

  const handleButtonClickCart = () => {
    if (cartCount === 0) {
      setShowDivCartCount(!showDivCartCount);
      setShowDivWishListCount(false);
    } else {
      router.push("/korpa");
    }
  };

  const handleCloseClickCart = () => {
    setShowDivCartCount(false);
  };

  const handleButtonClickWishList = () => {
    if (wishCount === 0) {
      setShowDivWishListCount(!showDivWishListCount);
      setShowDivCartCount(false);
    } else {
      router.push("/lista-zelja");
    }
  };

  const handleCloseClickWishlist = () => {
    setShowDivWishListCount(false);
  };

  const handleOutsideClick = (e) => {
    if (myRef.current && !myRef.current.contains(e.target)) {
      setShowDivCartCount(false);
      setShowDivWishListCount(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    router.pathname === "/search" ? setIsLoadingSearch(false) : null;
  }, [router.pathname]);

  return (
    <div>
      <div className={`${classes.navbar}`}>
        <div className={`${classes["top-header"]}`}>
          <div className="container">
            <div className={`${classes["header-links-holder"]}`}>
              <ul className={`${classes["header-links"]}`}>
                {/* <li>
                  <TfiLocationPin />
                  <Link href="/kontakt">Prodavnice</Link>
                </li> */}
                <li>
                  {/* <FaRegUser /> */}
                  <Link href="/">Registruj se ili Uloguj se</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={classes["header-holder"]}>
          <div className="container">
            <Row>
              <Col
                xl={3}
                lg={3}
                className={`${classes["col-holder"]} ${classes["logo-holder"]}`}
              >
                <Link href="/" legacyBehavior>
                  <div className={classes["image-holder"]}>
                    <Image
                      src="/images/logo-color.webp"
                      alt="Stojic-elektrik-logo"
                      priority
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                </Link>
              </Col>
              <Col
                xl={5}
                lg={5}
                md={5}
                className={`${classes["col-holder"]} ${classes["mobile-none"]}`}
              >
                <form
                  className={classes["header-search"]}
                  onSubmit={handleSearch}
                >
                  <div className={classes.newsletter}>
                    <input
                      className={`${`${classes["newsletter-input"]} basic-input`}`}
                      type="text"
                      name="search"
                      id="search"
                      value={searchTerm}
                      onChange={({ target }) => setSearchTerm(target.value)}
                      placeholder="Pretraži proizvode.."
                    />
                    <button
                      type="submit"
                      className={`${`${classes["newsletter-button"]} basic-button`}`}
                      onClick={handleSearch}
                    >
                      {isLoadingSearch ? (
                        <Image
                          src="/images/loading-buffering.gif"
                          alt="loader"
                          width={20}
                          height={20}
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faMagnifyingGlass}
                          style={{
                            color: "#fff",
                            width: "22px",
                            height: "22px",
                          }}
                        />
                      )}
                    </button>
                  </div>
                </form>
              </Col>
              <Col
                xs={4}
                md={4}
                sm={3}
                xl={4}
                lg={4}
                className={classes["col-holder"]}
              >
                <div className={classes["icons-holder"]}>
                  <div>
                    <ul className={classes["icons-list"]}>
                      <li>
                        <button
                          type="button"
                          className={`${classes["button-wishlist"]}`}
                          onClick={handleButtonClickWishList}
                        >
                          <Image
                            src="/images/heart.webp"
                            alt="Lista zelja"
                            width={30}
                            height={30}
                          />
                          <span className={`${classes.marker}`}>
                            {wishCount}
                          </span>
                        </button>
                        {showDivWishListCount && (
                          <div ref={myRef} className="on-click-show-div-zero">
                            <FontAwesomeIcon
                              icon={faXmark}
                              className="close-div-zero"
                              onClick={handleCloseClickCart}
                            />
                            <b>Vaša lista želja je prazna.</b>
                            Da biste videli sadržaj ove stranice, prvo morate
                            dodati artikle u Vašu listu želja.
                          </div>
                        )}
                      </li>
                      <li>
                        <button
                          type="button"
                          className={`${classes["button-checkout"]}`}
                          onClick={handleButtonClickCart}
                        >
                          <Image
                            src="/images/bag-icon.png"
                            alt="Korpa"
                            width={30}
                            height={30}
                          />
                          <span className={`${classes.marker}`}>
                            {cartCount}
                          </span>
                        </button>
                        {showDivCartCount && (
                          <div ref={myRef} className="on-click-show-div-zero">
                            <FontAwesomeIcon
                              icon={faXmark}
                              className="close-div-zero"
                              onClick={handleCloseClickCart}
                            />
                            <b>Vaša korpa je prazna.</b>
                            Da biste videli sadržaj ove stranice, prvo morate
                            dodati artikle u Vašu korpu.
                          </div>
                        )}
                      </li>

                      <li>
                        Moja korpa -
                        <span>
                          &nbsp;
                          {currencyFormat(headerTotal ?? 0)}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <div className={`${classes["bottom-header"]}`}>
          <div className="container">
            <div
              className={`${classes["bottom-header-content"]} d-flex align-items-center`}
            >
              <Col xl={3} lg={3}>
                <ul>
                  <li className={classes["dropdown-hover"]}>
                    <Nav.Link
                      onClick={() => setIsShown(true)}
                      className={`${classes["dropdown-holder"]} ${classes.Link} ${classes.category}`}
                    >
                      <div className="hamburger-menu">
                        <div className="line" />
                        <div className="line" />
                        <div className="line" />
                      </div>
                      <p>Kategorije proizvoda</p>
                    </Nav.Link>
                    <Container
                      fluid
                      className={isShown ? classes.animation : classes.word}
                    >
                      <CloseButton
                        className={classes["close-button"]}
                        aria-label="Hide"
                        onClick={() => {
                          setIsShown(false);
                          setCategoryItem(null);
                        }}
                      />

                      <Categories
                        menu={categoryData}
                        categoryItem={categoryItem}
                        setCategoryItemHandler={setCategoryItemHandler}
                        closeLeftSidebarModal={closeLeftSidebarModal}
                        setSelectedCatIdHandler={setSelectedCatIdHandler}
                        setSearchCategory={setSearchCategory}
                        setSearchCategoryhandler={setSearchCategoryhandler}
                        searchCategory={searchCategory}
                      />
                    </Container>
                    <div
                      className={isShown ? classes.black : "d-none"}
                      onClick={() => {
                        setIsShown(false);
                        setCategoryItem(null);
                      }}
                    />
                  </li>
                </ul>
              </Col>

              <Col xl={5} lg={6} className={classes["nav-holder"]}>
                <Navbar
                  expand="lg"
                  className={classes["navbar-menu"]}
                  style={{ position: "inherit" }}
                >
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse
                    id="basic-navbar-nav"
                    className={classes.holder}
                  >
                    <Nav
                      className={classes.nav}
                      style={{ position: "inherit" }}
                    >
                      <ul className={classes["nav-list"]}>
                        <li>
                          <Link href="/akcija" className={classes.Link}>
                            Akcije
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/nacin-placanja-i-isporuka"
                            className={classes.Link}
                          >
                            Način plaćanja
                          </Link>
                        </li>
                        <li>
                          <Link href="/blog" className={classes.Link}>
                            Blog
                          </Link>
                        </li>
                        <li className={`${classes.activeB2B}`}>
                          <Link
                            href="https://b2b.stojic.rs"
                            className={`${classes.Link} `}
                          >
                            B2B
                          </Link>
                        </li>
                        <li>
                          <Link href="/kontakt" className={classes.Link}>
                            Kontakt
                          </Link>
                        </li>
                      </ul>
                    </Nav>
                  </Navbar.Collapse>
                </Navbar>
              </Col>

              <Col md={3} xl={4} lg={3}>
                <ul
                  className={`${classes["envelope-phone"]} d-flex justify-content-end`}
                >
                  <li>
                    <Link href="mailto:web@stojic.rs" legacyBehavior>
                      <span>
                        <FontAwesomeIcon icon={faEnvelope} />
                        <span>web@stojic.rs</span>
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link href="tel:00381653773300" legacyBehavior>
                      <span>
                        <FontAwesomeIcon icon={faPhone} />
                        <span>+381 65 377 330 0 </span>
                      </span>
                    </Link>
                  </li>
                </ul>
              </Col>
            </div>
          </div>
        </div>
      </div>

      <div className={`${classes["mobile-navbar"]}`}>
        <div className={classes["header-holder"]}>
          <div className="container">
            <Row className={`${classes["top-header-mobile"]}`}>
              <Col
                xs={6}
                sm={6}
                md={4}
                className={`${classes["col-holder"]} ${classes["logo-holder"]}`}
              >
                <Link href="/" legacyBehavior>
                  <div className={classes["image-holder"]}>
                    <Image
                      src="/images/logo-color.webp"
                      alt="React"
                      priority
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                </Link>
              </Col>
              <Col md={8} sm={6} xs={6} className={classes["col-holder"]}>
                <div className={classes["icons-holder"]}>
                  <div>
                    <ul className={classes["icons-list"]}>
                      {/* <li>
												<FontAwesomeIcon icon={faUser} />
											</li> */}
                      <li>
                        <button
                          type="button"
                          className={`${classes["button-wishlist"]}`}
                          onClick={() => router.push("/lista-zelja")}
                        >
                          <Image
                            src="/images/heart.webp"
                            alt="Lista zelja"
                            width={30}
                            height={30}
                          />
                          <span className={`${classes.marker}`}>
                            {wishCount}
                          </span>
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className={`${classes["button-checkout"]}`}
                          onClick={() => router.push("/korpa")}
                        >
                          <Image
                            src="/images/bag-icon.png"
                            alt="Korpa"
                            width={30}
                            height={30}
                          />
                          <span className={`${classes.marker}`}>
                            {cartCount}
                          </span>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </Col>
            </Row>
            <Row className={`${classes.bckMobile} d-flex align-items-center`}>
              <Col
                xs={2}
                md={6}
                sm={4}
                className={classes["mobile-nav-holder"]}
              >
                <div className={`${classes["mobile-nav"]}`}>
                  {!showMobileDiv ? (
                    <div
                      id="nav-icon"
                      className={
                        showMobileDiv
                          ? ` ${classes["nav-icon"]} open ${classes["nav-icon-active"]}`
                          : classes["nav-icon"]
                      }
                      onClick={closeLeftSideMobileModal}
                    >
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>
                  ) : null}

                  <div
                    className={
                      showMobileDiv
                        ? `${classes["mobile-header-div-active"]} ${classes["mobile-header-div"]}`
                        : `${classes["mobile-header-div-deactive"]} ${classes["mobile-header-div"]}`
                    }
                  >
                    <ul className={classes["mobile-header-list"]}>
                      <li className={`${classes.close}`}>
                        <CloseButton onClick={closeLeftSideMobileModal} />
                      </li>
                      <li
                        onClick={() => {
                          router.push("/");
                          onMobileDivShow();
                        }}
                        className={classes["mobile-nav-link"]}
                      >
                        Početna
                      </li>
                      <li>
                        <div className={`${classes["category-image"]}`}>
                          <Image
                            src="/images/menu-categories.webp"
                            width={15}
                            height={15}
                            alt="Stojic Elektrik doo"
                          />
                        </div>
                        <NavDropdown
                          title="Kategorije"
                          id="basic-nav-dropdown"
                          className={`${classes["mobile-nav-link"]} gray`}
                        >
                          <div xs={1} className={classes["nav-submenu-item"]}>
                            <div className={classes["submenu-item-holder"]}>
                              <Categories
                                menu={categoryData}
                                categoryItem={categoryItem}
                                setCategoryItemHandler={setCategoryItemHandler}
                                closeLeftSidebarModal={closeLeftSideMobileModal}
                                selectedCategoryId={selectedCategoryId}
                                setSelectedCatIdHandler={
                                  setSelectedCatIdHandler
                                }
                                setSearchCategoryhandler={() => {}}
                                isMobile
                              />
                            </div>
                          </div>
                        </NavDropdown>
                      </li>

                      <li
                        onClick={() => {
                          router.push("/akcija");
                          onMobileDivShow();
                        }}
                        className={classes["mobile-nav-link"]}
                      >
                        Akcije
                      </li>
                      <li
                        onClick={() => {
                          router.push("/nacin-placanja-i-isporuka");
                          onMobileDivShow();
                        }}
                        className={classes["mobile-nav-link"]}
                      >
                        Način plaćanja
                      </li>
                      <li
                        onClick={() => {
                          router.push("/blog");
                          onMobileDivShow();
                        }}
                        className={classes["mobile-nav-link"]}
                      >
                        Blog
                      </li>
                      <li
                        onClick={() => {
                          router.push("https://b2b.stojic.rs");
                          onMobileDivShow();
                        }}
                        className={`${classes["mobile-nav-link"]} ${classes.activeB2B}`}
                      >
                        B2B
                      </li>
                      <li
                        onClick={() => {
                          router.push("/kontakt");
                          onMobileDivShow();
                        }}
                        className={classes["mobile-nav-link"]}
                      >
                        Kontakt
                      </li>
                    </ul>
                  </div>
                </div>
              </Col>
              <Col md={6} sm={8} xs={10} className={`${classes["col-holder"]}`}>
                <form
                  className={classes["header-search"]}
                  onSubmit={handleSearch}
                >
                  <div className={classes.newsletter}>
                    <input
                      className={`${`${classes["newsletter-input"]} basic-input`}`}
                      type="text"
                      name="search"
                      id="search"
                      value={searchTerm}
                      onChange={({ target }) => setSearchTerm(target.value)}
                      placeholder="Pretraži proizvode.."
                    />
                    <button
                      type="submit"
                      className={`${`${classes["newsletter-button"]} basic-button`}`}
                      onClick={handleSearch}
                    >
                      <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        style={{
                          color: "#fff",
                          width: "22px",
                          height: "22px",
                        }}
                      />
                    </button>
                  </div>
                </form>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarMenu;
