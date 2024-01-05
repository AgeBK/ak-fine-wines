import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mockFetch } from "../../mocks/mockData";
import { ComputerProvider } from "../../context";
import AddToCart from "../AddToCart";
import CartOpen from ".";

describe("CartOpen", () => {
  it("renders CartOpen Component with test product", async () => {
    global.fetch = mockFetch;
    render(
      <ComputerProvider>
        <AddToCart productId={1} productName="testProduct" price={1.99} />
        <CartOpen />
      </ComputerProvider>
    );
    // Add test product to cart
    const addToCartBtn = await screen.findByRole("button");
    act(() => userEvent.click(addToCartBtn));

    const headingElement = await act(() =>
      screen.findByRole("heading", { level: 3 })
    );
    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toHaveTextContent("testProduct");
    expect(
      screen.getByText((_, element) => element.textContent === "Quantity: 1")
    ).toBeInTheDocument();
    const priceDisplayCount = screen.getByText(/1.99/i);
    expect(priceDisplayCount).toBeInTheDocument();

    global.fetch.mockClear();
    delete global.fetch;
  });
});
