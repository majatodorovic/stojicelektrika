/* eslint-disable no-restricted-globals */
import classes from "./PlusMinusInputCart.module.scss";

/**
 * Input with plus and minus UI element
 *
 * @author Aleksandar Ječmenić <aleksandar.jecmenic@croonus.com>
 */
const PlusMinusInputCart = ({ className, amount, setCount }) => {
  // If minus is clicked
  const onMinusHandler = () => {
    if (amount !== 0) setCount((prev) => prev - 1);
    if (amount === "") setCount(1);
  };

  // If plus is clicked
  const onPlusHandler = () => {
    if (amount === "") setCount(1);
    else setCount((prev) => prev + 1);
  };

  // If value is typed in
  const onInputChange = (e) => {
    if (!isNaN(e.target.value)) {
      if (+e.target.value < 1) setCount("");
      else setCount(+e.target.value);
    }
  };

  return (
    <div className={`${classes.container} ${className}`}>
      <button
        className={classes["min-plus"]}
        onClick={onMinusHandler}
        type="button"
      >
        -
      </button>
      <input
        maxLength="2"
        className={classes.input}
        value={amount}
        onChange={onInputChange}
      />
      <button
        className={classes["min-plus"]}
        onClick={onPlusHandler}
        type="button"
      >
        +
      </button>
    </div>
  );
};

export default PlusMinusInputCart;
