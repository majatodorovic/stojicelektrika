import dynamic from "next/dynamic";
import Image from "next/legacy/image";
import classes from "./CardsSupport.module.scss";
import cards from "../../data/cardsSupport.json";

const Row = dynamic(() => import("react-bootstrap/Row"));
const Col = dynamic(() => import("react-bootstrap/Col"));

const CardsSupport = () => (
  <div className={`${classes.cardsSupport}`}>
    <div className="container">
      <Row>
        {cards.map((card, i) => (
          <Col key={card.id} xs={3} sm={3} md={3} lg={3} xl={3}>
            <div
              className={
                i === 2 || i === 3
                  ? `${classes.cardSupport} ${classes.cardSupportMob}`
                  : `${classes.cardSupport}`
              }
            >
              <div className={classes.img}>
                <Image
                  src={`/${card.src}`}
                  alt={card.alt}
                  layout="fill"
                  objectFit="contain"
                />
              </div>

              <p>
                <span>{card.span}</span>
                {card.desc}
              </p>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  </div>
);

export default CardsSupport;
