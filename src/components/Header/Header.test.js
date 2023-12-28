import { render, screen, act } from "@testing-library/react";
import { mockFetch } from "../../mocks/mockData";
import { ComputerProvider } from "../../context";
import { BrowserRouter as Router } from "react-router-dom";
import Header from ".";

describe("Header", () => {
  it("renders Header component and related items", async () => {
    global.fetch = mockFetch;
    render(
      <ComputerProvider>
        <Router>
          <Header />
        </Router>
      </ComputerProvider>
    );

    const headingElement = await act(() =>
      screen.findByRole("heading", { level: 1 })
    );
    const linkElement = await screen.findByRole("link");
    const headingLogoImage = await screen.findByAltText("AK Fine Wines");
    const headingCartImage = await screen.findByAltText("cart");
    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toHaveTextContent("AK FINE WINES");
    expect(linkElement).toBeInTheDocument();
    expect(headingLogoImage).toBeInTheDocument();
    expect(headingCartImage).toBeInTheDocument();
    global.fetch.mockClear();
    delete global.fetch;
  });
});
