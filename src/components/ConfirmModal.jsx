import React from "react";
import "../App.css";

function ConfirmModal({ cartItems, totalAmount, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <img 
            src="/assets/images/icon-order-confirmed.svg" 
            alt="Order Confirmed" 
            className="confirm-icon" 
          />
        </div>

        <h3 className="confirm-title">Order Confirmed</h3>
        <p className="confirm-message">We hope you enjoy your food!</p>

        <div className="cart-items">
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <div className="item-left">
                <img
                  className="product-img"
                  src={item.image.desktop}
                  alt={item.name}
                />
                <div className="item-info">
                  <p className="item-name">{item.name}</p>
                  <p className="item-quantity-price">
                    {item.quantity}x @ ${item.price.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="item-total">
                <p className="item-total-price">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}

          {/* Order Total within the cart-items section */}
          <div className="order-total">
            <p>Order Total</p>
            <p className="total-amount">${totalAmount.toFixed(2)}</p>
          </div>
        </div>

        <button className="start-new-order" onClick={onClose}>
          Start New Order
        </button>
      </div>
    </div>
  );
}

export default ConfirmModal;
