import React from "react";
import dynamic from "next/dynamic";

const PagePreparation = dynamic(() =>
  import("../../components/PagePreparation/PagePreparation")
);
const Seo = dynamic(() => import("../../components/Seo/Seo"));

const Questions = () => (
  <>
    <Seo
      title="Najčešća pitanja"
      description="Najčešća pitanja"
      ogtitle="Najčešća pitanja"
      ogdescription="Najčešća pitanja"
      // ogurl={`${process.env.BASE_URL}najcesca-pitanja`}
    />
    <div className="staticPages">
      <div className="container">
        <h3>Česta pitanja</h3>
        <div className="staticPagesContent">
          <PagePreparation />
          {/* <Accordion >
            <Accordion.Item
              eventKey="0"
              
            >
              <Accordion.Header >
                <div >
                  <div ></div>
                  <p>Da li je moguća kupovina na rate u prodavnici I online?</p>
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  Moguća je. Nudimo najbolje uslove kupovine i plaćanja. Online
                  kupovinu na rate možete obaviti putem Web kredita na 24 rate.
                  U prodavnici putem čekova i kartica do 6 i 12 rata ili putem
                  kredita banaka do 36 mesečnih rata. Više o načinima plaćanja
                  možete pročitati na linku način placanja.
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                <div>
                  <div ></div>
                  <p>Kako da poručim uređaj online?</p>
                </div>
              </Accordion.Header>
              <Accordion.Body>
                Jednostavno i lako. Možete poručiti klikom na proizvod koji
                želite da naručite. Otvoriće vam se strana gde je sve detaljno
                prikazano: karakteristike, specifikacije, cena, fotografije.
                Kliknite na zeleni taster “Dodaj u korpu”. Sadržaj korpe će se
                prikazati na ekranu i kliknite na taster “Završi kupovinu”.
                Nakon toga, unesite svoje podatke i izaberite način plaćanja. Da
                li želite da platite (kao “fizičko lice” ili “kupujem kao
                firma”)? Na kraju kliknite na “Poruči proizvod”. Ukoliko vam je
                potrebna pomoć prilikom poručivanja obezbedili smo • Call centar
                na 011 44 44 999 • agenta na chatu. Kliknite na chat polje na
                sajtu u donjem desnom uglu • pišite nam na Facebook i Instagram
                stranici Važne informacije vezane za ovu temu možete pronaći na
                linku o uslovima korišćenja.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header >
                <div >
                  <div></div>
                  <p>
                    Kupio sam online aparat, ali nisam dobila garanciju, šta da
                    radim?
                  </p>
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  Kod online kupovine garancija je web račun koji vam stiže na
                  mail. Ukoliko u pakovanju dobijete garantni list potrebno je
                  da ga overite u nekoj od naših prodavnica.
                </p>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion> */}
        </div>
      </div>
    </div>
  </>
);

export default Questions;

export async function getStaticProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
