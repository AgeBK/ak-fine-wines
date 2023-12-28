import { render, screen, act } from "@testing-library/react";
import { mockFetch } from "../../mocks/mockData";
import { ComputerProvider } from "../../context";
import { BrowserRouter as Router } from "react-router-dom";
import AddToCart from ".";

describe("AddToCart", () => {
  it("renders AddToCart component", async () => {
    global.fetch = mockFetch;
    render(
      <ComputerProvider>
        <Router>
          <AddToCart productId="1" productName="Test product" price="1.00" />
        </Router>
      </ComputerProvider>
    );
    const addToCartBtn = await act(() => screen.findByRole("button"));
    expect(addToCartBtn).toBeInTheDocument();
    expect(addToCartBtn).toHaveTextContent("Add to cart");
  });
});
