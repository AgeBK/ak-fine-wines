import { render, screen, act } from "@testing-library/react";
import { laptops } from "../../mocks/mockData";
import Sort from ".";
import userEvent from "@testing-library/user-event";

describe("Sort", () => {
  it("renders the Sort component with 6 options ", () => {
    render(<Sort catArr={laptops} />);

    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toHaveValue("relevance");
    expect(screen.getAllByRole("option").length).toBe(6);
  });

  it("renders Sort component with different values", async () => {
    const setCatArr = jest.fn();
    render(<Sort catArr={laptops} setCatArr={setCatArr} />);

    // initial state
    const select = screen.getByRole("combobox");
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toHaveValue("relevance");

    // sort laptops alphabetically ascending
    expect(screen.getByRole("option", { name: "A-Z" })).toBeInTheDocument();
    act(() => userEvent.selectOptions(select, "A-Z"));
    expect(select).toHaveValue("a-z");

    // sort laptops alphabetically decending
    expect(screen.getByRole("option", { name: "Z-A" })).toBeInTheDocument();
    act(() => userEvent.selectOptions(select, "Z-A"));
    expect(select).toHaveValue("z-a");

    // sort laptops by price ascending
    expect(screen.getByRole("option", { name: "$" })).toBeInTheDocument();
    act(() => userEvent.selectOptions(select, "$"));
    expect(select).toHaveValue("$");

    // sort laptops by price descending
    expect(screen.getByRole("option", { name: "$$$" })).toBeInTheDocument();
    act(() => userEvent.selectOptions(select, "$$$"));
    expect(select).toHaveValue("$$$");

    // sort laptops by sales items first
    expect(screen.getByRole("option", { name: "Sale" })).toBeInTheDocument();
    act(() => userEvent.selectOptions(select, "Sale"));
    expect(select).toHaveValue("sale");
  });
});
