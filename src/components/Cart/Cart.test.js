import { render, screen, act } from "@testing-library/react";
import { mockFetchPending } from "../../mocks/mockData";
import { ComputerProvider } from "../../context";
import Cart from ".";
import AddToCart from "../AddToCart";
import userEvent from "@testing-library/user-event";

describe("Cart", () => {
  global.fetch = mockFetchPending;

  it("renders Cart Component, initial state, empty", async () => {
    render(
      <ComputerProvider>
        <Cart />
      </ComputerProvider>
    );
    const cartEmptyImg = await screen.findByRole("img");
    const cartItemCount = await screen.findByText(/0/i);
    expect(cartEmptyImg).toHaveClass("cart");
    expect(cartEmptyImg).toHaveAttribute("src", "/src/img/cartEmpty.png");
    expect(cartItemCount).toBeInTheDocument();
  });

  it("renders Cart Component with 1 product passed from AddToCart component", async () => {
    render(
      <ComputerProvider>
        <AddToCart productId={1} productName="testProduct" price={1.99} />
        <Cart />
      </ComputerProvider>
    );
    // Add test product to cart
    const addToCartBtn = await screen.findByRole("button");
    act(() => userEvent.click(addToCartBtn));

    // CART CLOSED: check to see cart amount is updated and the cart image has changed to not empty version
    const cartNotEmptyImg = await screen.findByRole("img");
    const cartItemCount = await screen.findByText(/1/i);
    expect(cartNotEmptyImg).toHaveClass("cart");
    expect(cartNotEmptyImg).toHaveAttribute("src", "/src/img/cartNotEmpty.png");
    expect(cartItemCount).toBeInTheDocument();

    // CART OPEN: hover cart to open and check cart details
    act(() => userEvent.hover(cartNotEmptyImg));
    const headingElement = await screen.findByRole("heading", { level: 3 });
    const updateCartBtns = await screen.findAllByRole("button");
    expect(headingElement).toHaveTextContent("testProduct");
    expect(updateCartBtns).toHaveLength(4); // including the addToCart component
    expect(
      screen.getByText((_, element) => element.textContent === "Quantity: 1")
    ).toBeInTheDocument();
    expect(
      screen.getByText((_, element) => element.textContent === "Total Items: 1")
    ).toBeInTheDocument();
    const priceDisplayCount = await screen.findAllByText(/1.99/i);
    expect(priceDisplayCount.length).toBe(2);
  });

  it("renders Cart Component with 2 product passed from AddToCart component", async () => {
    render(
      <ComputerProvider>
        <AddToCart productId={1} productName="testProduct" price={1.99} />
        <Cart />
      </ComputerProvider>
    );
    // Add test product to cart
    const addToCartBtn = await screen.findByRole("button");
    act(() => {
      userEvent.click(addToCartBtn);
    });
    act(() => {
      userEvent.click(addToCartBtn);
    });

    // CART CLOSED: check to see cart amount is updated and the cart image has changed to not empty version
    const cartNotEmptyImg = await screen.findByRole("img");
    const cartItemCount = await screen.findByText(/2/i);
    expect(cartNotEmptyImg).toHaveClass("cart");
    expect(cartNotEmptyImg).toHaveAttribute("src", "/src/img/cartNotEmpty.png");
    expect(cartItemCount).toBeInTheDocument();

    // CART OPEN: hover cart to open and check cart details
    act(() => {
      userEvent.hover(cartNotEmptyImg);
    });
    const headingElement = await screen.findByRole("heading", { level: 3 });
    const updateCartBtns = await screen.findAllByRole("button");
    expect(headingElement).toHaveTextContent("testProduct");
    expect(updateCartBtns).toHaveLength(4); // including the addToCart component
    expect(
      screen.getByText((_, element) => element.textContent === "Quantity: 2")
    ).toBeInTheDocument();
    expect(
      screen.getByText((_, element) => element.textContent === "Total Items: 2")
    ).toBeInTheDocument();
    const priceDisplayCount = await screen.findAllByText(/1.99/i);
    const totalPriceDisplayCount = await screen.findAllByText(/3.98/i);
    expect(priceDisplayCount.length).toBe(1);
    expect(totalPriceDisplayCount.length).toBe(1);
  });

  it("renders Cart Component can add/delete/remove when open", async () => {
    render(
      <ComputerProvider>
        <AddToCart productId={1} productName="testProduct" price={1.99} />
        <Cart />
      </ComputerProvider>
    );
    // Add test product to cart
    const addToCartBtn = await screen.findByRole("button");
    act(() => {
      userEvent.click(addToCartBtn);
    });

    // CART OPEN: hover cart to open and check cart details
    const cartNotEmptyImg = await screen.findByRole("img");
    expect(cartNotEmptyImg).toHaveAttribute("src", "/src/img/cartNotEmpty.png");
    act(() => {
      userEvent.hover(cartNotEmptyImg);
    });
    // Find +, - and remove buttons to test
    const addBtn = await screen.findByRole("button", { name: "+" });
    const minusBtn = await screen.findByRole("button", { name: "-" });
    const removeBtn = await screen.findByRole("button", { name: "Remove" });

    act(() => {
      userEvent.click(addBtn);
    });
    act(() => {
      userEvent.click(addBtn);
    });

    expect(
      screen.getByText((_, element) => element.textContent === "Quantity: 3")
    ).toBeInTheDocument();
    act(() => {
      userEvent.click(minusBtn);
    });
    expect(
      screen.getByText((_, element) => element.textContent === "Quantity: 2")
    ).toBeInTheDocument();
    act(() => {
      userEvent.click(removeBtn);
    });

    // CART CLOSED: no items so cart is closed, cart empty image displayed with 0 items
    const cartEmptyImg = await screen.findByRole("img");
    expect(cartEmptyImg).toHaveAttribute("src", "/src/img/cartEmpty.png");
    const cartItemCount = await screen.findByText(/0/i);
    expect(cartItemCount).toBeInTheDocument();
  });
});
