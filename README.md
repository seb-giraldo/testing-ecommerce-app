# Testing E-Commerce App

A learning environment for implementing and practicing modern testing frameworks in React. This project demonstrates unit testing with **Vitest** and **React Testing Library**, and end-to-end testing with **Playwright**.

## Project Overview

This is a simple e-commerce application featuring:
- Product listing and browsing
- Shopping cart functionality
- Discount code application
- Shipping selection (domestic/international)
- Checkout flow
- Order confirmation

The app serves as a practical foundation for learning how to test React applications at different levels.

## Testing Stack

### 1. **Vitest** - Unit/Component Testing
A blazing fast unit testing framework powered by Vite.
- Configuration: `vite.config.js`
- Run: `npm test`
- Watch mode: `npm test -- --watch`

### 2. **React Testing Library** - Component Testing
Encourages testing components from the user's perspective.
- Utilities for rendering components and querying by roles
- Setup: `src/setupTests.js`
- Pairs with Vitest for component unit tests

### 3. **Playwright** - End-to-End Testing
Modern cross-browser E2E testing framework.
- Configuration: `playwright.config.js`
- Tests location: `e2e/*.spec.js`
- Run: `npm run test:e2e`

## Project Structure

```
testing-ecommerce-app/
├── src/
│   ├── components/        # React components
│   │   ├── Header.jsx
│   │   ├── ProductCard.jsx
│   │   ├── CartItem.jsx
│   │   ├── DiscountCodeForm.jsx
│   │   ├── OrderSummary.jsx
│   │   └── ShippingSelector.jsx
│   ├── pages/            # Page components
│   │   ├── ProductListingPage.jsx
│   │   ├── CartPage.jsx
│   │   ├── CheckoutPage.jsx
│   │   └── ConfirmationPage.jsx
│   ├── context/          # React Context
│   │   └── CartContext.jsx
│   ├── api/              # API utilities
│   │   └── products.js
│   ├── data/             # Static data
│   │   └── products.js
│   ├── utils/            # Utility functions
│   │   └── orderMath.js
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # Entry point
│   ├── setupTests.js     # Vitest + RTL setup
│   └── index.css         # Styles
├── e2e/                  # End-to-end tests
│   ├── browsing-and-cart.spec.js
│   ├── checkout-and-confirmation.spec.js
│   └── .gitkeep
├── playwright.config.js  # Playwright configuration
├── vite.config.js        # Vite & Vitest configuration
├── index.html            # HTML entry point
└── package.json          # Dependencies and scripts
```

## Setup

### Prerequisites
- Node.js >= 22.12

### Installation

```bash
npm install
```

## Available Scripts

### Development
```bash
npm run dev      # Start dev server with Vite
npm run build    # Build for production
npm run preview  # Preview production build
```

### Testing
```bash
npm test              # Run Vitest unit tests
npm test -- --watch  # Run Vitest in watch mode
npm run test:e2e      # Run Playwright E2E tests
```

## Test Suites

### Unit & Component Tests (7 tests)
- **ProductCard** (2 tests) — Renders product name/price and handles add-to-cart callback
- **DiscountCodeForm** (3 tests) — Validates user input, handles discount code application, and displays success/error messages
- **Header** (2 tests) — Displays correct cart item count for both empty and populated cart

### E2E Tests (14 tests)
- **Browsing & Cart Management** (9 tests) — Product discovery, quantity adjustments, cart math, and discount code validation
- **Checkout & Confirmation** (5 tests) — Route guards, shipping selection (domestic/international), and full purchase journey from product to order confirmation

**Total: 21 tests**

## Testing Patterns

### Unit/Component Tests with Vitest + React Testing Library

Test files should be placed next to their components with `.test.jsx` extension:

```javascript
import { render, screen } from '@testing-library/react';
import { ProductCard } from './ProductCard';

describe('ProductCard', () => {
  it('displays product name and price', () => {
    const product = { id: 1, name: 'Test Product', price: 29.99 };
    render(<ProductCard product={product} />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$29.99')).toBeInTheDocument();
  });
});
```

**Key principles:**
- Query by accessible roles (button, heading, link, etc.) when possible
- Test user behavior, not implementation details
- Use `user-event` for simulating user interactions
- Keep tests focused and readable

### E2E Tests with Playwright

Tests are located in `e2e/` directory with `.spec.js` extension:

```javascript
import { test, expect } from "@playwright/test";

test.describe("Full purchase journey", () => {
  test("completes a purchase", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Add Product to cart" }).click();
    await page.getByRole("link", { name: "Cart" }).click();
    
    await expect(page.getByRole("heading", { name: "Your Cart" })).toBeVisible();
  });
});
```

**Key principles:**
- Test complete user workflows
- Use semantic locators (roles, labels, text)
- Use `test.step()` for organizing complex flows
- Use `test.beforeEach()` for common setup

## Learning Resources

### Vitest Documentation
- Official docs: https://vitest.dev
- Configuration: Set up in `vite.config.js` under the `test` key

### React Testing Library
- Official docs: https://testing-library.com/react
- Focus on "testing the component, not the implementation"
- Query priority: role → label → placeholder → text → testId

### Playwright
- Official docs: https://playwright.dev
- Supports Chrome, Firefox, and WebKit
- Built-in debugging with `--debug` flag: `playwright test --debug`

## Key Configuration Files

### `vite.config.js`
- Configures Vitest to use jsdom environment
- Excludes `e2e/` directory from unit tests
- Sets up React plugin for JSX support

### `playwright.config.js`
- Configures Playwright test runner
- Defines browsers and base URL
- Sets up test timeout and retry logic

### `src/setupTests.js`
- Imports testing utilities
- Runs before each test file
- Sets up global test utilities from jest-dom

## Development Workflow

1. **Write a component** in `src/components/`
2. **Write unit tests** alongside it with `.test.jsx` extension
3. **Run `npm test`** to verify component behavior
4. **Write E2E tests** in `e2e/` for user workflows
5. **Run `npm run test:e2e`** to verify end-to-end flows

## Tips for Success

- Start with unit tests for isolated components and utilities
- Use component tests for integration of related components
- Use E2E tests for critical user journeys
- Aim for tests that document expected behavior
- Keep tests maintainable by avoiding brittle selectors
- Run tests frequently during development with watch mode

## Resources for Learning

- **Test-driven development (TDD)**: Write tests before implementation
- **Arrange-Act-Assert (AAA)**: Structure your tests clearly
- **Accessibility-first testing**: Query by roles to ensure accessible components
- **User-centric testing**: Test what users see and do, not implementation details
