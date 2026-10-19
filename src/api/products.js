import { products } from '../data/products.js';

const SIMULATED_DELAY_MS = 400;

export function getProducts() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(products), SIMULATED_DELAY_MS);
  });
}
