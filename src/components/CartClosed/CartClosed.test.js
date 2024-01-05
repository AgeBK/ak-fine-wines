import { render, screen } from "@testing-library/react";
import CartClosed from ".";

describe("CartClosed", () => {
  it("renders CartClosed Component correctly in its initial empty state)", () => {
    render(<CartClosed totalPrice={0} totalQty={0} />);
    const cartEmptyImg = screen.getByRole("img");
    const cartQty = screen.getByText("0");
    expect(cartEmptyImg).toBeInTheDocument();
    expect(cartEmptyImg).toHaveAttribute("src", "/src/img/cartEmpty.png");
    expect(cartQty).toBeInTheDocument();
  });

  it("renders CartClosed Component correctly with an item)", () => {
    render(<CartClosed totalPrice={1.99} totalQty={1} />);
    const cartNotEmptyImg = screen.getByRole("img");
    const cartQty = screen.getByText("1");
    expect(cartNotEmptyImg).toBeInTheDocument();
    expect(cartNotEmptyImg).toHaveAttribute("src", "/src/img/cartNotEmpty.png");
    expect(cartQty).toBeInTheDocument();
  });
});
