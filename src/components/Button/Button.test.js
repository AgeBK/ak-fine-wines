import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from ".";

describe("Button", () => {
  it("renders Button component", () => {
    const handleClick = jest.fn();
    render(
      <Button css="btn" onClick={handleClick}>
        Test text
      </Button>
    );
    const btn = screen.getByRole("button");
    expect(btn).toBeInTheDocument();
    expect(btn).not.toBeDisabled();
    expect(btn).toHaveTextContent("Test text");
    expect(btn).toHaveClass("btn");
    userEvent.click(btn);
    expect(handleClick).toHaveBeenCalled();
  });
});
