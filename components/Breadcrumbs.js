/* eslint-disable @next/next/no-html-link-for-pages */
import React from "react";
import classes from "./Breadcrumbs.module.scss";

const Breadcrumbs = ({ crumbs = [], end }) => (
  // <div className='container'>
  <div className={`${classes["breadcrumbs-holder"]}`}>
    <ul>
      <li>
        <a href="/" className={`${classes["breadcrumbs-link"]}`}>
          Početna
        </a>
      </li>
      {crumbs.length > 0 &&
        crumbs?.map((item, index) => (
          <li key={index}>
            <a
              href={`/kategorije/${item.id.toString()}`}
              className={`${classes["breadcrumbs-link"]}`}
            >
              {item.name}
            </a>
          </li>
        ))}
      {end && (
        <li>
          <p className={`${classes["breadcrumbs-link"]}`}>{end.label}</p>
        </li>
      )}
    </ul>
  </div>
  // </div>
);

export default Breadcrumbs;
