import classes from "./HomeTabButton.module.scss";

function HomeTabButton({
  children,
  onButtonClick,
  buttonClass,
  changeStyle = "",
}) {
  return (
    <div className={`${classes.buttonTab} ${classes[changeStyle]}`}>
      <button
        onClick={onButtonClick}
        className={`${classes[buttonClass]}`}
        type="button"
      >
        {children}
      </button>
    </div>
  );
}

export default HomeTabButton;
