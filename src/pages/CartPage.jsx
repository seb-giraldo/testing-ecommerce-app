import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import CartItem from '../components/CartItem.jsx';
import DiscountCodeForm from '../components/DiscountCodeForm.jsx';
import OrderSummary from '../components/OrderSummary.jsx';

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeItem,
    applyDiscountCode,
    discountCode,
    discountError,
    discountAmount,
    subtotal,
    shipping,
    tax,
    total,
  } = useCart();

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <h1>Your Cart</h1>
        <p>Your cart is empty. <Link to="/">Browse products</Link></p>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      <div className="cart-page__items">
        {items.map((item) => (
          <CartItem
            key={item.product.id}
            item={item}
            onIncrease={(id) => updateQuantity(id, item.quantity + 1)}
            onDecrease={(id) => updateQuantity(id, item.quantity - 1)}
            onRemove={removeItem}
          />
        ))}
      </div>
      <DiscountCodeForm onApply={applyDiscountCode} error={discountError} appliedCode={discountCode} />
      <OrderSummary subtotal={subtotal} discountAmount={discountAmount} shipping={shipping} tax={tax} total={total} />
      <Link to="/checkout" className="cart-page__checkout-link">
        Proceed to Checkout
      </Link>
    </div>
  );
}
