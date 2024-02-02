import {
  render,
  screen,
  act,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import {
  mockFetch,
  mockFetchError,
  mockFetchPending,
} from "../../mocks/mockData";
import { BrowserRouter as Router } from "react-router-dom";
import { ComputerProvider } from "../../context";
import Content from ".";

describe("Content", () => {
  it("renders Loading Component", async () => {
    global.fetch = mockFetchPending;
    render(
      <ComputerProvider>
        <Content />
      </ComputerProvider>
    );
    const loadingElement = await screen.findByTestId("loading");
    expect(loadingElement).toBeInTheDocument();
    global.fetch.mockClear();
    delete global.fetch;
  });

  it("renders Error component", async () => {
    global.fetch = mockFetchError;
    render(
      <ComputerProvider>
        <Router>
          <Content />
        </Router>
      </ComputerProvider>
    );

    await waitForElementToBeRemoved(() => screen.getByTestId(/loading/i));
    const headingError = await act(() => screen.findByText(/Whoops!!/i));
    const errorImage = screen.getByRole("img");
    expect(headingError).toBeInTheDocument();
    expect(errorImage).toHaveClass("error");
    global.fetch.mockClear();
    delete global.fetch;
  });

  it("renders Child component", async () => {
    global.fetch = mockFetch;
    const Child = () => <h1>Child Test</h1>;
    render(
      <ComputerProvider>
        <Router>
          <Content>
            <Child />
          </Content>
        </Router>
      </ComputerProvider>
    );

    await waitForElementToBeRemoved(() => screen.getByTestId(/loading/i));
    const headingElement = await screen.findByRole("heading", { level: 1 });
    expect(headingElement).toHaveTextContent("Child Test");
    global.fetch.mockClear();
    delete global.fetch;
  });
});
