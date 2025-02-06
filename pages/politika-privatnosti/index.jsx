import React from "react";
import dynamic from "next/dynamic";

const Seo = dynamic(() => import("../../components/Seo/Seo"));

const PrivacyPolicy = () => (
  <>
    <Seo
      title="Politika privatnosti"
      description="Politika privatnosti"
      ogtitle="Politika privatnosti"
      ogdescription="Politika privatnosti"
      ogurl={`${process.env.BASE_URL}politika-privatnosti`}
    />
    <div className="staticPages">
      <div className="container">
        <h3>OBAVEŠTENJE O ZAŠTITI PRIVATNOSTI</h3>
        <div className="staticPagesContent">
          <p>
            S.Z.T.K.R “STOJIĆ” PR Dragan Stojić, obavezuje se da će sve podatke
            kupaca prikupljene tokom procesa naručivanja i isporuke koristiti
            iskjučivo za sopstvene potrebe, a u cilju pružanja što kvalitetnije
            usluge i realizacije povremenih promotivnih kampanja. Dajemo kupcima
            mogućnost izbora uključujući mogućnost odluke da li žele ili ne da
            se izbrišu sa mailing lista koje se koriste za marketinške kampanje.
            S.Z.T.K.R Stojić ni pod kojim uslovima neće prodavati ili ustupati
            lične podatke svojih posetilaca/kupaca trećoj strani, a svi
            prikupljeni podaci su strogo poverljivi i dostupni su isključivo
            personalu firme S.Z.T.K.R Stojić. Podaci o ličnosti prikupljeni u
            smislu Zakona o zaštiti podataka o ličnosti i ovog obaveštenja za
            nas predstavljaju poslovnu tajnu i uživaju zaštitu u smislu svih
            važećih propisa.
          </p>
          <p>
            Ukoliko koristite www.stojic.rs, odgovorni ste za održavanje i
            poverljivost svog naloga i lozinki koje ste dobili u slučaju
            zaboravljene inicijalno kreirane lozinke na sajtu. Korišćenjem
            www.stojic.rs sajta odgovorni ste za sve aktivnosti koje se dešavaju
            na Vašem nalogu i sa Vašom lozinkom. Maloletnici mogu koristiti
            www.stojic.rs uz nadzor roditelja ili staratelja. www.stojic.rs
            zadržava pravo da odbije pružanje usluga, ukine nalog ili otkaže
            narudžbenicu ukoliko ustanovi da su prekršeni uslovi korišćenja.
          </p>
        </div>
        <h5>Politika upotrebe kolačića</h5>
        <div className="staticPagesContent">
          <p>
            Zaštita podataka o ličnosti u republici Srbiji je uređena pozitivno
            pravnim propisima sadržanim u Zakonu o zaštiti podataka o ličnosti
            ‚(“ Službeni glasnik RS”br. 87/2018) u daljem tekstu Zakon. U ovoj
            politici upotrebe kolačića opisuju se različite vrste kolačića koje
            se upotrebljavaju na internet stranici www.stojic.rs, koja je u
            svojini i pod kontrolom S.Z.T.K.R. Stojić Čačak, sa sedištem u Čačku
            u ulici Svetozara Babovića 13, PIB 101109365 i matični broj
            54906382, šifra delatnosti 4790.
          </p>
          <p>
            Želeći da svim korisnicima koji posećuju naš sajt omogućimo
            neometano I personlizovano kretanje kroz stranice na sajtu,
            www.stojic.rs ,koristi kolačiće (eng. Cookies), malu količinu
            informacija koju sajt šalje Vašem računaru. U skladu sa Zakonom kao
            i Opštom uredbom o zaštiti podataka o ličnosti Evropske unije – GDPR
            (eng. Generaln Data Protection Regulation)Stojić Elektrik d.o.o je
            dužan da dobije Vašu saglasnost za upotrebu kolačića, te Vas u ovom
            dokumentu obaveštavamo o značaju kolačića za Vaše korisničko
            iskustvo.
          </p>
        </div>
        <h5>Šta su kolačići?</h5>
        <div className="staticPagesContent">
          <p>
            Internet kolačić je mala datoteka koja se sastoji od slova i brojeva
            , koja će biti sačuvana na računaru, mobilnom uređaju ili drugoj
            opremi korisnika, a pomoću koje se može pristupiti internetu.
          </p>
          <p>
            Kolačići se instaliraju putem zahteva koji web server izdaje čitaču
            ( kao što je Internet Explorer, Firefox, Chrome itd ). Kada su
            instalirani, kolačići imaju ograničen životni vek i ostaju
            “pasivni”, što znači da ne sadrže softvere, viruse ili špijunske
            softvere i da neće imati pristupa informacijama sa korisnikovog
            čvrstog diska na čiju su opremu instalirani. Kolačići predstavljaju
            neznatne količine informacija koje se beleže prilikom posete nekom
            web-sajtu. Ove informacije računar koji koristite prepoznaje i šalje
            ih prilikom Vaše ponovne posete na web stranicu, server može
            pročitati vrednosti koje su zabeležene u kolačićima i na taj način
            Vam prikazati informacije na datom web-sajtu koje su prilagođene
            Vašim potrebama.
          </p>
        </div>
        <h5>Kako i zašto koristimo kolačiće?</h5>
        <div className="staticPagesContent">
          <p>
            S.Z.T.K.R. Stojić upotrebljava kolačiće da unapredi korišćenje i
            funkcionalnost svoje internet stranice i da što bolje shvati način
            na koji je posetioci koriste, kao i da unapredi prodaju i usluge
            koje pruža.
          </p>
          <p>
            Čuvanje kolačića na Vašem računaru predstavlja lak i praktičan način
            da prilagodimo Vaše iskustvo na našoj internet stranici Vašim
            potrebama, odnosno da ga poboljšamo, da bi Vaša naredna poseta bila
            što prijatnija.
          </p>
          <p>
            S.Z.T.K.R. Stojić Čačak ne koristi kolačiće u cilju prikupljanja
            podataka o ličnosti, kao što je Vaše ime. Ali u mogućnosti smo da
            napravimo vezu između podataka koje sadrže kolačići i Vaših podataka
            o ličnosti prikupljenih drugim putem (npr. Preko obrazca za
            registraciju ili popunjavanjem narudžbenice)
          </p>
        </div>
        <h5>Kako se upravlja kolačićima?</h5>
        <div className="staticPagesContent">
          <p>
            Imate opciju da prihvatite kolačiće, koja će Vam omogućiti da
            prilikom posete koristite sve funkcije naše internet stanice bez
            ograničenja. Ako odbijete upotrebu striktno neophodnih kolačića, to
            može uticati na Vaše korisničko iskustvo i funkcionalnost tokom
            korišćenja internet stranice. Ako odbijete sve kolačće, biće
            isključeni i kolačići primarnog kanala i kolačići trećih lica. Pored
            toga kolačići primarnog kanala biće izbrisani. Ali u tom slučaju
            nećemo biti u mogućnosti da izbrišemo kolačiće trećih lica, već ćete
            to Vi morati da izbrišete ručno, a to možete učiniti preko
            podešavanja Vašeg čitača.
          </p>
        </div>
        <h5>
          Isključivanje i/ili brisanje kolačića preko vašeg internet čitača
        </h5>
        <div className="staticPagesContent">
          <p>
            Kao alternativa i/ili dodatno, možete promeniti podešavanje za
            kolačiće sa vašeg internet čitača, Vaš internet čitač će vam
            omogućiti da promenite svoja podešavanja za kolačiće. Ta podešavanja
            na čitaču obično se nalaze na kartici “opcije” ili “parametri” vašeg
            internet čitača. Pored toga, možete konsultovati I meni “Pomoć” na
            vašem čitaču. Različiti čitači koriste različite mehanizme za
            isključivanje kolačića.
          </p>
          <p>
            Kada je reč o podešavanjima čitača za brisanje prethodno sačuvanih
            kolačića, primenjuje se isti princip kao I za deaktivaciju novih
            kolačića u podešavanjima čitača. Molimo vas da pratite odgovarajuća
            uputstva vašeg čitača, koja su opisana ispod.
          </p>
          <p>
            Na mreži postoje alatke za brisanje svih kolačića sačuvanih nakon
            poseta različitim internet stranicama, kao što je
            <a href="https://www.allaboutcookies.org">
              https://www.allaboutcookies.org
            </a>
            .(https//www.allaboutcookies.org).
          </p>
          <p>
            Prilikom posete ovoj internet stranici sa drugih računara, morate
            ponovo izvršiti izmene podešavanja.
          </p>
        </div>
        <h5 className="headingCookie">Koje vrste kolačića koristmo?</h5>
        <h5>Striktno neophodni kolačići</h5>
        <div className="staticPagesContent">
          <p>
            Ovi kolačići Vam garantuju funkcije bez kojih nećete moći da
            koristite našu internet stranicu i obezbeđuju, između ostalog da vam
            bude prikazana verzija stranice sa širokopojasnom vezom čija
            količina podataka odgovara količini podataka koju omogućava vaša
            veza sa internetom koju koristite prilikom pristupa nekoj od
            funkcionalnosti internet stranice. Pored toga, ako promenite stranu,
            takav kolačić vrši prebacivanje sa protokola http na https. Osim
            toga, ova vrsta kolačića čuva vašu odluku u vezi sa upotrebom
            kolačića na našoj internet stranici.
          </p>

          <ul>
            <li>Striktno neophodni kolačići koje koristimo su:</li>
            <ul>
              <li>
                kolačići koji se koriste isključivo u svrhu prenosa komunikacija
                preko interneta
              </li>
              <li>
                striktno neophodni kolačići da bismo Vam pružili usluge koje ste
                izričito tražili (ako ih isključite, nećemo biti u stanju da Vam
                pružimo tačno onu uslugu koju ste zahtevali)
              </li>
            </ul>
          </ul>
          <p>
            Upotreba striktno neophodnih kolačića u gore navedene svrhe
            zasnovana je na Vašem legitimnom interesu da obezbedite rad, pristup
            i propisno korišćenje tehničkih mogućnosti naše internet stranice,
            kao i da Vam budu pružene usluge koje ste izričito zahtevali.{" "}
          </p>
        </div>
        <h5>Kolačići za potrebe statistike</h5>
        <div className="staticPagesContent">
          <p>
            Ovi kolačići se upotrebljavaju kako bi nam obezbedili statističke
            podatke o radu naše internet stranice (kao što su broj poseta ili
            izvor saobraćaja).
          </p>
        </div>
        <h5>Kolačići za potrebe marketinga</h5>
        <div className="staticPagesContent">
          <p>
            Ovi kolačići omogućavaju internet stranici da sačuva izbore koje ste
            napravili i da vam ponudi unapređenje i prilagođene funkcije. Ova
            kategorija može obuhvatiti i kolačiće trećih lica.
          </p>
        </div>
        <h5>Pristanak na upotrebu kolačića</h5>
        <div className="staticPagesContent">
          <p>
            S.Z.T.K.R. Stojić iz Čačka, planira da koristi određene vrste
            kolačića iz različitih razloga, za šta nam je potrebna Vaša
            saglasnost. Kliknite na “PRIHVATAM” da prihvatite ili “PODEŠAVANJA”
            za više informacija o vrstama kolačića koje upotrebljavamo i da
            ograničite određenu vrstu kolačića.
          </p>
          <p>
            Moći ćete i sami da izaberete određene vrste kolačića koji se
            upotrebljavaju na našoj internet stranici.
          </p>
          <p>
            Obaveštenje o kolačićima ostaće prikazano sve dok ne podesite svoje
            parametre. Nećemo koristiti druge vrste kolačića osim striktno
            neophodne za ispravan rad internet stranice, u slučaju da nam
            naznačite da ne želite da koristimo te druge vrste kolačića.
          </p>
        </div>
        <h5>Izmene ovog obaveštenja</h5>
        <div className="staticPagesContent">
          <p>
            O svim izmenama ove Politike upotrebe kolačića, bićete blagovremeno
            obavešteni pre njihovog stupanja na snagu.
          </p>
        </div>
      </div>
    </div>
  </>
);

export default PrivacyPolicy;

export async function getStaticProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
