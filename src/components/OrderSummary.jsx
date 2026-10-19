export default function OrderSummary({ subtotal, discountAmount, shipping, tax, total }) {
  return (
    <section className="order-summary" aria-label="Order summary">
      <h2>Order Summary</h2>
      <dl>
        <div className="order-summary__row">
          <dt>Subtotal</dt>
          <dd>${subtotal.toFixed(2)}</dd>
        </div>
        {discountAmount > 0 && (
          <div className="order-summary__row">
            <dt>Discount</dt>
            <dd>-${discountAmount.toFixed(2)}</dd>
          </div>
        )}
        <div className="order-summary__row">
          <dt>Shipping ({shipping.method})</dt>
          <dd>${shipping.cost.toFixed(2)}</dd>
        </div>
        <div className="order-summary__row">
          <dt>Tax</dt>
          <dd>${tax.toFixed(2)}</dd>
        </div>
        <div className="order-summary__row order-summary__row--total">
          <dt>Total</dt>
          <dd>${total.toFixed(2)}</dd>
        </div>
      </dl>
    </section>
  );
}
