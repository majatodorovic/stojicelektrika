import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/legacy/image";
import classes from "./ActionBanners.module.scss";

const Row = dynamic(() => import("react-bootstrap/Row"));
const Col = dynamic(() => import("react-bootstrap/Col"));

const ActionBanners = ({ actionBanners }) => (
  <div className={`${classes.actionBanners}`}>
    <div className="container">
      <Row>
        {(actionBanners ?? []).map((banner) => (
          <Col
            className={`${classes.box}`}
            key={banner.id}
            sm={12}
            md={6}
            lg={6}
            xl={6}
          >
            <Link
              href={banner.url || "#"}
              target={banner.target === "blank" ? "_blank" : "_self"}
              rel={banner.target === "blank" ? "noopener noreferrer" : undefined}
            >
              <div className={`${classes.actionBanner}`}>
                <Image
                  key={banner.image} // Forsira re-render slike
                  src={`${banner.image}?t=${new Date().getTime()}`} // Sprečava keširanje
                  alt="Stojic Elektik"
                  layout="fill"
                  unoptimized // Isključuje Next.js optimizaciju slika
                />
                <div className={classes.wrappText}>
                  {banner.title && <h5>{banner.title}</h5>}
                  {banner.subtitle && <p>{banner.subtitle}</p>}
                  {banner.text && <p>{banner.text}</p>}
                  {banner.button && (
                    <button className={classes.dugme}>{banner.button}</button>
                  )}
                </div>
              </div>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  </div>
);

export default ActionBanners;

// Fetch podataka iz API-ja u realnom vremenu
export async function getServerSideProps() {
  const res = await fetch(
    `https://api.stojic.rs/croonus-uploads/banners?t=${new Date().getTime()}`
  );
  const data = await res.json();

  return {
    props: { actionBanners: data },
  };
}
