/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-nested-ternary */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable eqeqeq */
import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/legacy/image";
import Loader from "rsuite/Loader";
import {
  GoogleReCaptcha,
  GoogleReCaptchaProvider,
} from "react-google-recaptcha-v3";
import classes from "./CheckoutPage.module.scss";

import { ApiHandler } from "../../helpers/api";
import { currencyFormat } from "../../helpers/functions";
import { useCartContext } from "../../helpers/cartContext";

const CartProductBox = dynamic(() => import("../../components/CartProductBox"));
const Seo = dynamic(() => import("../../components/Seo/Seo"));

const CheckoutPage = ({ paymentoptions, deliveryoptions }) => {
  const router = useRouter();
  const [token, setToken] = useState();
  const [refreshReCaptcha, setRefreshReCaptcha] = useState(false);
  const [isLoadingSend, setIsLoadingSend] = useState(false);
  const [isLoadingList, setIsLoadingList] = useState(true);

  const verifyCaptcha = useCallback((token) => {
    setToken(token);
  }, []);

  const [cart, mutateCart] = useCartContext();
  const [cartData, setCartData] = useState({ items: [{}] });
  const [secondAddress, setSecondAddress] = useState(false);
  const [formData, setFormData] = useState({
    type: "personal",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    object_number: "",
    zip_code: "",
    town: "",
    note: "",
    company_name: "",
    pib: "",
    maticni_broj: "",
    gcaptcha: token,
    shipping_first_name: "",
    shipping_last_name: "",
    shipping_email: "",
    shipping_phone: "",
    shipping_address: "",
    shipping_object_number: "",
    shipping_zip_code: "",
    shipping_town: "",
    shipping_note: "",
    shipping_company_name: "",

    delivery: null,
    payment: null,
    agreed: null,
  });

  const required = [
    "first_name",
    "last_name",
    "email",
    "phone",
    "object_number",
    "address",
    "zip_code",
    "town",
    "shipping_first_name",
    "shipping_last_name",
    "shipping_email",
    "shipping_phone",
    "shipping_address",
    "shipping_object_number",
    "shipping_address",
    "shipping_zip_code",
    "shipping_town",
    "delivery",
    "payment",
    "agreed",
  ];

  const companyrequired = [
    "company_name",
    "pib",
    "maticni_broj",
    "shipping_company_name",
  ];
  const errorMsg = "polje je obavezno";
  const errorSelect = "odaberite opciju";
  const errorChecked = "polje je obavezno čekirati";

  const [errors, setErrors] = useState([]);

  const getCart = useCallback(() => {
    const api = ApiHandler();
    setIsLoadingList(true);
    api
      .list("cart?render=false",)
      .then((response) => {
        setCartData(response?.payload);
      })
      .catch((error) => {
        console.warn(error);
      })
      .finally(() => {
        setIsLoadingList(false);
      });
  }, []);

  useEffect(() => {
    getCart();
  }, [getCart, cart]);

  const cartItems = cartData.items ?? [];
  const cartCost = cartData.summary;

  const formChangeHandler = ({ target }) => {
    setErrors(errors.filter((item) => item != target.name));

    if (target.type === "radio" && target.checked) {
      setFormData({ ...formData, [target.name]: target.value });
    } else {
      setFormData({ ...formData, [target.name]: target.value });
    }
  };

  const formSubmitHandler = () => {
    setRefreshReCaptcha(true);
    const err = [];
    for (const key in formData) {
      const item = formData[key];
      if (
        (formData.type === "company" &&
          companyrequired.includes(key) &&
          (item === "" || item == null)) ||
        (required.includes(key) && (item === "" || item == null))
      ) {
        if (key.includes("shipping")) {
          if (secondAddress) {
            err.push(key);
          }
        } else {
          err.push(key);
        }
      }
    }

    if (err.length > 0) {
      setErrors(err);
    } else {
      setIsLoadingSend(true);
      const api = ApiHandler();
      const ret = {
        customer_type_billing: formData.type,
        id_company_shipping: null,
        id_company_address_shipping: null,
        company_name_shipping:
          formData.type === "company"
            ? secondAddress
              ? formData.shipping_company_name
              : formData.company_name
            : null,
        pib_shipping: formData.type === "company" ? formData.pib : null,
        maticni_broj_shipping:
          formData.type === "company" ? formData.maticni_broj : null,
        first_name_shipping: secondAddress
          ? formData.shipping_first_name
          : formData.first_name,
        last_name_shipping: secondAddress
          ? formData.shipping_last_name
          : formData.last_name,
        phone_shipping: secondAddress
          ? formData.shipping_phone
          : formData.phone,
        email_shipping: secondAddress
          ? formData.shipping_email
          : formData.email,
        address_shipping: secondAddress
          ? formData.shipping_address
          : formData.address,
        object_number_shipping: secondAddress
          ? formData.shipping_object_number
          : formData.object_number,
        floor_shipping: "",
        apartment_number_shipping: "",
        id_town_shipping: null,
        town_name_shipping: secondAddress
          ? formData.shipping_town
          : formData.town,
        zip_code_shipping: secondAddress
          ? formData.shipping_zip_code
          : formData.zip_code,
        id_municipality_shipping: null,
        municipality_name_shipping: "",
        id_country_shipping: null,
        country_name_shipping: "Srbija",
        note_shipping: secondAddress ? formData.shipping_note : formData.note,
        id_company_billing: null,
        id_company_address_billing: null,
        company_name_billing:
          formData.type === "company" ? formData.company_name : null,
        pib_billing: formData.type === "company" ? formData.pib : null,
        maticni_broj_billing:
          formData.type === "company" ? formData.maticni_broj : null,
        first_name_billing: formData.first_name,
        last_name_billing: formData.last_name,
        phone_billing: formData.phone,
        email_billing: formData.email,
        address_billing: formData.address,
        object_number_billing: formData.object_number,
        floor_billing: "",
        apartment_number_billing: "",
        id_town_billing: null,
        town_name_billing: formData.town,
        zip_code_billing: formData.zip_code,
        id_municipality_billing: null,
        municipality_name_billing: "",
        id_country_billing: null,
        country_name_billing: "Srbija",
        note_billing: formData.note,

        delivery_method: formData.delivery,
        delivery_method_options: [],

        payment_method: formData.payment,
        payment_method_options: [],

        promo_code: null,
        promo_code_options: [],
        gcaptcha: token,
        note: formData.note,

        accept_rules: 1,
      };

      api
        .post("/checkout/one-page", ret)
        .then((response) => {
          const token = response?.payload?.order?.order_token;
          mutateCart();
          router.push(`/korpa/${token}`);
          setIsLoadingSend(false);
        })
        .catch((error) => {
          console.warn(error);
          setIsLoadingSend(false);
        })
        .finally(() => {
          setRefreshReCaptcha(false);
        });
    }
  };

  const [checkoutSummary, setCheckoutSummary] = useState([]);
  useEffect(() => {
    const api = ApiHandler();
    const getSummary = async () => {
      return await api.get(`/checkout/summary`).then((response) => {
        setCheckoutSummary(response?.payload);
      });
    };
    getSummary();
  }, [cartItems]);

  return (
    <>
      <Seo
        title="Vaša korpa"
        description="Vaša korpa"
        ogtitle="Vaša korpa"
        ogdescription="Vaša korpa"
        ogurl={`${process.env.BASE_URL}korpa`}
      />
      <GoogleReCaptchaProvider reCaptchaKey={process.env.CAPTCHAKEY}>
        <GoogleReCaptcha
          onVerify={verifyCaptcha}
          refreshReCaptcha={refreshReCaptcha}
        />
        <div className={`${classes.checkout} container`}>
          <h5 className={classes["your-cart"]}>Vaša korpa</h5>
          {isLoadingList ? (
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
          ) : (
            <div className="row">
              {cartItems.length > 0 ? (
                <>
                  <div className={`${classes["left-side"]} col-xxl-7 col-12`}>
                    <div className={classes["user-info"]}>
                      <div className={classes["radio-face"]}>
                        <input
                          type="radio"
                          className={classes["basic-radio"]}
                          name="type"
                          value="personal"
                          id="personal"
                          onChange={formChangeHandler}
                          checked={formData.type === "personal"}
                        />
                        <label htmlFor="personal">
                          Poručujem kao fizičko lice
                        </label>
                        <input
                          type="radio"
                          className={classes["basic-radio"]}
                          name="type"
                          value="company"
                          id="company"
                          onChange={formChangeHandler}
                        />
                        <label htmlFor="company">
                          Poručujem kao pravno lice
                        </label>
                      </div>

                      {formData.type === "company" && (
                        <>
                          <div
                            className={`${classes["input-info-container"]} row`}
                          >
                            <div
                              className={`${classes["input-info"]} col-lg-12 col-12`}
                            >
                              <label
                                className={classes["input-label"]}
                                htmlFor="company_name"
                              >
                                Naziv kompanije:{" "}
                                <span className="mandatory">*</span>
                                {errors.includes("company_name") && (
                                  <span className={classes.errorMsg}>
                                    {errorMsg}
                                  </span>
                                )}
                              </label>
                              <div className={classes["input-info-padding"]}>
                                <input
                                  className={classes.input}
                                  id="company_name"
                                  type="text"
                                  name="company_name"
                                  value={formData.company_name}
                                  onChange={formChangeHandler}
                                />
                              </div>
                            </div>
                          </div>
                          <div
                            className={`${classes["input-info-container"]} row`}
                          >
                            <div
                              className={`${classes["input-info-left"]} col-lg-6 col-12`}
                            >
                              <label
                                className={classes["input-label"]}
                                htmlFor="pib"
                              >
                                PIB: <span className="mandatory">*</span>
                                {errors.includes("pib") && (
                                  <span className={classes.errorMsg}>
                                    {errorMsg}
                                  </span>
                                )}
                              </label>
                              <div className={classes["input-info-padding"]}>
                                <input
                                  className={classes.input}
                                  id="pib"
                                  type="text"
                                  name="pib"
                                  value={formData.pib}
                                  onChange={formChangeHandler}
                                />
                              </div>
                            </div>
                            <div
                              className={`${classes["input-info-right"]} col-lg-6 col-12`}
                            >
                              <label
                                className={classes["input-label"]}
                                htmlFor="maticni_broj"
                              >
                                Matični broj:{" "}
                                <span className="mandatory">*</span>
                                {errors.includes("maticni_broj") && (
                                  <span className={classes.errorMsg}>
                                    {errorMsg}
                                  </span>
                                )}
                              </label>
                              <div className={classes["input-info-padding"]}>
                                <input
                                  className={classes.input}
                                  id="maticni_broj"
                                  type="text"
                                  name="maticni_broj"
                                  value={formData.maticni_broj}
                                  onChange={formChangeHandler}
                                />
                              </div>
                            </div>
                          </div>
                        </>
                      )}

                      <div className={`${classes["input-info-container"]} row`}>
                        <div
                          className={`${classes["input-info-left"]} col-lg-6 col-12`}
                        >
                          <label
                            className={classes["input-label"]}
                            htmlFor="name"
                          >
                            Ime: <span className="mandatory">*</span>
                            {errors.includes("first_name") && (
                              <span className={classes.errorMsg}>
                                {errorMsg}
                              </span>
                            )}
                          </label>
                          <div className={classes["input-info-padding"]}>
                            <input
                              className={classes.input}
                              id="name"
                              type="text"
                              name="first_name"
                              value={formData.first_name}
                              onChange={formChangeHandler}
                            />
                          </div>
                          <label
                            className={classes["input-label"]}
                            htmlFor="surname"
                          >
                            Prezime: <span className="mandatory">*</span>
                            {errors.includes("last_name") && (
                              <span className={classes.errorMsg}>
                                {errorMsg}
                              </span>
                            )}
                          </label>
                          <div className={classes["input-info-padding"]}>
                            <input
                              className={classes.input}
                              id="surname"
                              type="text"
                              name="last_name"
                              value={formData.last_name}
                              onChange={formChangeHandler}
                            />
                          </div>
                          <label
                            className={classes["input-label"]}
                            htmlFor="email"
                          >
                            E-mail: <span className="mandatory">*</span>
                            {errors.includes("email") && (
                              <span className={classes.errorMsg}>
                                {errorMsg}
                              </span>
                            )}
                          </label>
                          <div className={classes["input-info-padding"]}>
                            <input
                              className={classes.input}
                              id="email"
                              type="text"
                              name="email"
                              value={formData.email}
                              onChange={formChangeHandler}
                            />
                          </div>
                        </div>
                        <div
                          className={`${classes["input-info-right"]} col-lg-6 col-12`}
                        >
                          <label
                            className={classes["input-label"]}
                            htmlFor="phone"
                          >
                            Telefon: <span className="mandatory">*</span>
                            {errors.includes("phone") && (
                              <span className={classes.errorMsg}>
                                {errorMsg}
                              </span>
                            )}
                          </label>
                          <div className={classes["input-info-padding"]}>
                            <input
                              className={classes.input}
                              id="phone"
                              type="text"
                              name="phone"
                              value={formData.phone}
                              onChange={formChangeHandler}
                            />
                          </div>
                          <div className="row">
                            <div className="col-6">
                              <label
                                className={classes["input-label"]}
                                htmlFor="address"
                              >
                                Ulica: <span className="mandatory">*</span>
                                {errors.includes("address") && (
                                  <span className={classes.errorMsg}>
                                    {errorMsg}
                                  </span>
                                )}
                              </label>
                              <div className={classes["input-info-padding"]}>
                                <input
                                  className={classes.input}
                                  id="address"
                                  type="text"
                                  name="address"
                                  value={formData.address}
                                  onChange={formChangeHandler}
                                />
                              </div>
                            </div>
                            <div className="col-6">
                              <label
                                className={classes["input-label"]}
                                htmlFor="object_number"
                              >
                                Broj: <span className="mandatory">*</span>
                                {errors.includes("object_number") && (
                                  <span className={classes.errorMsg}>
                                    {errorMsg}
                                  </span>
                                )}
                              </label>
                              <div className={classes["input-info-padding"]}>
                                <input
                                  className={classes.input}
                                  id="object_number"
                                  type="text"
                                  name="object_number"
                                  value={formData.object_number}
                                  onChange={formChangeHandler}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-6">
                              <label
                                className={classes["input-label"]}
                                htmlFor="zip_code"
                              >
                                Poštanski broj:{" "}
                                <span className="mandatory">*</span>
                                {errors.includes("zip_code") && (
                                  <span className={classes.errorMsg}>
                                    {errorMsg}
                                  </span>
                                )}
                              </label>
                              <div className={classes["input-info-padding"]}>
                                <input
                                  className={classes.input}
                                  id="zip_code"
                                  type="text"
                                  name="zip_code"
                                  value={formData.zip_code}
                                  onChange={formChangeHandler}
                                />
                              </div>
                            </div>
                            <div className="col-6">
                              <label
                                className={classes["input-label"]}
                                htmlFor="town"
                              >
                                Grad: <span className="mandatory">*</span>
                                {errors.includes("town") && (
                                  <span className={classes.errorMsg}>
                                    {errorMsg}
                                  </span>
                                )}
                              </label>
                              <div className={classes["input-info-padding"]}>
                                <input
                                  className={classes.input}
                                  id="town"
                                  type="text"
                                  name="town"
                                  value={formData.town}
                                  onChange={formChangeHandler}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={`${classes["additional-user-info"]} row`}>
                        <div
                          className={`${classes["user-info-adress"]} col-lg-6 col-12`}
                        >
                          <h6>Adresa dostave</h6>
                          <p className={classes["user-info-adress-p"]}>
                            Zahtevajte drugu adresu za dostavu u odnosu na
                            adresu računa.
                          </p>
                          <div className={classes["padding-125"]}>
                            <button
                              className={classes.input}
                              onClick={() => setSecondAddress(!secondAddress)}
                              type="button"
                            >
                              Druga adresa dostave
                            </button>
                          </div>
                        </div>
                        <div
                          className={`${classes["user-note"]} col-lg-6 col-12`}
                        >
                          <label
                            className={classes["input-label"]}
                            htmlFor="note"
                          >
                            Napomena:
                          </label>
                          <div className={classes["input-info-padding"]}>
                            <textarea
                              id="note"
                              type="text"
                              rows="4"
                              name="note"
                              value={formData.note}
                              onChange={formChangeHandler}
                            />
                          </div>
                        </div>
                      </div>
                      {secondAddress && formData.type === "company" && (
                        <>
                          <div
                            className={`${classes["input-info-container"]} row`}
                          >
                            <div
                              className={`${classes["input-info"]} col-lg-12 col-12`}
                            >
                              <label
                                className={classes["input-label"]}
                                htmlFor="shipping_company_name"
                              >
                                Naziv kompanije:{" "}
                                <span className="mandatory">*</span>
                                {errors.includes("shipping_company_name") && (
                                  <span className={classes.errorMsg}>
                                    {errorMsg}
                                  </span>
                                )}
                              </label>
                              <div className={classes["input-info-padding"]}>
                                <input
                                  className={classes.input}
                                  id="shipping_company_name"
                                  type="text"
                                  name="shipping_company_name"
                                  value={formData.shipping_company_name}
                                  onChange={formChangeHandler}
                                />
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                      {secondAddress && (
                        <>
                          <div
                            className={`${classes["input-info-container"]} row`}
                          >
                            <div
                              className={`${classes["input-info-left"]} col-lg-6 col-12`}
                            >
                              <label
                                className={classes["input-label"]}
                                htmlFor="shipping_name"
                              >
                                Ime: <span className="mandatory">*</span>
                                {errors.includes("shipping_first_name") && (
                                  <span className={classes.errorMsg}>
                                    {errorMsg}
                                  </span>
                                )}
                              </label>
                              <div className={classes["input-info-padding"]}>
                                <input
                                  className={classes.input}
                                  id="shipping_name"
                                  type="text"
                                  name="shipping_first_name"
                                  value={formData.shipping_first_name}
                                  onChange={formChangeHandler}
                                />
                              </div>
                              <label
                                className={classes["input-label"]}
                                htmlFor="shipping_surname"
                              >
                                Prezime: <span className="mandatory">*</span>
                                {errors.includes("shipping_last_name") && (
                                  <span className={classes.errorMsg}>
                                    {errorMsg}
                                  </span>
                                )}
                              </label>
                              <div className={classes["input-info-padding"]}>
                                <input
                                  className={classes.input}
                                  id="shipping_surname"
                                  type="text"
                                  name="shipping_last_name"
                                  value={formData.shipping_last_name}
                                  onChange={formChangeHandler}
                                />
                              </div>
                              <label
                                className={classes["input-label"]}
                                htmlFor="shipping_email"
                              >
                                E-mail: <span className="mandatory">*</span>
                                {errors.includes("shipping_email") && (
                                  <span className={classes.errorMsg}>
                                    {errorMsg}
                                  </span>
                                )}
                              </label>
                              <div className={classes["input-info-padding"]}>
                                <input
                                  className={classes.input}
                                  id="shipping_email"
                                  type="text"
                                  name="shipping_email"
                                  value={formData.shipping_email}
                                  onChange={formChangeHandler}
                                />
                              </div>
                            </div>
                            <div
                              className={`${classes["input-info-right"]} col-lg-6 col-12`}
                            >
                              <label
                                className={classes["input-label"]}
                                htmlFor="shipping_phone"
                              >
                                Telefon: <span className="mandatory">*</span>
                                {errors.includes("shipping_phone") && (
                                  <span className={classes.errorMsg}>
                                    {errorMsg}
                                  </span>
                                )}
                              </label>
                              <div className={classes["input-info-padding"]}>
                                <input
                                  className={classes.input}
                                  id="shipping_phone"
                                  type="text"
                                  name="shipping_phone"
                                  value={formData.shipping_phone}
                                  onChange={formChangeHandler}
                                />
                              </div>
                              <div className="row">
                                <div className="col-6">
                                  <label
                                    className={classes["input-label"]}
                                    htmlFor="shipping_address"
                                  >
                                    Adresa dostave:{" "}
                                    <span className="mandatory">*</span>
                                    {errors.includes("shipping_address") && (
                                      <span className={classes.errorMsg}>
                                        {errorMsg}
                                      </span>
                                    )}
                                  </label>
                                  <div
                                    className={classes["input-info-padding"]}
                                  >
                                    <input
                                      className={classes.input}
                                      id="shipping_address"
                                      type="text"
                                      name="shipping_address"
                                      value={formData.shipping_address}
                                      onChange={formChangeHandler}
                                    />
                                  </div>
                                </div>
                                <div className="col-6">
                                  <label
                                    className={classes["input-label"]}
                                    htmlFor="shipping_object_number"
                                  >
                                    Broj: <span className="mandatory">*</span>
                                    {errors.includes(
                                      "shipping_object_number"
                                    ) && (
                                      <span className={classes.errorMsg}>
                                        {errorMsg}
                                      </span>
                                    )}
                                  </label>
                                  <div
                                    className={classes["input-info-padding"]}
                                  >
                                    <input
                                      className={classes.input}
                                      id="shipping_object_number"
                                      type="text"
                                      name="shipping_object_number"
                                      value={formData.shipping_object_number}
                                      onChange={formChangeHandler}
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="row">
                                <div className="col-6">
                                  <label
                                    className={classes["input-label"]}
                                    htmlFor="shipping_zip_code"
                                  >
                                    Poštanski broj:{" "}
                                    <span className="mandatory">*</span>
                                    {errors.includes("shipping_zip_code") && (
                                      <span className={classes.errorMsg}>
                                        {errorMsg}
                                      </span>
                                    )}
                                  </label>
                                  <div
                                    className={classes["input-info-padding"]}
                                  >
                                    <input
                                      className={classes.input}
                                      id="shipping_zip_code"
                                      type="text"
                                      name="shipping_zip_code"
                                      value={formData.shipping_zip_code}
                                      onChange={formChangeHandler}
                                    />
                                  </div>
                                </div>
                                <div className="col-6">
                                  <label
                                    className={classes["input-label"]}
                                    htmlFor="shipping_town"
                                  >
                                    Grad: <span className="mandatory">*</span>
                                    {errors.includes("shipping_town") && (
                                      <span className={classes.errorMsg}>
                                        {errorMsg}
                                      </span>
                                    )}
                                  </label>
                                  <div
                                    className={classes["input-info-padding"]}
                                  >
                                    <input
                                      className={classes.input}
                                      id="shipping_town"
                                      type="text"
                                      name="shipping_town"
                                      value={formData.shipping_town}
                                      onChange={formChangeHandler}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className={`${classes["additional-user-info"]} row`}
                          >
                            <div
                              className={`${classes["input-info"]} col-lg-12 col-12`}
                            >
                              <label
                                className={classes["input-label"]}
                                htmlFor="shipping_note"
                              >
                                Napomena:
                              </label>
                              <div className={classes["input-info-padding"]}>
                                <textarea
                                  id="shipping_note"
                                  type="text"
                                  rows="4"
                                  name="shipping_note"
                                  value={formData.shipping_note}
                                  onChange={formChangeHandler}
                                />
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    <div className={classes["products-container"]}>
                      <CartProductBox cartItems={cartItems} />
                    </div>
                  </div>
                  <div className={`${classes["right-side"]} col-xxl-5 col-12`}>
                    <div className={classes["same-height-1"]}>
                      <div className={classes["way-of-delivery"]}>
                        <h5>Odaberite način dostave:</h5>
                        {errors.includes("delivery") && (
                          <span className={classes.errorMsg}>
                            {errorSelect}
                          </span>
                        )}
                        <div className={classes.padding}>
                          {(deliveryoptions ?? []).map((item) => (
                            <div key={item.type}>
                              <div className={classes["radio-face"]}>
                                <input
                                  type="radio"
                                  className={classes["basic-radio"]}
                                  name="delivery"
                                  value={item.id}
                                  id={`delivery${item.id}`}
                                  onChange={formChangeHandler}
                                />
                                <label htmlFor={`delivery${item.id}`}>
                                  {item.name}
                                </label>
                              </div>
                              {}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className={classes["way-of-payement"]}>
                        <h5>Odaberite način plaćanja:</h5>
                        {errors.includes("payment") && (
                          <span className={classes.errorMsg}>
                            {errorSelect}
                          </span>
                        )}
                        <div className={classes.padding}>
                          {(paymentoptions ?? []).map((item) => (
                            <div
                              className={classes["radio-face"]}
                              key={item.id}
                            >
                              <input
                                type="radio"
                                className={classes["basic-radio"]}
                                name="payment"
                                value={item.id}
                                id={`payment${item.id}`}
                                onChange={formChangeHandler}
                              />
                              <label htmlFor={`payment${item.id}`}>
                                {item.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className={classes["same-height-2"]}>
                      <div className={classes["value-container"]}>
                        <h5>Vrednost Vaše korpe:</h5>
                        <span className={classes["value-span"]}>
                          Ukupna vrednost korpe:
                          <span className={classes["value-span-right"]}>
                            {currencyFormat(
                              cartCost?.totals?.with_vat ?? 0,
                              cartCost?.currency
                            )}
                          </span>
                        </span>
                        <span className={classes["value-span"]}>
                          {console.log(checkoutSummary)}
                          Iznos dodatnog popusta u korpi:
                          <span className={classes["value-span-right"]}>
                            {currencyFormat(
                              -checkoutSummary?.summary?.totals
                                ?.items_discount_amount
                            )}
                          </span>
                        </span>
                        <span className={classes["value-span"]}>
                          Iznos koštanja transporta:
                          <span className={classes["value-span-right"]}>
                            {currencyFormat(
                              checkoutSummary?.summary?.totals?.delivery_amount
                            )}
                          </span>
                        </span>
                        <span className={classes["value-span"]}>
                          Iznos PDV-a:
                          <span className={classes["value-span-right"]}>
                            {currencyFormat(
                              cartCost?.totals?.vat ?? 0,
                              cartCost?.currency
                            )}
                          </span>
                        </span>
                        <span className={classes["value-span"]}>
                          Ukupna vrednost korpe nakon popusta:
                          <span className={classes["value-span-right-sum"]}>
                            {currencyFormat(
                              checkoutSummary?.summary?.totals?.total
                            )}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={classes.agree}>
                    <div className="d-flex">
                      <input
                        type="checkbox"
                        id="agreed"
                        name="agreed"
                        onChange={formChangeHandler}
                        value={formData.agreed === "1" ? "" : "1"}
                      />
                      <label htmlFor="agreed">
                        Saglasan sam sa opštim uslovima korišćenja Stojić shop-a
                      </label>
                    </div>

                    {errors.includes("agreed") && (
                      <span className={classes.errorMsg}>{errorChecked}</span>
                    )}
                  </div>
                  <div className={classes["end-button-container"]}>
                    <div>
                      {isLoadingSend ? (
                        <button
                          type="button"
                          className={`${classes["end-button"]} ${classes["loading-button"]}`}
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
                          type="button"
                          className={`${classes["end-button"]} basic-button-sec`}
                          onClick={formSubmitHandler}
                        >
                          Završi kupovinu
                        </button>
                      )}

                      {errors.length > 0 && (
                        <p className={classes.errorMsg}>
                          Nisu popunjena sva obavezna polja
                        </p>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <div>
                  <p className="mb-3">Vaša korpa je prazna!</p>
                  <Link href="/" className="button-back-to-home">
                    Vratite se na početnu stranicu
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </GoogleReCaptchaProvider>
    </>
  );
};

export default CheckoutPage;

export const getStaticProps = async () => {
  const api = ApiHandler();

  return {
    props: {
      paymentoptions: await api
        .get("checkout/payment-options")
        .then((response) => response?.payload),
      deliveryoptions: await api
        .get("checkout/delivery-options")
        .then((response) => response?.payload),
    },
  };
};
