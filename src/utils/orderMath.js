const TAX_RATE = 0.08;
const FREE_SHIPPING_THRESHOLD = 75;
const DOMESTIC_SHIPPING_COST = 5.99;
const INTERNATIONAL_SHIPPING_COST = 19.99;

const DISCOUNT_CODES = {
  SAVE10: 0.1,
  SAVE20: 0.2,
};

export function calculateSubtotal(cartItems) {
  return cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
}

export function applyDiscountCode(subtotal, code) {
  const normalizedCode = code.trim().toUpperCase();
  const rate = DISCOUNT_CODES[normalizedCode];

  if (!rate) {
    return { valid: false, discountAmount: 0 };
  }

  return { valid: true, discountAmount: subtotal * rate };
}

export function getShippingDetails(subtotal, destination) {
  if (destination === 'international') {
    return { cost: INTERNATIONAL_SHIPPING_COST, method: 'International' };
  }

  if (subtotal >= FREE_SHIPPING_THRESHOLD) {
    return { cost: 0, method: 'Free' };
  }

  return { cost: DOMESTIC_SHIPPING_COST, method: 'Domestic' };
}

export function calculateTax(subtotal, rate = TAX_RATE) {
  return subtotal * rate;
}

export function calculateTotal(subtotal, tax, shippingCost, discountAmount) {
  return subtotal - discountAmount + tax + shippingCost;
}
