import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  calculateSubtotal,
  calculateTax,
  calculateTotal,
  applyDiscountCode as applyDiscountCodeToSubtotal,
  getShippingDetails,
} from '../utils/orderMath.js';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [discountCode, setDiscountCode] = useState('');
  const [discountError, setDiscountError] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [shippingDestination, setShippingDestination] = useState('domestic');

  function addItem(product) {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  }

  function removeItem(productId) {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  }

  function updateQuantity(productId, quantity) {
    if (quantity < 1) return;
    setItems((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  }

  function applyDiscountCode(code) {
    const subtotal = calculateSubtotal(items);
    const result = applyDiscountCodeToSubtotal(subtotal, code);

    if (!result.valid) {
      setDiscountCode('');
      setDiscountAmount(0);
      setDiscountError('That discount code is not valid.');
      return;
    }

    setDiscountCode(code.trim().toUpperCase());
    setDiscountAmount(result.discountAmount);
    setDiscountError('');
  }

  const totals = useMemo(() => {
    const subtotal = calculateSubtotal(items);
    const discountedSubtotal = subtotal - discountAmount;
    const shipping = getShippingDetails(discountedSubtotal, shippingDestination);
    const tax = calculateTax(discountedSubtotal);
    const total = calculateTotal(subtotal, tax, shipping.cost, discountAmount);

    return { subtotal, tax, shipping, total };
  }, [items, discountAmount, shippingDestination]);

  function submitOrder() {
    const order = {
      items,
      discountCode,
      discountAmount,
      shippingDestination,
      ...totals,
    };

    navigate('/confirmation', { state: order });
  }

  const clearCart = useCallback(() => {
    setItems([]);
    setDiscountCode('');
    setDiscountAmount(0);
    setDiscountError('');
    setShippingDestination('domestic');
  }, []);

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    discountCode,
    discountError,
    discountAmount,
    applyDiscountCode,
    shippingDestination,
    setShippingDestination,
    ...totals,
    submitOrder,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
