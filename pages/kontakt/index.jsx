/* eslint-disable no-return-await */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable eqeqeq */
import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

import Image from "next/legacy/image";
import { useRouter } from "next/router";

import {
  GoogleReCaptcha,
  GoogleReCaptchaProvider,
} from "react-google-recaptcha-v3";
import classes from "./ContactPage.module.scss";
import { ApiHandler } from "../../helpers/api";
import { openAlertBox } from "../../helpers/tostify";

const Stores = dynamic(() => import("../../components/Stores/Stores"));
const Seo = dynamic(() => import("../../components/Seo/Seo"));

const ContactPage = () => {
  const [selectContact, setSelectContact] = useState("");
  const [token, setToken] = useState();
  const [refreshReCaptcha, setRefreshReCaptcha] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const verifyCaptcha = useCallback((token) => {
    setToken(token);
  }, []);

  const router = useRouter();

  const { id, name } = router.query;

  const [formData, setFormData] = useState({
    customer_name: "",
    email: "",
    phone: "",
    message: "",
    city: "",
    gcaptcha: token,
    agreed: null,
  });

  const required = [
    "customer_name",
    "email",
    "phone",
    "agreed",
    "message",
    "city",
  ];

  const errorMsg = "Polje je obavezno.";
  const errorMsgCheck = "Polje je obavezno čekirati.";
  const [errors, setErrors] = useState([]);
  const formChangeHandler = ({ target }) => {
    setErrors(errors.filter((item) => item != target.name));
    if (
      (target.type === "checkbox" && target.checked) ||
      (target.type === "radio" && target.checked) ||
      (target.type === "text" && target.value.length > 0) ||
      (target.type === "textarea" && target.value.length > 0)
    ) {
      setFormData({ ...formData, [target.name]: target.value });
    } else {
      if (target.type === "text" || target.type === "checkbox") {
        setFormData({ ...formData, [target.name]: target.value });
      }
      if (target.type === "textarea") {
        setFormData({ ...formData, [target.name]: target.value });
        return;
      }
      setErrors([...errors, target.name]);
    }
  };

  const formSubmitHandler = () => {
    setRefreshReCaptcha(true);

    const err = [];
    for (const key in formData) {
      const item = formData[key];
      if (key !== "note") {
        if (
          item === "" ||
          item == null ||
          (required.includes(key) && (item === "" || item == null))
        ) {
          err.push(key);
        }
      }
    }

    if (err.length > 0) {
      setErrors(err);
    } else {
      setIsLoading(true);
      const api = ApiHandler();
      const { agreed, ...feldsForRet } = formData;
      const ret = {
        page_section: "contact_page",
        ...feldsForRet,
      };

      if (!id && !name) {
        api
          .post("/contact/contact_page", ret)
          .then((response) => {
            openAlertBox("Uspešno ste poslali poruku!", "success");
            setShowMessage(true);
            setFormData({
              customer_name: "",
              email: "",
              phone: "",
              message: "",
              city: "",
              gcaptcha: token,
              agreed: null,
            });
            setTimeout(() => setShowMessage(false), 5000);
            setIsLoading(false);
          })
          .catch((error) => {
            openAlertBox(error.message, "error");
            setIsLoading(false);
          })
          .finally(() => {
            setRefreshReCaptcha(false);
          });
      } else {
        api
          .post("contact/product_request", {
            ...ret,
            id_product: +id,
            product_name: name,
          })
          .then((response) => {
            openAlertBox(
              "Uspešno ste poslali zahtev za proveru proizvoda na stanju.",
              "success"
            );
            setShowMessage(true);
            setFormData({
              customer_name: "",
              email: "",
              phone: "",
              message: "",
              city: "",
              gcaptcha: token,
              agreed: null,
            });
            setTimeout(() => setShowMessage(false), 5000);
            setIsLoading(false);
          })
          .catch((error) => {
            openAlertBox(error.message, "error");
            setIsLoading(false);
          })
          .finally(() => {
            setRefreshReCaptcha(false);
          });
      }
    }
  };

  useEffect(() => {
    setFormData({ ...formData, gcaptcha: token });
  }, [token]);

  return (
    <>
      <Seo
        title="Kontakt"
        description="Kontakt"
        ogtitle="Kontakt"
        ogdescription="Kontakt"
        ogurl={`${process.env.BASE_URL}kontakt`}
      />
      <GoogleReCaptchaProvider reCaptchaKey={process.env.CAPTCHAKEY}>
        <GoogleReCaptcha
          onVerify={verifyCaptcha}
          refreshReCaptcha={refreshReCaptcha}
        />

        <div className={classes["map-container-container"]}>
          <div className={classes["map-container"]}>
            <Image
              src="/images/contact_pic.webp"
              alt="Mapa"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
        <div className={classes["content-container"]}>
          <div className={`${classes.contact} row`}>
            <div className={`${classes["contact-info"]} col-md-4`}>
              <h4 className={classes["contact-info-heading"]}>Kontakt</h4>
              <div className={classes["call-center"]}>
                <h5
                  className={`${classes["call-center-heading"]} ${classes.line}`}
                >
                  Call centar
                </h5>
                <span className={classes["bolded-faces"]}>Fizička lica</span>
                <span className={classes["phone-numbers"]}>
                  +381 65 377 330 0
                </span>
                <span className={classes["bolded-faces"]}>Pravna lica</span>
                <span className={classes["phone-numbers"]}>
                  +381 32 515 52 99
                </span>
                <span className={classes["bolded-faces"]}>
                  ili e-mailom na:
                </span>
                <span className={classes["phone-numbers"]}>
                  <Link href="mailto:web@stojic.rs" legacyBehavior>
                    <span>web@stojic.rs</span>
                  </Link>
                </span>
              </div>
              <div className={classes["working-hours"]}>
                <Link href="/" legacyBehavior>
                  <Image
                    src="/images/logo-color.webp"
                    alt="Stojic-elektrik-logo"
                    priority
                    width={200}
                    height={64}
                    className={classes["img-logo"]}
                  />
                </Link>
                <h5
                  className={`${classes["working-hours-heading"]} ${classes.line}`}
                >
                  Radno vreme prodajnog centra
                </h5>
                <span className={classes["working-hours-day"]}>
                  <span className={classes["working-hours-hour"]}>
                    od 08h do 20h
                  </span>
                </span>
              </div>
            </div>
            {/* ******* */}

            {showMessage ? (
              <div
                className={`${classes["contact-form"]} ${classes.successMessage} col-md-8`}
              >
                {/* <BsCheck className={classes.iconSuccess} /> */}
                Uspešno ste poslali poruku! Uskoro ćemo Vas kontaktirati.
              </div>
            ) : (
              <form className={`${classes["contact-form"]} col-md-8`}>
                <div className={classes.inputError}>
                  <input
                    type="text"
                    placeholder="Ime i prezime *"
                    className={classes["contact-form-input"]}
                    name="customer_name"
                    value={formData.customer_name}
                    onChange={formChangeHandler}
                  />
                  {errors.includes("customer_name") && (
                    <span className={classes.errorMsg}>{errorMsg}</span>
                  )}
                </div>

                <div className={classes.inputError}>
                  <input
                    type="text"
                    placeholder="Email *"
                    name="email"
                    className={classes["contact-form-input"]}
                    value={formData.email}
                    onChange={formChangeHandler}
                  />
                  {errors.includes("email") && (
                    <span className={classes.errorMsg}>{errorMsg}</span>
                  )}
                </div>

                <div className={classes.inputError}>
                  <input
                    type="text"
                    placeholder="Telefon *"
                    name="phone"
                    className={classes["contact-form-input"]}
                    value={formData.phone}
                    onChange={formChangeHandler}
                  />
                  {errors.includes("phone") && (
                    <span className={classes.errorMsg}>{errorMsg}</span>
                  )}
                </div>

                <div className={classes.inputError}>
                  <input
                    type="text"
                    placeholder="Grad *"
                    name="city"
                    className={classes["contact-form-input"]}
                    value={formData.city}
                    onChange={formChangeHandler}
                  />
                  {errors.includes("city") && (
                    <span className={classes.errorMsg}>{errorMsg}</span>
                  )}
                </div>

                <div className={classes.inputError}>
                  <textarea
                    placeholder="Poruka *"
                    className={classes["contact-form-textarea"]}
                    rows="7"
                    name="message"
                    value={formData.message}
                    onChange={formChangeHandler}
                  />
                  {errors.includes("message") && (
                    <span className={classes.errorMsg}>{errorMsg}</span>
                  )}
                </div>

                <div
                  className={`${classes["checkbox-container"]} basic-checkbox-container`}
                >
                  <div className="d-flex">
                    <input
                      id="acceptance"
                      type="checkbox"
                      className={classes.checkbox}
                      name="agreed"
                      onChange={formChangeHandler}
                      value={formData.agreed === "1" ? "" : "1"}
                    />
                    <label
                      className={classes["checkbox-label"]}
                      htmlFor="acceptance"
                    >
                      Upoznat sam i slažem se sa sadržajem disklejmera.
                      <br />
                      Sadržaj disklejmera možete pogledati na{" "}
                      <Link href="/politika-privatnosti" target="_blank">
                        Pročitaj uslove
                      </Link>
                    </label>
                  </div>

                  {errors.includes("agreed") && (
                    <span className={classes.errorMsg}>{errorMsgCheck}</span>
                  )}
                </div>

                {isLoading ? (
                  <button type="button" className={classes["contact-submit"]}>
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
                    className={classes["contact-submit"]}
                    onClick={formSubmitHandler}
                  >
                    Pošalji
                  </button>
                )}

                {errors.length > 0 && (
                  <p className={classes.errorMsg}>
                    Nisu popunjena sva obavezna polja.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
        <Stores />
      </GoogleReCaptchaProvider>
    </>
  );
};

export default ContactPage;

export async function getStaticProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
