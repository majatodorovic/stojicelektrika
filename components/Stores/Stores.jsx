import React from "react";
import classes from "./Stores.module.scss";

const Stores = () => (
  <div className={classes.stores}>
    <div className="container">
      <h5>Prodavnice</h5>
      <div className={classes.storesGrid}>
        <div className={classes.storeCard}>
          <h6>Maloprodaja 1</h6>
          <div className="storeItem">
            <b>Grad:</b> Čačak
          </div>
          <div className="storeItem">
            <b>Adresa:</b> Svetozara Babovića 13
          </div>
          <div className="storeItem">
            <b>Telefon:</b> +381 64 64 30 188
          </div>
          <div className="storeItem">
            <b>Radno vreme:</b>08:00-16:00
          </div>
        </div>
        <div className={classes.storeCard}>
          <h6>Maloprodaja 2</h6>
          <div className="storeItem">
            <b>Grad:</b> Čačak
          </div>
          <div className="storeItem">
            <b>Adresa:</b> Braće Spasić 5
          </div>
          <div className="storeItem">
            <b>Telefon:</b> +381 32 377 330
          </div>
          <div className="storeItem">
            <b>Radno vreme:</b> 07:00-20:00
          </div>
        </div>
        <div className={classes.storeCard}>
          <h6>Maloprodaja 3</h6>
          <div className="storeItem">
            <b>Grad:</b> Leskovac
          </div>
          <div className="storeItem">
            <b>Adresa:</b> Pop Mićina 13
          </div>
          <div className="storeItem">
            <b>Telefon:</b> +381 64 133 77 12
          </div>
          <div className="storeItem">
            <b>Radno vreme:</b> 08:00-20:00
          </div>
        </div>
        <div className={classes.storeCard}>
          <h6>Maloprodaja 5</h6>
          <div className="storeItem">
            <b>Grad:</b> Čačak
          </div>
          <div className="storeItem">
            <b>Adresa:</b> Braće Spasić 11
          </div>
          <div className="storeItem">
            <b>Telefon:</b> +381 32 372 705
          </div>
          <div className="storeItem">
            <b>Radno vreme:</b> 08:00-20:00
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Stores;
