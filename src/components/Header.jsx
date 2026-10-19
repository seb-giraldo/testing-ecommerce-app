import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

export default function Header() {
  const { items } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="header">
      <Link to="/" className="header__logo">
        Testing Module Shop
      </Link>
      <Link to="/cart" className="header__cart-link">
        Cart ({itemCount})
      </Link>
    </header>
  );
}
