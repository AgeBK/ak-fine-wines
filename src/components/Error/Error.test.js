import { render, screen, act } from "@testing-library/react";
import { mockFetchError } from "../../mocks/mockData";
import { ComputerProvider } from "../../context";
import { BrowserRouter as Router } from "react-router-dom";
import Error from ".";

describe("Error", () => {
  it("renders Error component", async () => {
    global.fetch = mockFetchError;
    render(
      <ComputerProvider>
        <Router>
          <Error />
        </Router>
      </ComputerProvider>
    );

    const headingElement = await act(() =>
      screen.findByRole("heading", { level: 2 })
    );
    const errorPageImage = screen.getByRole("img");
    act(() => {
      expect(headingElement).toBeInTheDocument();
      expect(errorPageImage).toHaveClass("error");
    });
    global.fetch.mockClear();
    delete global.fetch;
  });
});
