import { render, screen } from "@testing-library/react";
import Image from ".";

describe("Image", () => {
  it("renders Image component and related items", () => {
    render(
      <Image image="imageSrc" imageStyle="imageCSS" imageAlt="imageAlt" />
    );
    const image = screen.getByAltText("imageAlt");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/src/img/imageSrc");
    expect(image).toHaveAttribute("class", "imageCSS");
  });
});
