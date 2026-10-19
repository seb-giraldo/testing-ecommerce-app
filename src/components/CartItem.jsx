export default function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  const { product, quantity } = item;

  return (
    <div className="cart-item">
      <span className="cart-item__emoji" aria-hidden="true">
        {product.emoji}
      </span>
      <div className="cart-item__details">
        <p className="cart-item__name">{product.name}</p>
        <p className="cart-item__price">${product.price.toFixed(2)}</p>
      </div>
      <div className="cart-item__quantity">
        <button
          type="button"
          aria-label={`Decrease quantity of ${product.name}`}
          onClick={() => onDecrease(product.id)}
        >
          −
        </button>
        <span aria-label={`Quantity of ${product.name}`}>{quantity}</span>
        <button
          type="button"
          aria-label={`Increase quantity of ${product.name}`}
          onClick={() => onIncrease(product.id)}
        >
          +
        </button>
      </div>
      <button
        type="button"
        aria-label={`Remove ${product.name} from cart`}
        onClick={() => onRemove(product.id)}
      >
        Remove
      </button>
    </div>
  );
}
