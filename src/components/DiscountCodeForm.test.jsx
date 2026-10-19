import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DiscountCodeForm from "./DiscountCodeForm";

describe("DiscountCodeForm", () => {
  test("calls onApply with the code the user typed in", async () => {
    const onApply = vi.fn();

    render(<DiscountCodeForm onApply={onApply} error="" appliedCode="" />);

    const input = screen.getByLabelText("Discount code");
    await userEvent.type(input, "SAVE10");

    const button = screen.getByRole("button", { name: "Apply" });
    await userEvent.click(button);

    expect(onApply).toHaveBeenCalledWith("SAVE10");
  });

  test("shows an error message when the error prop is set", () => {
    render(
      <DiscountCodeForm
        onApply={() => {}}
        error="That discount code is not valid."
        appliedCode=""
      />,
    );

    expect(screen.getByRole("alert")).toHaveTextContent(
      "That discount code is not valid.",
    );
  });

  test("Shows a success message when a code has been applied", () => {
    render(
      <DiscountCodeForm onApply={() => {}} error="" appliedCode="SAVE10" />,
    );

    expect(screen.getByRole("status")).toHaveTextContent(
      "Code SAVE10 applied!",
    );
  });
});
