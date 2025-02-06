import Image from "next/legacy/image";
import Link from "next/link";
import React from "react";
import classes from "./CategoryList.module.scss";

const CategoryList = ({ recomendedCategories = [] }) => (
  <div className={`${classes["category-list-holder"]}`}>
    <div className="container">
      <div className={`${classes["category-list-title"]}`}>
        <p>Za Vas izdvajamo</p>
        <h3>Preporučene kategorije</h3>
      </div>
      <div className={`${`${classes["category-row"]} row`}`}>
        <div className={`${classes["line-gray"]}`} />
        {(recomendedCategories ?? []).map((item) => (
          <div
            key={item.id}
            className={`${`${classes["category-col"]} col-xl-2 col-lg-2 col-md-4 col-sm-6 col-xs-6 col-6`}`}
          >
            <div className={classes["category-holder"]}>
              <Link href={`/kategorije/${item.slug}`} legacyBehavior>
                <a>
                  <div className={classes["image-holder"]}>
                    <Image
                      src={item?.images?.iamge ?? "/products/missing.png"}
                      className="d-inline-block align-top w-100 img-fluid"
                      alt="React"
                      layout="fill"
                      objectFit="contain"
                      priority
                    />
                  </div>{" "}
                </a>
              </Link>
              <div className={classes["info-holder"]}>
                <Link href={`/kategorije/${item.id}`} legacyBehavior>
                  <a className={classes["info-holder-title"]}>
                    <h5>{item?.basic_data?.name ?? ""}</h5>
                  </a>
                </Link>
                <div className={`${classes.line}`} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default CategoryList;
