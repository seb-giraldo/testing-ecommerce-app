export default function ShippingSelector({ destination, onChange }) {
  return (
    <div className="shipping-selector" role="radiogroup" aria-labelledby="shipping-destination-label">
      <p id="shipping-destination-label" className="shipping-selector__label">
        Shipping destination
      </p>
      <label>
        <input
          type="radio"
          name="shipping-destination"
          value="domestic"
          checked={destination === 'domestic'}
          onChange={() => onChange('domestic')}
        />
        Domestic
      </label>
      <label>
        <input
          type="radio"
          name="shipping-destination"
          value="international"
          checked={destination === 'international'}
          onChange={() => onChange('international')}
        />
        International
      </label>
    </div>
  );
}
