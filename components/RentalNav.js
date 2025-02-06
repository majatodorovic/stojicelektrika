import React from "react";
import Link from "next/link";
import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "next/legacy/image";
import classes from "../assets/css/RentalNav.module.scss";
import { currencyFormat } from "../helpers/functions";
import { useGlobalAddToCart } from "../pages/api/globals";

const RentalNav = ({ rentalProducts }) => {
  const addToCart = useGlobalAddToCart();
  return (
    <div className={`${classes["rental-nav-holder"]}`}>
      <div className={`${classes["category1-holder"]}`}>
        <div className={`${`${classes["category-custom-holder"]} row`}`}>
          {(rentalProducts ?? []).map((item) => (
            <div
              key={item.id}
              className={`${classes["product-holder"]} + " col-xl-3"`}
            >
              <div className={classes.imageHolder}>
                <Image
                  src={item?.image[0] ?? "/products/missing.png"}
                  alt="Mobs Technology Iznajmljivanje Mesec dana"
                  className={`img-fluid ${classes.productImage}`}
                  width={280}
                  height={200}
                />
              </div>
              <h5>{item?.basic_data?.name}</h5>
              <p className={`${classes.code}`}>
                Šifra: {item?.basic_data?.sku}
              </p>
              <p className={`${classes.price}`}>
                <span>Mesečni zakup: </span>
                {currencyFormat(
                  item?.price?.price?.original,
                  item?.price?.currency
                )}
              </p>
              <p>{}</p>
              {/* <ul>
                <li>{item.rentalproductli1}</li>
                <li>{item.rentalproductli2}</li>
                <li>{item.rentalproductli3}</li>
                <li>{item.rentalproductli4}</li>
                <li>{item.rentalproductli5}</li>
              </ul> */}
              <Button
                className={`${classes["choose-service"]}`}
                onClick={() => {
                  addToCart(item?.id, 1);
                }}
              >
                Poručite paket
              </Button>
            </div>
          ))}
        </div>
        <div className={`${classes["configure-div"]}`}>
          <p>
            Ukoliko nijedan od navedenih paketa ne ispunjava Vaše zahteve,
            možete konfigurisati svoj paket.
          </p>
          <Button
            href="#form-configure"
            className={`${classes["go-to-configure"]}`}
          >
            Konfigurišite svoj paket
          </Button>
        </div>
        <div className={`${classes["text-holder"]}`}>
          <h5>
            Jedinstveno rešenje koje pruža najbolji spoj funkcionalnosti i
            rentabilnosti procesa obrade dokumenata bez skrivenih troškova.
          </h5>
          <ul>
            <li>
              Savremen profesionalni štampač ili multifunkcionalni uređaj po
              izuzetno pristupačnoj ceni u vidu mesečnog zakupa iz odabranog
              paketa
            </li>
            <li>
              Ponuda koja je u potpunosti prilagođena zahtevima Vašeg poslovanja
            </li>
            <li>
              Stručni tim koji će izvršiti analizu, implementirati rešenje i
              preuzeti kompletnu brigu o printing okruženju
            </li>
          </ul>
          <p>
            U okviru svake kompanije postoje troškovi štampe na koje se ne
            obraća dovoljno pažnje ili su, što je takođe čest slučaj, skriveni.
            Da li ste se ikada zapitali koliko može mesečno da košta štampanje
            dokumenata? Tačnije, koliko novca odlazi na tonere, servisiranje i
            druge troškove?
          </p>
          <p>
            Na prvi pogled, reklo bi se – ne mnogo. Međutim, istraživanja su
            pokazala da trošak štampe u proseku iznosi čak 3% vrednosti ukupnog
            prihoda kompanije na godišnjem nivou, što jasno pokazuje koliko
            veliki prostor tu postoji za uštedu i dodatnu efikasnost.
          </p>
          <p>
            O utrošenom vremenu u slučaju bilo kakvog zastoja u štampanju,
            odnosno otežanog ili nepraktičnog korišćenja uređaja kao i
            neadekvatne tehničke podrške da i ne govorimo.
          </p>
          <p>
            Sa visokom tehnologijom Brenda Canon Image Runner Advanced uvek je
            prilagođavamo korisniku bez obzira da li je potrebno firmi koju čini
            samo jedna osoba ili kompaniji sa više hiljada zaposlenih.
          </p>
          <h5 className={`${classes["rental-concept"]}`}>
            Iznajmljivanje - Koncept
          </h5>
          <p className={`${classes["rental-concept-subtitle"]}`}>
            {" "}
            Vi plaćate:
          </p>
          <p>Samo cenu po kopiji preko dogovorenog baznog paketa kopija.</p>
          <p className={`${classes.bold}`}>Mi vam besplatno obezbeđujemo:</p>
          <ul>
            <li>Rezervne delove</li>
            <li>Novi fotokopir aparat ili refabrikovani fotokopir</li>
            <li>Potrošni materijal (toner)</li>
            <li>Vrhunske i sertifikovane servisere</li>
            <li>Visok nivo usluge</li>
            <li>
              Brzu intervenciju na terenu , dopermu, instalaciju, obuku
              operatera
            </li>
          </ul>
          <p>
            Mi smo tu da prilagodimo Vaše potrebe prema Vašim mogućnostima. Sa
            nama je svaki dogovor moguć!
          </p>
          <p>
            Za detaljnije informacije i cene paketa{" "}
            <Link href="/kontakt" legacyBehavior>
              <a className={`${classes["call-service"]}`}>
                nazovite službu prodaje
              </a>
            </Link>{" "}
            MIŠA CANON.
          </p>
        </div>
        <div id="form-configure" className={`${classes["form-holder"]}`}>
          <Row className={`${classes["row-form"]}`}>
            <Col className={`${classes["col-form"]}`}>
              <Form.Label>Polje 1</Form.Label>
              <Form.Control
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </Col>
            <Col className={`${classes["col-form"]}`}>
              <Form.Label>Polje 2</Form.Label>
              <Form.Control
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
            </Col>
          </Row>
          <Row className={`${classes["row-form"]}`}>
            <Col className={`${classes["col-form"]}`}>
              <Form.Group controlId="formBasicPhoneNumber">
                <Form.Label>Polje 3</Form.Label>
                <Form.Control type="phoneNumber" />
              </Form.Group>
            </Col>
            <Col className={`${classes["col-form"]}`}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Polje 4</Form.Label>
                <Form.Control type="email" />
              </Form.Group>
            </Col>
          </Row>
          <Row className={`${classes["row-form"]}`}>
            <Col className={`${classes["col-form"]}`}>
              <Form.Group controlId="formBasicName">
                <Form.Label>Polje 5</Form.Label>
                <Form.Control type="name" />
              </Form.Group>
            </Col>
            <Col className={`${classes["col-form"]}`}>
              <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                <Form.Label>Polje 6</Form.Label>
                <Form.Control type="phone-number" />
              </Form.Group>
            </Col>
          </Row>
          <Button
            variant="primary"
            className={`${classes["input-button"]}`}
            type="submit"
          >
            Pošalji
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RentalNav;
