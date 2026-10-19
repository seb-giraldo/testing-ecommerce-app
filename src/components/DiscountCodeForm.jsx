import { useState } from 'react';

export default function DiscountCodeForm({ onApply, error, appliedCode }) {
  const [code, setCode] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    onApply(code);
  }

  return (
    <form className="discount-form" onSubmit={handleSubmit}>
      <label htmlFor="discount-code">Discount code</label>
      <input
        id="discount-code"
        type="text"
        value={code}
        onChange={(event) => setCode(event.target.value)}
        placeholder="e.g. SAVE10"
      />
      <button type="submit">Apply</button>
      {error && <p role="alert">{error}</p>}
      {appliedCode && <p role="status">Code {appliedCode} applied!</p>}
    </form>
  );
}
