import { render, screen, act } from "@testing-library/react";
import { mockFetch, mockFetchError } from "../../mocks/mockData";
import { ComputerProvider } from "../../context";
import { BrowserRouter as Router } from "react-router-dom";
import Home from ".";

describe("Home", () => {
  it("renders Home component and related items", async () => {
    global.fetch = mockFetch;
    render(
      <ComputerProvider>
        <Router>
          <Home />
        </Router>
      </ComputerProvider>
    );

    const headingElement = await screen.findByText(
      /All of your computer needs at the best prices guaranteed!!/i
    );
    const lapTopElement = await screen.findByText(/Laptops/i);
    const homePageHeadings = screen.getAllByRole("heading");
    const homePageImages = screen.getAllByRole("img");
    const homePageLinks = screen.getAllByRole("link");
    act(() => {
      expect(headingElement).toBeInTheDocument();
      expect(lapTopElement).toBeInTheDocument();
      expect(homePageHeadings).toHaveLength(22);
      expect(homePageImages).toHaveLength(21);
      expect(homePageLinks).toHaveLength(21);
    });
    global.fetch.mockClear();
    delete global.fetch;
  });

  it("renders Error component", async () => {
    global.fetch = mockFetchError;
    render(
      <ComputerProvider>
        <Router>
          <Home />
        </Router>
      </ComputerProvider>
    );

    const headingElement = await act(() => screen.findByText(/Whoops!!/i));
    const homePageImage = screen.getByRole("img");
    act(() => {
      expect(headingElement).toBeInTheDocument();
      expect(homePageImage).toHaveClass("error");
    });
    global.fetch.mockClear();
    delete global.fetch;
  });
});
