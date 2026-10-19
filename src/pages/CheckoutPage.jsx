import { Navigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import ShippingSelector from '../components/ShippingSelector.jsx';
import OrderSummary from '../components/OrderSummary.jsx';

export default function CheckoutPage() {
  const {
    items,
    shippingDestination,
    setShippingDestination,
    submitOrder,
    subtotal,
    discountAmount,
    shipping,
    tax,
    total,
  } = useCart();

  if (items.length === 0) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      <ShippingSelector destination={shippingDestination} onChange={setShippingDestination} />
      <OrderSummary subtotal={subtotal} discountAmount={discountAmount} shipping={shipping} tax={tax} total={total} />
      <button type="button" onClick={submitOrder}>
        Submit Order
      </button>
    </div>
  );
}
