import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCartItem, decreaseCartItemQtys, increaseCartItemQtys } from '../../store/apis/productsApi';

const ProductCart = ({ product }) => {
  const { _id, name, description, mrp } = product;
  const dispatch = useDispatch();
  const [quantity, setQuantity] = React.useState(1);

  const cartItems = useSelector((state) => state.products.items);

  const isItemInCart = cartItems.some((item) => item._id === _id);

  const addToCart = () => {
    dispatch(addCartItem({ id: _id, quantity }));
  };

  const increaseQuantity = () => {
    dispatch(increaseCartItemQtys({ id: _id }));
  };

  const decreaseQuantity = () => {
    dispatch(decreaseCartItemQtys({ id: _id }));
  };

  return (
    <div className="product_card" key={_id.toString()}>
      <div className="product_card_banner"></div>
      <div className="product_card_content">
        <h1 className="product_title_ts">{name}</h1>
        <p className="product_note_ts">{description}.</p>
        <div className="product_actions">
          <h1 className="product_price_ts">{mrp}</h1>
          <div className="clickable_area">
            {isItemInCart ? (
              <div className="counter_btn">
                <div className="counter_rate">
                  <i className="bx bx-minus" onClick={decreaseQuantity}></i>
                </div>
                <p className="counter_value">
                  {cartItems.find((item) => item._id === _id)?.quantity || 0}
                </p>
                <div className="counter_rate">
                  <i className="bx bx-plus" onClick={increaseQuantity}></i>
                </div>
              </div>
            ) : (
              <button className="add_cart_btn" onClick={addToCart}>
                Add
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
