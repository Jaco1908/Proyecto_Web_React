import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Crear el contexto
const CartContext = createContext();

// Reducer para manejar las acciones del carrito
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItemIndex = state.items.findIndex(
        item => item.id === action.payload.id
      );

      if (existingItemIndex > -1) {
        // Si el producto ya existe, incrementar cantidad
        const updatedItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, cantidad: item.cantidad + action.payload.cantidad }
            : item
        );
        return {
          ...state,
          items: updatedItems,
          totalItems: updatedItems.reduce((sum, item) => sum + item.cantidad, 0),
          totalPrice: updatedItems.reduce((sum, item) => sum + (item.precio * item.cantidad), 0)
        };
      } else {
        // Si es un producto nuevo, agregarlo
        const newItems = [...state.items, action.payload];
        return {
          ...state,
          items: newItems,
          totalItems: newItems.reduce((sum, item) => sum + item.cantidad, 0),
          totalPrice: newItems.reduce((sum, item) => sum + (item.precio * item.cantidad), 0)
        };
      }

    case 'REMOVE_FROM_CART':
      const filteredItems = state.items.filter(item => item.id !== action.payload);
      return {
        ...state,
        items: filteredItems,
        totalItems: filteredItems.reduce((sum, item) => sum + item.cantidad, 0),
        totalPrice: filteredItems.reduce((sum, item) => sum + (item.precio * item.cantidad), 0)
      };

    case 'UPDATE_QUANTITY':
      const updatedQuantityItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, cantidad: Math.max(1, action.payload.cantidad) }
          : item
      );
      return {
        ...state,
        items: updatedQuantityItems,
        totalItems: updatedQuantityItems.reduce((sum, item) => sum + item.cantidad, 0),
        totalPrice: updatedQuantityItems.reduce((sum, item) => sum + (item.precio * item.cantidad), 0)
      };

    case 'CLEAR_CART':
      return {
        items: [],
        totalItems: 0,
        totalPrice: 0
      };

    case 'LOAD_CART':
      const loadedItems = action.payload || [];
      return {
        items: loadedItems,
        totalItems: loadedItems.reduce((sum, item) => sum + item.cantidad, 0),
        totalPrice: loadedItems.reduce((sum, item) => sum + (item.precio * item.cantidad), 0)
      };

    default:
      return state;
  }
};

// Estado inicial del carrito
const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0
};

// Provider del contexto
export const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialState);

  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: parsedCart });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartState.items));
  }, [cartState.items]);

  // Funciones del carrito
  const addToCart = (product, cantidad = 1) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        id: product.id,
        nombre: product.nombre,
        precio: parseFloat(product.precio),
        imagen: product.imagen || product.foto,
        marca: product.marca,
        categoria: product.categoria,
        cantidad
      }
    });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const updateQuantity = (productId, cantidad) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, cantidad } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getCartTotal = () => {
    return cartState.totalPrice;
  };

  const getCartItemCount = () => {
    return cartState.totalItems;
  };

  const isInCart = (productId) => {
    return cartState.items.some(item => item.id === productId);
  };

  const getItemQuantity = (productId) => {
    const item = cartState.items.find(item => item.id === productId);
    return item ? item.cantidad : 0;
  };

  const value = {
    ...cartState,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount,
    isInCart,
    getItemQuantity
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
