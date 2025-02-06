"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Thumb from "../../components/ProductBoxComplexSmall";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Link from "next/link";
import { useRouter } from "next/router";
import { ApiHandler } from "../../helpers/api";

const LandingPage = () => {
  const router = useRouter();
  const api = ApiHandler();
  const slug = router.query.slug;
  const [loadingBasicData, setLoadingBasicData] = useState(true);
  const [loadingThumb, setLoadingThumb] = useState(true);
  const [loadingConditions, setLoadingConditions] = useState(true);

  const [data, setData] = useState({
    basic_data: [],
    thumb: null,
    conditions: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      const basicDataResponse = await api
        .get(`/landing-pages/basic-data/${slug}`)
        .then((res) => {
          setData((prevData) => ({
            ...prevData,
            basic_data: res?.payload,
          }));
          setLoadingBasicData(false);
        });

      const thumbResponse = await api
        .list(`/landing-pages/thumb/${slug}?render=false`,)
        .then((res) => {
          setData((prevData) => ({
            ...prevData,
            thumb: res?.payload?.items,
          }));
          setLoadingThumb(false);
        });

      const conditionsResponse = await api
        .list(`/landing-pages/conditions/${slug}?render=false`, )
        .then((res) => {
          setData((prevData) => ({
            ...prevData,
            conditions: res?.payload,
          }));
          setLoadingConditions(false);
        });
    };
    if (slug) {
      fetchData();
    }
  }, [slug]);

  return (
    <>
      <div className="container mx-auto">
        <div className="mt-5 md:mt-16 pb-10">
          <div className="d-flex flex-column align-items-start justify-content-center">
            {loadingBasicData ? (
              <div className="h-12 mb-4 w-100 bg-slate-300 animate-pulse"></div>
            ) : (
              <h1 className="text-2xl mt-3 mb-10 border-bottom pb-2 border-b-croonus-1 font-medium align-self-start w-100">
                {data?.basic_data?.name}
              </h1>
            )}
            <div className="position-relative w-100">
              {loadingBasicData ? (
                <div className="max-md:h-250 h-350 w-100 bg-slate-300 animate-pulse"></div>
              ) : (
                data?.basic_data?.image && (
                  <div className="position-relative">
                    <Image
                      src={data?.basic_data?.image}
                      alt=""
                      width={1920}
                      height={400}
                      priority
                      quality={100}
                      style={{ objectFit: "cover" }}
                      className="w-100 h-auto"
                    />
                  </div>
                )
              )}
            </div>
            {loadingBasicData ? (
              <div className="h-12 w-100 bg-slate-300 animate-pulse mt-5"></div>
            ) : (
              <>
                <div
                  className={`${
                    data?.basic_data?.gallery?.length > 0
                      ? "grid grid-cols-2 gap-2"
                      : ""
                  } mt-10`}
                >
                  <div
                    className={`${
                      data?.basic_data?.gallery?.length > 0
                        ? "col-md-6 mt-5"
                        : "mt-5"
                    } deffont`}
                    dangerouslySetInnerHTML={{
                      __html: data?.basic_data?.description,
                    }}
                  />
                  <div
                    className={`${
                      data?.basic_data?.gallery?.length > 0
                        ? "d-block"
                        : "d-none"
                    }`}
                  >
                    <Swiper
                      style={{ width: "40%" }}
                      modules={[Pagination]}
                      pagination={{ clickable: true }}
                    >
                      {data?.basic_data?.gallery?.map((image) => {
                        return (
                          <SwiperSlide>
                            <Image
                              src={image?.image}
                              alt=""
                              width={1920}
                              height={263}
                              priority
                              quality={100}
                              style={{ objectFit: "cover" }}
                              className="w-100 h-auto"
                            />
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>
                  </div>
                </div>
              </>
            )}
            <div
              className={`d-grid ${
                data?.conditions?.length > 0 ? "" : "flex-grow-1"
              } grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2 md:gap-4 mt-16`}
            >
              {loadingConditions ? (
                <>
                  {Array.from({ length: 12 }, (x, i) => (
                    <div
                      key={i}
                      className="max-md:h-250 h-500 w-100 bg-slate-300 animate-pulse"
                    ></div>
                  ))}
                </>
              ) : (
                data?.conditions?.map((condition) => {
                  return <Thumb product={condition} />;
                })
              )}
            </div>
            <div
              className={`grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 mt-16`}
            >
              {loadingThumb ? (
                <>
                  {Array.from({ length: 4 }, (x, i) => (
                    <div
                      key={i}
                      className="max-md:h-250 h-500 w-100 bg-slate-300 animate-pulse"
                    ></div>
                  ))}
                </>
              ) : (
                data?.thumb?.map((thumb) => {
                  return (
                    <div className="col-md-3">
                      {thumb?.name && (
                        <Link href={`${thumb?.url}`}>
                          <h1 className="text-2xl font-medium">
                            {thumb?.name}
                          </h1>
                        </Link>
                      )}
                      {thumb?.description && (
                        <p className="text-center">{thumb?.description}</p>
                      )}
                      {thumb?.thumb_image && (
                        <Link href={`${thumb?.url}`}>
                          <div className="">
                            <Image
                              src={thumb?.thumb_image}
                              alt=""
                              width={500}
                              height={203}
                              priority
                              quality={100}
                              style={{ objectFit: "contain" }}
                              className="w-100 h-auto"
                            />
                          </div>
                        </Link>
                      )}
                      {thumb?.button && (
                        <Link href={`${thumb?.url}`} className="w-100">
                          <button className="btn btn-primary rounded-circle p-2 mt-2 w-100">
                            {thumb?.button}
                          </button>
                        </Link>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
