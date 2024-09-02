import React, { useState, useEffect } from "react";
import '../App.css';
import data from '../../data.json'; 
import ConfirmModal from "./ConfirmModal";

function MainPage() {
  const [cartItems, setCartItems] = useState([]);
  const [activeProduct, setActiveProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddToCart = (item) => {
    const existingItem = cartItems.find(cartItem => cartItem.name === item.name);

    if (existingItem) {
      setCartItems(cartItems.map(cartItem =>
        cartItem.name === item.name
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }

    setActiveProduct(item.name);
  };

  const handleQuantityChange = (itemName, change) => {
    setCartItems(cartItems.map(cartItem =>
      cartItem.name === itemName
        ? { ...cartItem, quantity: Math.max(cartItem.quantity + change, 1) }
        : cartItem
    ));
  };

  const handleRemoveFromCart = (itemName) => {
    setCartItems(cartItems.filter(cartItem => cartItem.name !== itemName));
  };

  const handleConfirmOrder = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCartItems([]);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeProduct && !event.target.closest('.grid-item')) {
        setActiveProduct(null);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [activeProduct]);

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="container">
      <div className="ParentDiv">
        <h1 className="heading">Desserts</h1>
        <div className="grid-container">
          {data.map((item, index) => (
            <div key={index} className="grid-item">
              <div className="image-container">
                <img 
                  className="ProductImg" 
                  src={item.image.desktop} 
                  alt={item.name} 
                />
                <button 
                  className={`add-to-cart ${activeProduct === item.name ? 'active' : ''}`}
                  onClick={() => handleAddToCart(item)}
                >
                  {activeProduct === item.name ? (
                    <div className="quantity-controls">
                      <button onClick={(e) => { e.stopPropagation(); handleQuantityChange(item.name, -1); }}>-</button>
                      <span className="quantity">{cartItems.find(cartItem => cartItem.name === item.name)?.quantity}</span>
                      <button onClick={(e) => { e.stopPropagation(); handleQuantityChange(item.name, 1); }}>+</button>
                    </div>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20">
                        <g fill="#C73B0F" clipPath="url(#a)">
                          <path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"/>
                          <path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z"/>
                        </g>
                        <defs>
                          <clipPath id="a">
                            <path fill="#fff" d="M.333 0h20v20h-20z"/>
                          </clipPath>
                        </defs>
                      </svg>
                      Add to Cart
                    </>
                  )}
                </button>
              </div>
              <div className="product-details">
                <p>{item.category}</p>
                <h3>{item.name}</h3>
                <p className="price">${item.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="YourCart">
        <h2>Your Cart ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})</h2>
        {cartItems.length === 0 ? (
          <div className="cart-empty-content">
            <img src="/assets/images/illustration-empty-cart.svg" alt="Empty Cart" />
            <p>Your added items will appear here</p>
          </div>
        ) : (
          <>
            {cartItems.map(cartItem => (
              <div key={cartItem.name} className="cart-item">
                <div className="cart-item-details">
                  <h3 className="cart-item-name">{cartItem.name}</h3>
                  <p>{cartItem.quantity}x @ ${cartItem.price.toFixed(2)} = ${(cartItem.price * cartItem.quantity).toFixed(2)}</p>
                </div>
                <button className="remove-item" onClick={() => handleRemoveFromCart(cartItem.name)}>×</button>
              </div>
            ))}
            <div className="order-summary">
              <div className="order">
              <p>Order Total</p>
              <h3>${totalAmount.toFixed(2)}</h3>
              </div>
              <div className="carbon-neutral">
                <img src="/assets/images/icon-carbon-neutral.svg" alt="Carbon Neutral" />
                <h4>This order is carbon neutral</h4>
              </div>
              <button className="confirm-order" onClick={handleConfirmOrder}>Confirm Order</button>
            </div>
          </>
        )}
      </div>
      {isModalOpen && (
        <ConfirmModal
          cartItems={cartItems}
          totalAmount={totalAmount}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default MainPage;
