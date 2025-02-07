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
                <Image src={banner.image} alt="Stojic Elektik" layout="fill" />
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
export const revalidate = 30;
export default ActionBanners;
