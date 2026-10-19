export default function ProductCard({ product, onAddToCart }) {
  return (
    <article className="product-card">
      <div className="product-card__image" aria-hidden="true">
        {product.emoji}
      </div>
      <h3 className="product-card__name">{product.name}</h3>
      <p className="product-card__description">{product.description}</p>
      <p className="product-card__price">${product.price.toFixed(2)}</p>
      <button
        type="button"
        aria-label={`Add ${product.name} to cart`}
        onClick={() => onAddToCart(product)}
      >
        Add to Cart
      </button>
    </article>
  );
}
