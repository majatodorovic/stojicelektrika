/* eslint-disable no-restricted-globals */
import classes from "./PlusMinusInput.module.scss";

/**
 * Input with plus and minus UI element
 *
 * @author Aleksandar Ječmenić <aleksandar.jecmenic@croonus.com>
 */
const PlusMinusInput = ({ className, amount, setCount }) => {
  // If minus is clicked
  const onMinusHandler = () => {
    if (amount !== 1) setCount((prev) => prev - 1);
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
      <div className={`${classes["plus-minus-holder"]}`}>
        <button
          className={classes["min-holder"]}
          onClick={onMinusHandler}
          type="button"
        >
          -
        </button>
        <div className={`${classes.number}`}>
          <input
            maxLength="2"
            className={classes.input}
            value={amount}
            onChange={onInputChange}
          />
        </div>
        <button
          className={classes["plus-holder"]}
          onClick={onPlusHandler}
          type="button"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default PlusMinusInput;
