import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const Slider = ({ children, count }) => {
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      mode: "free",
      drag: true,
      loop: true,

      slides: {
        perView: count ?? 6,
        spacing: 20,
      },
      breakpoints: {
        "(max-width: 1200px)": {
          slides: {
            perView: 4,
            spacing: 20,
          },
        },
        "(max-width: 768px)": {
          slides: {
            perView: 2,
            spacing: 20,
          },
        },
        "(max-width: 425px)": {
          slides: {
            perView: 1,
            spacing: 20,
          },
        },
      },
    },
    [
      (slider) => {
        let timeout;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 4000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  return (
    <div ref={sliderRef} className="keen-slider">
      {children}
    </div>
  );
};

export default Slider;
