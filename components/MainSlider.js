import { Carousel } from "react-bootstrap";
import Link from "next/link";
import Image from "next/legacy/image";
import classes from "./MainSlider.module.scss";

const MainSlider = ({ banners, mobileBanners }) => (
  <>
    <div className="mobile-hidden">
      <Carousel>
        {(banners ?? []).map((banner) => (
          <Carousel.Item
            className={`${classes["main-slider"]}`}
            key={banner.id}
          >
            {banner.file_data.type === "video" ? (
              <video
                src={banner.file_data.url}
                autoPlay
                muted
                loop
                width={banner?.file_data?.banner_position?.width}
                height={banner?.file_data?.banner_position?.height}
                className={`${classes["desktop-display"]} ${classes["video-display"]}`}
              />
            ) : banner.url ? (
              <Link href={banner.url} target="_blank" legacyBehavior>
                <div className={`${classes["desktop-display"]}`}>
                  <Image
                    src={banner.file_data.url}
                    alt={banner?.file_data?.description?.alt}
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                    priority
                    sizes="100vw"
                  />
                </div>
              </Link>
            ) : (
              <div className={`${classes["desktop-display"]}`}>
                <Image
                  src={banner.file_data.url}
                  alt={banner?.file_data?.description?.alt}
                  layout="fill"
                  objectFit="cover"
                  quality={100}
                  priority
                  sizes="100vw"
                />
              </div>
            )}

            {banner.button && (
              <Carousel.Caption className={`${classes["custom-caption"]}`}>
                <Link href="/" legacyBehavior>
                  <a
                    variant="danger"
                    className={`${classes["button-caption"]}`}
                  >
                    {banner.button}
                  </a>
                </Link>
              </Carousel.Caption>
            )}
          </Carousel.Item>
        ))}
      </Carousel>
    </div>

    <div className="desktop-hidden">
      <Carousel>
        {(mobileBanners ?? []).map((banner) => (
          <Carousel.Item
            className={`${classes["main-slider"]}`}
            key={banner.id}
          >
            {banner.file_data.type === "video" ? (
              <video
                src={banner.file_data.url}
                autoPlay
                muted
                loop
                width={banner?.file_data?.banner_position?.width}
                height={banner?.file_data?.banner_position?.height}
                className={`${classes["mobile-display"]} ${classes["video-display"]}`}
              />
            ) : banner.url ? (
              <Link href={banner.url} target="_blank" legacyBehavior>
                <a>
                  <div className={classes["mobile-display"]}>
                    <Image
                      className={classes["mobile-display"]}
                      src={banner.file_data.url}
                      alt={banner?.file_data?.description?.alt}
                      layout="fill"
                      objectFit="cover"
                      priority
                      sizes="100vw"
                    />
                  </div>
                </a>
              </Link>
            ) : (
              <div className={classes["mobile-display"]}>
                <Image
                  className={classes["mobile-display"]}
                  src={banner.file_data.url}
                  alt={banner?.file_data?.description?.alt}
                  layout="fill"
                  objectFit="cover"
                  priority
                  sizes="100vw"
                />
              </div>
            )}

            {banner.button && (
              <Carousel.Caption className={`${classes["custom-caption"]}`}>
                <Link href="/" legacyBehavior>
                  <a
                    variant="danger"
                    className={`${classes["button-caption"]}`}
                  >
                    {banner.button}
                  </a>
                </Link>
              </Carousel.Caption>
            )}
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  </>
);

export default MainSlider;
