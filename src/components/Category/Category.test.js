import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mockFetch, mockFetchError } from "../../mocks/mockData";
import { ComputerProvider } from "../../context";
import {
  BrowserRouter as Router,
  MemoryRouter,
  Route,
  Routes,
} from "react-router-dom";
import Category from ".";

describe("Category", () => {
  it("renders Category component with expected amount of laptop items", async () => {
    global.fetch = mockFetch;

    render(
      <ComputerProvider>
        <MemoryRouter initialEntries={[`/laptops`]}>
          <Routes>
            <Route exact path="/:id" element={<Category />} />
          </Routes>
        </MemoryRouter>
      </ComputerProvider>
    );
    const headingElement = await screen.findByText(/laptops/i);
    const itemCountElement = await screen.findByText(/(13)/i);
    const select = screen.getByRole("combobox");
    const laptopTitles = screen.getAllByRole("heading");
    const CategoryPageImages = screen.getAllByRole("img");
    const CategoryPageLinks = screen.getAllByRole("link");

    expect(headingElement).toBeInTheDocument();
    expect(itemCountElement).toBeInTheDocument();
    expect(select).toBeInTheDocument();
    expect(laptopTitles[0]).toHaveTextContent("laptops");
    expect(laptopTitles).toHaveLength(14);
    expect(CategoryPageImages).toHaveLength(13);
    expect(CategoryPageLinks).toHaveLength(13);
  });

  it("renders reorders the Category component ", async () => {
    render(
      <ComputerProvider>
        <MemoryRouter initialEntries={[`/laptops`]}>
          <Routes>
            <Route exact path="/:id" element={<Category />} />
          </Routes>
        </MemoryRouter>
      </ComputerProvider>
    );
    // simulate selecting an option and verifying its value
    const select = await screen.findByRole("combobox");
    expect(
      await screen.findByRole("option", { name: "A-Z" })
    ).toBeInTheDocument();
    // sort laptops alphabetically ascending
    act(() => userEvent.selectOptions(select, "A-Z"));
    expect(select).toHaveValue("a-z");
    let laptopTitles = screen.getAllByRole("heading");
    expect(laptopTitles[1]).toHaveTextContent("Astro Laptop 1516");
    expect(laptopTitles[13]).toHaveTextContent("Z-Book 300a");

    // sort laptops by price descending
    act(() => userEvent.selectOptions(select, "$$$"));
    expect(select).toHaveValue("$$$");
    laptopTitles = screen.getAllByRole("heading");
    expect(laptopTitles[1]).toHaveTextContent("Notebook Professional 17");
    expect(laptopTitles[13]).toHaveTextContent("Astro Laptop 1516");

    // sort laptops, sale items first, 6 items total
    act(() => userEvent.selectOptions(select, "Sale"));
    expect(select).toHaveValue("sale");
    const priceDisplayCount = await screen.findAllByText(/% OFF/i);
    expect(priceDisplayCount.length).toBe(6);
    global.fetch.mockClear();
    delete global.fetch;
  });

  it("renders Error component", async () => {
    global.fetch = mockFetchError;
    render(
      <ComputerProvider>
        <Router>
          <Category />
        </Router>
      </ComputerProvider>
    );

    const headingElement = await act(() => screen.findByText(/Whoops!!/i));
    const CategoryPageImage = screen.getByRole("img");
    act(() => {
      expect(headingElement).toBeInTheDocument();
      expect(CategoryPageImage).toHaveClass("error");
    });
    global.fetch.mockClear();
    delete global.fetch;
  });
});
