import { useEffect, useState } from 'react';
import { getProducts } from '../api/products.js';
import { useCart } from '../context/CartContext.jsx';
import ProductCard from '../components/ProductCard.jsx';

export default function ProductListingPage() {
  const { addItem } = useCart();
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let cancelled = false;

    getProducts()
      .then((result) => {
        if (cancelled) return;
        setProducts(result);
        setStatus('success');
      })
      .catch(() => {
        if (cancelled) return;
        setStatus('error');
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (status === 'loading') {
    return <p>Loading products...</p>;
  }

  if (status === 'error') {
    return <p role="alert">Something went wrong loading products.</p>;
  }

  return (
    <div className="product-listing">
      <h1>Products</h1>
      <div className="product-listing__grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={addItem} />
        ))}
      </div>
    </div>
  );
}
