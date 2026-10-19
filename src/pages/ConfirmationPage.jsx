import { Navigate, useLocation, Link } from 'react-router-dom';
import { useEffect } from 'react';
import OrderSummary from '../components/OrderSummary.jsx';
import { useCart } from '../context/CartContext.jsx';

export default function ConfirmationPage() {
  const location = useLocation();
  const order = location.state;
  const { clearCart } = useCart();

  useEffect(() => {
    if (order) clearCart();
  }, [order, clearCart]);

  if (!order) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="confirmation-page">
      <h1>Order Confirmed</h1>
      <p>Thanks for your order! Here's your final summary.</p>
      <OrderSummary
        subtotal={order.subtotal}
        discountAmount={order.discountAmount}
        shipping={order.shipping}
        tax={order.tax}
        total={order.total}
      />
      <Link to="/">Continue Shopping</Link>
    </div>
  );
}
