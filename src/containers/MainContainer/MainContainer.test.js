import { render, screen } from "@testing-library/react";
import { ComputerProvider } from "../../context";
import { BrowserRouter as Router } from "react-router-dom";
import { mockFetch } from "../../mocks/mockData";
import MainContainer from ".";

describe("MainContainer", () => {
  it("renders MainContainer component and child item", async () => {
    global.fetch = mockFetch;
    const Child = () => <h1>Child test</h1>;
    render(
      <ComputerProvider>
        <Router>
          <MainContainer>
            <Child />
          </MainContainer>
        </Router>
      </ComputerProvider>
    );
    const headingElement = await screen.findByText(/Child test/i);
    expect(headingElement).toBeInTheDocument();
  });
});
