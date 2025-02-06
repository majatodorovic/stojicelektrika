import React from "react";
import Image from "next/legacy/image";
import Link from "next/link";
import classes from "./ActionBanners.module.scss";

const ActionBanners = ({ actionBanners }) => (
  <div className={`${classes["action-banners-holder"]}`}>
    <div className="container">
      <div className="row">
        {(actionBanners ?? []).map((banner) => (
          <div
            className="col-xl-6 col-lg-6 col-md-12 col-xs-12 col-sm-12 col-12 f-s"
            key={banner.id}
          >
            <div className={classes.bannerContainer}>
              <Image
                src={banner.image}
                alt="Stojic Elektrik"
                width={1440}
                height={350}
                priority
              />
              <div className={classes.wrappText}>
                <h5>Specijalni rabati za B2B korisnike!</h5>
                <Link href="/">Saznaj više &#62;&#62;</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default ActionBanners;
