import React from "react";
import dynamic from "next/dynamic";

const Seo = dynamic(() => import("../../components/Seo/Seo"));

const ExchangeOfItems = () => (
  <>
    <Seo
      title="Zamena artikala"
      description="Zamena artikala"
      ogtitle="Zamena artikala"
      ogdescription="Zamena artikala"
      ogurl={`${process.env.BASE_URL}zamena-artikala`}
    />
    <div className="staticPages">
      <div className="container">
        <h3>Uputstvo za reklamaciju robe (Internet kupovina)</h3>
        <h5>Informacije za kupca – reklamacije, saobraznost i garancij</h5>
        <div className="staticPagesContent">
          <p>
            Reklamacija podrazumeva zahtev kupca radi ostvarivanja njegovih
            prava.
          </p>
          <p>
            Saobraznost je zakonska kategorija i njeno trajanje je 2 godine.
            Saobraznost predstavlja odgovornost trgovca ili proizvođača da roba
            ili usluga budu u skladu sa uobičajenim radom ili posebnim zahtevima
            potrošača u određenom vremenskom periodu. Garancija predstavlja
            voljni korak trgovca ili proizvođača kojim on nudi posebne
            pogodnosti za kupca ali isključivo veće od zakonski predviđenih
          </p>
        </div>
        <h5>Postupak reklamacije</h5>
        <div className="staticPagesContent">
          <p>
            S obzirom da se roba kupljena na daljinu isporučuje kurirskom
            službom, kupac mora da obrati pažnju na stanje robe prilikom
            prijema. Ukoliko je pakovanje robe oštećeno, kupac ima pravo da
            odbije prijem. Ako kupac primi robu i posle raspakivanja utvrdi da
            je roba oštećena, ili ako prilikom puštanja u rad ustanovi da je
            uređaj neispravan, treba da nam se obrati, a lice zaduženo za
            rešavanje reklamacija će ga uputiti na način rešavanja problema.
          </p>
          <p>
            Prilikom izjavljivanja reklamacije kupac popunjava izjavu o
            reklamaciji koju može preuzeti sa našeg sajta ili zatražiti da mu se
            dostavili elektronskim putem (na mail adresu). Uz izjavu o
            reklamaciji kupac će dostaviti reklamirani proizvod na adresu STOJIĆ
            ELEKTRIK D.O.O, Bulevar oslobodilaca Čačka 105 V, 32000 Čačak.
          </p>
          <p>
            Nakon slanja proizvoda, dalji postupak nastavlja se u skladu sa
            članom 56. Zakona o zaštiti potrošač
          </p>
        </div>
        <h5>Način popunjavanja obrasca za reklamaciju</h5>
        <div className="staticPagesContent">
          <ul>
            <li>
              {" "}
              Izjava o reklamaciji na robu kupljenu preko ugovora na daljinu
              popunjava se na sledeći način:
            </li>
            <ul>
              <li>
                deo Kupac: kupac ovde unosi osnovne podatke o sebi – ime i
                prezime, adresu, kontakt telefon i e-mail adres
              </li>
              <li>
                deo Ugovor: odnosi se na robu kupljenu preko ugovora na daljinu
                u vezi koje kupac ima reklamaciju – Datum isporuke robe je datum
                kada je kupac primio robu, Datum podnošenja ovog obrasca je
                datum slanja robe našoj firmi, Broj računa odnosi se na broj na
                račun-otpremnice koji je pratio robu (kupac može da pošalje
                fotokopiju računa), Naziv robe je kratki naziv robe koju kupac
                vrać
              </li>
              <li>
                deo Razlog reklamacije: kupac zaokružuje samo jedan razlog
                reklamacije; ako je istekao period od 14 dana po primanju robe u
                kome je kupac imao pravo da se predomisli a naručena roba nije
                ispravna, kupac zaokružuje &rdquo;roba nesaobrazna u garantnom
                roku&rdquo;; ako postoji bilo koji drugi razlog, kupac
                zaokružuje &rdquo;drugi razlozi reklamacije&rdquo;
              </li>
              <li>
                deo Komentar kupca uz reklamaciju: kratak opis problema,
                neispravnosti, bilo kog razloga zbog koga kupac reklamira robu
              </li>
              <li>
                deo Zahtev kupca: kupac zaokružuje samo jedan način na koji želi
                da se reši reklamacija: popravka (podrazumeva slanje robe na
                servis), zamena (kupac traži istu robu kao zamenu za
                neispravnu), vraćanje novca (kupac traži vraćanje novca); u
                slučaju da se kupac odlučio da se reklamacija reši popravkom,
                potrebna je njegova izričita saglasnost za to, koju će kupac
                označiti stavljanjem slova &rdquo;X&rdquo; u krug pored rečenice
                &rdquo;Kupac daje saglasnost da se reklamacija reši
                popravkom&rdquo;
              </li>
              <li>
                deo Primedba prodavca: ovaj deo popunjava prodavac ili osoba
                zadužena za obradu reklamacija; s obzirom da se na robu ulaže
                reklamacija pri kojoj kupac i prodavac nemaju direktan kontakt,
                kupac je dužan da sačuva dokaz o slanju robe prodavcu; prodavac
                je dužan da robu pristiglu na reklamaciju zavede u knjigu
                reklamacija i da kupcu pošalje poštom potvrdu o prijemu na
                reklamaciju; dalji postupak ide isto kao postupak obrade
                reklamacija koji važi za robu kupljenju na uobičajen način
                (kupovina u prodavnici)
              </li>
            </ul>
          </ul>
        </div>
        <div className="download">
          <a
            href="/static/file/izjava_o_reklamaciji.pdf"
            download="izjava_o_reklamaciji.pdf"
          >
            Izjava o reklamaciji (pdf)
          </a>
          <a
            href="/static/file/ugovor_izjava_o_odustanku_od_ugovora.pdf"
            download="ugovor_izjava_o_odustanku_od_ugovora.pdf"
          >
            Ugovor - izjava o odustanku od ugovora (pdf)
          </a>
        </div>
      </div>
    </div>
  </>
);

export default ExchangeOfItems;

export async function getStaticProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
