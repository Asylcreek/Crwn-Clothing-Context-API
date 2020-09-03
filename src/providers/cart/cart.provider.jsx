import React from 'react';

import {
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
  getTotalItemsInCart,
  getTotalAmountInCart,
} from './cart.utils';

export const CartContext = React.createContext({
  cartHidden: true,
  cartItems: [],
  cartItemsCount: 0,
  totalAmountInCart: 0,
  toggleCartHidden: () => {},
  addItem: () => {},
  removeItem: () => {},
  clearItemsFromCart: () => {},
});

const CartProvider = ({ children }) => {
  const [cartHidden, setCartHidden] = React.useState(true);
  const [cartItems, setCartItems] = React.useState([]);
  const [cartItemsCount, setCartItemsCount] = React.useState(0);
  const [totalAmountInCart, setTotalAmountInCart] = React.useState(0);

  const addItem = (item) => setCartItems(addItemToCart(cartItems, item));

  const removeItem = (item) =>
    setCartItems(removeItemFromCart(cartItems, item));

  const clearItemsFromCart = (item) =>
    setCartItems(clearItemFromCart(cartItems, item));

  const toggleCartHidden = () => setCartHidden(!cartHidden);

  React.useEffect(() => {
    setCartItemsCount(getTotalItemsInCart(cartItems));
    setTotalAmountInCart(getTotalAmountInCart(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartHidden,
        toggleCartHidden,
        cartItems,
        cartItemsCount,
        addItem,
        removeItem,
        clearItemsFromCart,
        totalAmountInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
