/* eslint-disable no-restricted-globals */
/* eslint-disable no-inner-declarations */
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export function ScrollToTop() {
  const { pathname } = useRouter();

  useEffect(() => {
    if (typeof widnow !== "undefined") window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function getWindowDimensions() {
  if (typeof widnow !== "undefined") {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }
  return { width: 0, height: 0 };
}

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const { innerWidth: width, innerHeight: height } = window;
      setWindowDimensions({ width, height });

      function handleResize() {
        setWindowDimensions({ width, height });
      }

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return windowDimensions;
}

/**
 * Format number in currency.
 *
 * @param {number} amount The value to format as a price.
 * @param {string|false|null} currency The currency to show or false to skip.
 * @param {boolean} showFractions True to show fraction digits, false othwerwise.
 *
 * @returns {string} The formatted price, with currency suffix.
 */
export const currencyFormat = (
  amount,
  currency = "rsd",
  showFractions = true
) => {
  // Guard: no amount
  if (amount == null || isNaN(amount)) {
    return "-";
  }

  // Number of digits to show after the decimal places
  const decimalDigits = showFractions ? 2 : 0;

  // Summarize options
  const options = {
    minimumFractionDigits: decimalDigits,
    maximumFractionDigits: decimalDigits,
  };

  // Format to two decimal places
  const price = new Intl.NumberFormat("de-DE", options).format(amount);
  const currencyLabel = currency?.toLocaleUpperCase() ?? "";

  return `${price} ${currencyLabel}`.trim();
};
