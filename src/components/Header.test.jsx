import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "./Header";
import { useCart } from "../context/CartContext";

vi.mock("../context/CartContext");

describe("Header", () => {
  test("shows the total quanitity of items in the cart", () => {
    useCart.mockReturnValue({
      items: [
        { product: { id: 1 }, quantity: 2 },
        { product: { id: 2 }, quantity: 1 },
      ],
    });

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    expect(screen.getByText("Cart (3)")).toBeInTheDocument();
  });

  test("shows cart (0) when the cart is empty", () => {
    useCart.mockReturnValue({ items: [] });

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    expect(screen.getByText("Cart (0)")).toBeInTheDocument();
  });
});
