import classes from "./CartProductBox.module.scss";
import CartProductItem from "./CartProductItem";

const CartProductBox = ({ cartItems = [] }) => (
  <div className={`${classes.container} row`}>
    <div className={`${classes.titles} row`}>
      <div className="col-2" />
      <div className="col-4">
        <span>Proizvod:</span>
      </div>
      <div className="col-2">
        <span>Cena:</span>
      </div>
      <div className="col-2">
        <span>Količina:</span>
      </div>
      <div className="col-2">
        <span>Ukupno:</span>
      </div>
    </div>
    {cartItems.map((item) => (
      <CartProductItem item={item} key={item.cart.cart_item_id} />
    ))}
  </div>
);

export default CartProductBox;
