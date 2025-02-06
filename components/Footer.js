import Link from "next/link";
import Accordion from "react-bootstrap/Accordion";
import classes from "./Footer.module.scss";
import Newsletter from "./Newsletter";

const Footer = () => (
  <footer>
    <div className={`${classes["footer-holder"]}`}>
      <div className="container">
        <div className={`${classes["footer-middle"]} row`}>
          <div className={`${classes["display-desktop"]}`}>
            <div className="row">
              <div
                className={`${classes["footer-middle-col"]} ${classes.mobNone} col-3`}
              >
                <h5 className={`${classes["footer-middle-headings"]}`}>
                  Podrška
                </h5>
                <ul className={`${classes["footer-list"]}`}>
                  <li>
                    <Link href="/nacin-placanja-i-isporuka" legacyBehavior>
                      <a className={`${classes["basic-link-white"]}`}>
                        Način plaćanja i isporuka
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/kako-naruciti" legacyBehavior>
                      <a className={`${classes["basic-link-white"]}`}>
                        Kako naručiti
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/najcesca-pitanja" legacyBehavior>
                      <a className={`${classes["basic-link-white"]}`}>
                        Najčešća pitanja
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/korisnicka-podrska" legacyBehavior>
                      <a className={`${classes["basic-link-white"]}`}>
                        Korisnička podrška
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/zamena-artikala" legacyBehavior>
                      <a className={`${classes["basic-link-white"]}`}>
                        Zamena artikala
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className={`${classes.mobNone} col-3`}>
                <div className="row">
                  <div className={`${classes["footer-middle-col"]} col-12`}>
                    <h5 className={`${classes["footer-middle-headings"]}`}>
                      Uslovi korišćenja
                    </h5>
                    <ul className={`${classes["footer-list"]}`}>
                      {/* <li>
                          <Link href="/uslovi-koriscenja">
                            <a className={`${classes['basic-link-white']}`}>
                              Uslovi korišćenja
                            </a>
                          </Link>
                        </li> */}
                      <li>
                        <Link href="/politika-privatnosti" legacyBehavior>
                          <a className={`${classes["basic-link-white"]}`}>
                            Politika privatnosti
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/prava-potrosaca" legacyBehavior>
                          <a className={`${classes["basic-link-white"]}`}>
                            Prava potrošača
                          </a>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div
                    className={`${classes["footer-middle-col"]}  ${classes.marginTop} col-12 `}
                  >
                    <h5 className={`${classes["footer-middle-headings"]}`}>
                      Kontakt centar
                    </h5>
                    <ul className={`${classes["footer-list"]}`}>
                      <li>
                        <Link href="tel:00381653773300" legacyBehavior>
                          <a className={`${classes["basic-link-white"]}`}>
                            +381 65 377 330 0
                          </a>
                        </Link>
                      </li>
                      <li>Ponedeljak - petak : 8 - 20h</li>
                      <li>Subota i nedelja : 8 - 17h</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div
                className={`${classes["footer-middle-col"]} ${classes.mobNone} col-3`}
              >
                <h5 className={`${classes["footer-middle-headings"]}`}>
                  Stojić Elektrik
                </h5>
                <ul className={`${classes["footer-list"]}`}>
                  <li>
                    <Link href="/o-nama" legacyBehavior>
                      <a className={`${classes["basic-link-white"]}`}>O nama</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/postani-partner" legacyBehavior>
                      <a className={`${classes["basic-link-white"]}`}>
                        Postani partner
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/kontakt" legacyBehavior>
                      <a className={`${classes["basic-link-white"]}`}>
                        Kontakt
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" legacyBehavior>
                      <a className={`${classes["basic-link-white"]}`}>Blog</a>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className={`${`${classes["newsletter-col"]} col-3`}`}>
                <Newsletter />
              </div>
            </div>
          </div>
          <div className={`${classes["display-mobile"]}`}>
            <div className="col-12">
              <Accordion className={`${classes["acc-holder"]}`}>
                <Accordion.Item
                  eventKey="0"
                  className={`${classes["acc-item-holder"]}`}
                >
                  <Accordion.Header className={`${classes["acc-headings"]}`}>
                    <div className={`${classes["acc-headings-holder"]}`}>
                      <div className={`${classes["red-line"]}`} />
                      <p>Podrška</p>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <ul className={`${classes["footer-list"]}`}>
                      <li>
                        <Link
                          href="/nacin-placanja-i-isporuka"
                          className={`${classes["acc-items"]}`}
                        >
                          Način plaćanja i isporuka
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/kako-naruciti"
                          className={`${classes["acc-items"]}`}
                        >
                          Kako naručiti
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/najcesca-pitanja"
                          className={`${classes["acc-items"]}`}
                        >
                          Najčešća pitanja
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/korisnicka-podrska"
                          className={`${classes["acc-items"]}`}
                        >
                          Korisnička podrška
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/zamena-artikala"
                          className={`${classes["acc-items"]}`}
                        >
                          Zamena artikala
                        </Link>
                      </li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header className={`${classes["acc-headings"]}`}>
                    <div className={`${classes["acc-headings-holder"]}`}>
                      <div className={`${classes["red-line"]}`} />
                      <p>Uslovi korišćenja</p>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <ul className={`${classes["footer-list"]}`}>
                      <li>
                        <Link
                          href="/uslovi-koriscenja"
                          className={`${classes["acc-items"]}`}
                        >
                          Uslovi korišćenja
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/politika-privatnosti"
                          className={`${classes["acc-items"]}`}
                        >
                          Politika privatnosti
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/prava-potrosaca"
                          className={`${classes["acc-items"]}`}
                        >
                          Prava potrošača
                        </Link>
                      </li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header className={`${classes["acc-headings"]}`}>
                    <div className={`${classes["acc-headings-holder"]}`}>
                      <div className={`${classes["red-line"]}`} />
                      <p>Stojić Elektrik</p>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <ul className={`${classes["footer-list"]}`}>
                      <li>
                        <Link
                          href="/o-nama"
                          className={`${classes["acc-items"]}`}
                        >
                          O nama
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/postani-partner"
                          className={`${classes["acc-items"]}`}
                        >
                          Postani partner
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/kontakt"
                          className={`${classes["acc-items"]}`}
                        >
                          Kontakt
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/blog"
                          className={`${classes["acc-items"]}`}
                        >
                          Blog
                        </Link>
                      </li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                  <Accordion.Header className={`${classes["acc-headings"]}`}>
                    <div className={`${classes["acc-headings-holder"]}`}>
                      <div className={`${classes["red-line"]}`} />
                      <p>Kontakt centar</p>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <ul className={`${classes["footer-list"]}`}>
                      <li>
                        <Link
                          href="tel:00381653773300"
                          className={`${classes["acc-items"]}`}
                        >
                          +381 65 377 330 0
                        </Link>
                      </li>
                      <li>Ponedeljak - petak: 8 - 20h</li>
                      <li>Subota - nedelja:8 - 17h</li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className={`${classes["footer-copyright"]} `}>
      <div className={`${classes["footer-copyright-items"]} container`}>
        <p>
          Stojić Elektrik | Sva prava zadržana.
          <span>
            {" "}
            Powered by{" "}
            <a
              className={classes["croonus-link"]}
              rel="noreferrer"
              href="https://www.croonus.com/"
              target="_blank"
            >
              Croonus Technologies
            </a>
            .
          </span>
        </p>
        <ul className="d-flex">
          <li>
            <Link
              href="/opsti-uslovi-prodaje"
              className={`${classes["acc-items"]}`}
            >
              Opšti uslovi prodaje
            </Link>
          </li>
          <li>
            <Link
              href="/politika-privatnosti"
              className={`${classes["acc-items"]}`}
            >
              Politika privatnosti
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </footer>
);

export default Footer;
