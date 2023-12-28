import { render, screen, act } from "@testing-library/react";
import { mockFetch, mockFetchError } from "../../mocks/mockData";
import { ComputerProvider } from "../../context";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Product from ".";

describe("Product", () => {
  global.fetch = mockFetch;

  render(
    <ComputerProvider>
      <MemoryRouter initialEntries={[`/laptops/HT-1000`]}>
        <Routes>
          <Route exact path="/:id/:id" element={<Product />} />
        </Routes>
      </MemoryRouter>
    </ComputerProvider>
  );

  it("renders Product component with expected laptop items", async () => {
    const mainCategory = await screen.findByText(/Computer Systems/i);
    const category = await screen.findByRole("link", { name: "Laptops" });
    const price = await screen.findByText(/956/i);
    const sale = await screen.findByText(/15% OFF/i);
    const headingElement = await screen.findByRole("heading", { level: 1 });
    const addToCartBtn = await screen.findByRole("button");
    const ProductPageHeadings = screen.getAllByRole("heading");
    const ProductPageImages = screen.getAllByRole("img");

    expect(mainCategory).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(price).toBeInTheDocument();
    expect(sale).toBeInTheDocument();
    expect(headingElement).toHaveTextContent("Notebook Basic 15");
    expect(ProductPageHeadings[0]).toHaveTextContent("Notebook Basic 15");
    expect(addToCartBtn).toHaveTextContent("Add to cart");
    expect(ProductPageImages).toHaveLength(3);
  });

  it("renders Error component", async () => {
    global.fetch = mockFetchError;
    render(
      <ComputerProvider>
        <MemoryRouter initialEntries={[`/laptops/HT-1000`]}>
          <Routes>
            <Route exact path="/:id/:id" element={<Product />} />
          </Routes>
        </MemoryRouter>
      </ComputerProvider>
    );

    const headingElement = await act(() => screen.findByText(/Whoops!!/i));
    const ProductPageImage = screen.getByRole("img");
    act(() => {
      expect(headingElement).toBeInTheDocument();
      expect(ProductPageImage).toHaveClass("error");
    });
    global.fetch.mockClear();
    delete global.fetch;
  });
});
