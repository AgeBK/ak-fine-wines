import { render, screen } from "@testing-library/react";
import Footer from ".";

describe("Footer", () => {
  it("renders Footer component and related items", () => {
    const yr = new Date().getFullYear();
    render(<Footer />);
    const footerText = screen.getByText(
      `© ${yr} AK Fine Wines All rights reserved`
    );
    const imgElement = screen.getAllByRole("img");
    expect(imgElement).toHaveLength(7);
    expect(footerText).toBeInTheDocument();
  });
});
