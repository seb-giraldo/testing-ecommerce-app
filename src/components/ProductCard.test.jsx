import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductCard from "./ProductCard";

describe("ProductCard", () => {
  test("renders the product name and price", () => {
    const product = {
      id: 1,
      name: "Coffee Mug",
      price: 12,
      description: "A mug",
      emoji: "☕",
    };

    render(<ProductCard product={product} onAddToCart={() => {}} />);

    expect(screen.getByText("Coffee Mug")).toBeInTheDocument();
    expect(screen.getByText("$12.00")).toBeInTheDocument();
  });

  test("calls onAddToCart with the product when clicked", async () => {
    const product = {
      id: 1,
      name: "Coffee Mug",
      price: 12,
      description: "A mug",
      emoji: "☕",
    };
    const onAddToCart = vi.fn();

    render(<ProductCard product={product} onAddToCart={onAddToCart} />);

    const button = screen.getByRole("button", {
      name: /add coffee mug to cart/i,
    });

    await userEvent.click(button);

    expect(onAddToCart).toHaveBeenCalledWith(product);
  });
});
