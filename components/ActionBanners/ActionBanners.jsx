import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Link from "next/link";
import Image from "next/legacy/image";
import classes from "./ActionBanners.module.scss";

const ActionBanners = ({ actionBanners }) => {
  const [banners, setBanners] = useState([]);

  // Osiguravamo da se podaci učitaju tek nakon što se komponenta montira
  useEffect(() => {
    setBanners(actionBanners || []);
  }, [actionBanners]);

  return (
    <div className={classes.actionBanners}>
      <div className="container">
        <Row>
          {banners.length > 0 ? (
            banners.map((banner) => (
              <Col className={classes.box} key={banner.id} sm={12} md={6} lg={6} xl={6}>
                <Link
                  href={banner.url || "#"}
                  target={banner.target === "blank" ? "_blank" : undefined}
                  rel={banner.target === "blank" ? "noopener noreferrer" : undefined}
                >
                  <div className={classes.actionBanner}>
                    {banner.image ? (
                      <Image key={banner.image} src={banner.image} alt="Stojic Elektik" layout="fill" />
                    ) : (
                      <p></p>
                    )}
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
            ))
          ) : (
            <p>Loading banners...</p> // Prikaz kada nema dostupnih podataka
          )}
        </Row>
      </div>
    </div>
  );
};

export default ActionBanners;
