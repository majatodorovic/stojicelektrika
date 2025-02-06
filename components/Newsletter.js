/* eslint-disable no-use-before-define */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { useRef, useState } from "react";
import axios from "axios";
import classes from "./Footer.module.scss";
import { openAlertBox } from "../helpers/tostify";
import { isValidEmail, validEmailLength } from "../helpers/validate";

function Newsletter() {
  const [isNewsletterBoxOpen, setIsNewsletterBoxOpen] = useState(true);
  const emailRef = useRef();

  const subscribeToNewsletter = async (e) => {
    e.preventDefault();

    if (validateSubscribeForm()) {
      const result = await axios.post(
        "https://api.stojic.rs/api/v1/b2c/newsletter/",
        { id: null, email: emailRef.current.value },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      emailRef.current.value = "";
      openAlertBox("Uspešno ste se prijavili na naš newsletter.", "success");
      setIsNewsletterBoxOpen(false);
      setTimeout(() => {
        setIsNewsletterBoxOpen(true);
      }, 2200);
    }
  };

  const validateSubscribeForm = () => {
    const myEmail = emailRef.current;
    if (!isValidEmail(myEmail.value)) {
      openAlertBox("Popunite obavezno polje.", "error");
      return false;
    }
    if (!validEmailLength(myEmail.value)) {
      openAlertBox("Minimalan broj karaktera je 10.", "error");
      return false;
    }
    return true;
  };

  return (
    <div className={`${classes["newsletter-container"]}`}>
      <h5 className={`${classes["newsletter-heading"]}`}>Ostanite povezani</h5>
      <p>
        Prijavite se na naš Newsletter i ostanite u toku sa najnovijim
        proizvodima, trendovima i specijalnim ponudama.
      </p>
      <p>Prijavom na naš Newsletter prihvatate Politiku privatnosti</p>
      <div className={classes.newsletter}>
        {isNewsletterBoxOpen ? (
          <form onSubmit={(e) => subscribeToNewsletter(e)}>
            <input
              className={`${`${classes["newsletter-input"]} basic-input`}`}
              type="text"
              placeholder="Unesite e-mail adresu.*"
              ref={emailRef}
            />
            <button
              type="submit"
              className={`${`${classes["newsletter-button"]} basic-button`}`}
            >
              Prijavi se
            </button>
          </form>
        ) : null}
      </div>

      {/* <div className={`${classes['newsletter-button-container']}`}>

      </div> */}
      <div className={`${classes["newsletter-follow"]}`}>
        {/* <h5 className={`${classes['follow-us']}`}>
          Pratite nas na društvenim mrežama:
        </h5> */}
        <div className={`${`flex-row ${classes["flex-row"]}`}`}>
          <a
            className={`${`${classes["newsletter-social-link"]}`}`}
            href="https://facebook.com"
          >
            <FontAwesomeIcon
              icon={faFacebookF}
              className={classes["newsletter-social-link-icon"]}
            />
          </a>
          <a
            className={`${classes["newsletter-social-link"]}`}
            href="https://instagram.com"
          >
            <FontAwesomeIcon
              icon={faInstagram}
              className={classes["newsletter-social-link-icon"]}
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Newsletter;
