import React from "react";
import dynamic from "next/dynamic";

const Seo = dynamic(() => import("../../components/Seo/Seo"));

const ConsumerRights = () => (
  <>
    <Seo
      title="Prava potrošača"
      description="Prava potrošača"
      ogtitle="Prava potrošača"
      ogdescription="Prava potrošača"
      ogurl={`${process.env.BASE_URL}prava-potrosaca`}
    />
    <div className="staticPages">
      <div className="container">
        <h3>Prava potrošača</h3>
        <h5>Član 1.</h5>
        <div className="staticPagesContent">
          <p>
            Prodavac je obavezan da Kupcu preda robu tako da Kupac postane njen
            vlasnik, dok se kupac obavezuje da za to isplati kupoprodajnu cenu i
            preuzme robu.
          </p>
          <p>
            Ovaj ugovor je zaključen kao ugovor o prodaji na daljinu u smislu
            Zakona o zaštiti potrošača (“Sl.glasnik RS” br,62/2014 i br. 88/2021
            dalje Zakon) i Zakona o elektronskoj trgovini (“Sl. glasnik RS”
            br.41/2009,95/2013 i 52/2019) jer je zaključen posredstvom internet
            prodaje kao sredstva komunikacije.
          </p>
        </div>
        <h5>Član 2.</h5>
        <div className="staticPagesContent">
          <ul>
            <li>
              Kupac zaključenjem ovog Ugovora potvrđuje da ga je Prodavac pre
              njegovog zaključenja obavestio o:
            </li>
            <ul>
              <li>osnovnim obeležjima robe</li>
              <li>
                adresi i drugim podacima koji su od značaja za utvrđivanje
                identiteta Prodavca
              </li>
              <li>prodajnoj ceni</li>
              <li>
                kao i o svim dodatnim poštanskim troškovima i troškovima
                transporta i isporuke i mogućnosti da se ti troškovi mogu
                staviti potrošaču na teret
              </li>
              <li>
                načinu plaćanja, načinu i roku isporuke, načinu izvršenja drugih
                ugovornih obaveza
              </li>
              <li>
                postojanju zakonske odgovornosti za saobraznost robe ugovoru
              </li>
              <li>
                načinu izjavljivanja reklamacije Trgovcu, a naročito o mestu
                prijema i načinu postupanja trgovca po njima, kao i o uslovima
                koji se odnose na ostvarivanje prava potrošača po osnovu
                saobraznosti
              </li>
              <li>
                pravu potrošača na jednostrani raskid ugovora pod uslovima koji
                su propisani Zakonom
              </li>
              <li>
                obavezi potrošača da snosi troškove povraćaja robe u slučaju
                odustanka od ugovora
              </li>
              <li>
                dostupnosti rezervnih delova i tehničkog servisa, održavanju i
                opravci za vreme i posle prestanka perioda odgovornosti za
                saobraznost, odnosno posle prestanka proizvodnje i uvoza robe
              </li>
              <li>mogućnosti vansudskog rešavanja spora</li>
            </ul>
          </ul>
        </div>
        <h5>Član 3.</h5>
        <div className="staticPagesContent">
          <p>
            Kupac ima pravo na jednostrani raskid ovog ugovora , bez obzira na
            razloge, u roku od 14 dana od dana kada je roba dospela u državinu
            kupca ili lica koje je on ovlastio za prijem robe.
          </p>

          <ul>
            <li>
              Ugovarači saglasno konstatuju da je prodavac predao kupcu obrazac
              izjave o odustanku ugovora zaključenog na daljinu, koja čini
              sastavni deo ugovora i sadrži sledeće podatke:
            </li>
            <ul>
              <li>
                naziv, adresu i adresu elektronske pošte trgovca na koje Kupac
                dostavlja obrazac za jednostrani raskid ugovora
              </li>
              <li>način i rok za vraćanje isporučene robe i povraćaj novca</li>
              <li>
                obaveštenje o činjenici da se povraćaj robe od strane Kupca u
                roku u kome se može jednostrano raskinuti ugovor smatra
                blagovremenom izjavom o raskidu ugovora
              </li>
            </ul>
          </ul>
          <p>
            U slučaju jednostranog raskida, Kupac je dužan da vrati primljenu
            robu, bez drugih obaveza povodom raskida ugovora, izuzev samih
            troškova vraćanja. Kupac će robu vratiti u neoštećenoj orginalnoj
            ambalaži, sa svom pripadajućom dokumentacijom koja se nalazi u
            orginalnom pakovanju i u istom stanju u kakvom je i isporučena, bez
            ikakvih mehaničkih ili bilo kakvih drugih oštećenja.
          </p>
          <p>
            Prodavac je dužan da kupcu vrati primljeni iznos bez odlaganja , a
            najkasnije u roku od 30 dana od dana raskida ugovora.
          </p>
          <p>
            Danom raskida ugovora smatra se dan kada je izjava o raskidu
            saopštena Prodavcu.
          </p>
        </div>
        <h5>Član 4.</h5>
        <div className="staticPagesContent">
          <p>
            Izuzetno od odredaba člana 3. ovog ugovora kupac nema pravo na
            jednostrani raskid ugovora bez opravdanih razloga u slučajevima
            predviđenim članom 37. Zakona.
          </p>
        </div>
        <h5>Član 5.</h5>
        <div className="staticPagesContent">
          <p>
            Prodavac je dužan da Kupcu isporuči robu u što kraćem roku a
            najkasnije u roku od 3- 8 radnih dana od zaključenja ovog ugovora s
            tim da rok ne može biti duži od 30 dana.
          </p>
          <p>
            Isporuka će biti izvršena na adresi Kupca ili lica koje on ovlasti.
          </p>
          <p>
            Isporuka robe kupcu biće izvršena putem kurirske službe City Express
            d.o.o.
          </p>
          <p>
            Prodavac snosi troškove isporuke robe u Republici Srbiji za pakete u
            iznosu preko 10.000,00 (deset hiljada) dinara. U slučaju gde su
            paketi manjeg iznosa , troškove dostave snosi kupac.
          </p>
        </div>
        <h5>Član 6.</h5>
        <div className="staticPagesContent">
          <p>
            Kupac je dužan da prilikom prijema robe pregleda robu i proveri
            njenu saobraznost sa naručenom, te da istakne postojanje nedostataka
            koji se mogu uočiti pregledom.
          </p>
          <p>
            Za skrivene nedostatke koji su postojali u momentu prelaska rizika
            na Kupca, Prodavac odgovara u roku od dve godine od predaje stvari,
            s tim što se pretpostavlja da su nedostaci postojali u momentu
            prelaska rizika na Kupca, ako se pokažu u roku kraćem od šest meseci
            od dana prijema robe, čime se ne isključuje pravo Prodavca da
            dokazuje suprotno.
          </p>
          <p>
            Momenat prelska rizika sa prodavca na Kupca je momenat predaje robe
            Kupcu ili licu koje je Kupac ovlastio za prijem robe u njegovo ime.
          </p>
          <p>
            PU slučaju postojanja nedostataka za koje prodavac odgovara, na
            prava Kupca i postupak ostvarivanja prava primenjuju se odredbe
            Zakona.
          </p>
        </div>
        <h5>Član 7.</h5>
        <div className="staticPagesContent">
          <p>
            Kupac se obavezuje da za robu koja je predmet ovog ugovora isplati
            prodavcu iznos od _______ dinara,i primi fiskalni račun nakon
            isplate na e-mail adresu.
          </p>
        </div>
        <h5>Član 8.</h5>
        <div className="staticPagesContent">
          <p>
            Kupac je odgovoran za štetu koja nastane propuštanjem da preuzme
            robu koju mu je poslao Prodavac u skladu sa ovim ugovorom.
          </p>
          <p>
            Pod štetom se podrazumeva oštećenje na robi, kao i troškovi koje
            Prodavac ima zbog propuštanja Kupca da preuzme robu, kao što su
            troškovi čuvanja , prepakivanja vraćanje robe i slično.
          </p>
        </div>
        <h5>Član 9.</h5>
        <div className="staticPagesContent">
          <p>
            U slučaju spora ugovarači su saglasni da se pokuša njegovo rešavanje
            vansudskim sredstvima u skladu sa odredbama o potrošačkom sporu
            predviđenim Zakonom.
          </p>
        </div>
        <h5>Član 10.</h5>
        <div className="staticPagesContent">
          <p>
            Potpisivanjem ovog ugovora kupac potvrđuje da mu je prodavac predao
            obrazac za odustanak od ugovora i obaveštenje o pravima iobavezama
            potrošača koji proističu iz Zakona o zaštiti potrošača.
          </p>
        </div>
        <h5>Član 11.</h5>
        <div className="staticPagesContent">
          <p>
            Ugovor je zaključen posredstvom sredstava komunikacija , i to putem
            interneta u jednom orginalnom primerku, na osnovu koga su
            napravljene dve kopije, od kojih je jedna za Kupca, a druga za
            Prodavca.
          </p>
          <p>
            Na sve što nije regulisano ovim ugovorom primenjivaće se odredbe
            Zakona o zaštiti potrošača i Zakona o obligacionim odnosima.
          </p>
        </div>
        <div className="download">
          <a
            href="/static/file/prodaja_na_daljinu.pdf"
            download="prodaja_na_daljinu.pdf"
          >
            Prava potrošača (pdf)
          </a>
        </div>
      </div>
    </div>
  </>
);

export default ConsumerRights;

export async function getStaticProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
