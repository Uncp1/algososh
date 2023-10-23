import { fireEvent, render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import { Button } from "./button";

describe("<Button /> is rendered", () => {
  it("with text", () => {
    const mockText = "Click me";
    const button = renderer.create(<Button text={mockText} />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it("without text", () => {
    const button = renderer.create(<Button />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it("with loader", () => {
    const button = renderer.create(<Button isLoader={true} />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it("disabled", () => {
    const button = renderer.create(<Button disabled={true} />).toJSON();
    expect(button).toMatchSnapshot();
  });
});

describe("<Button /> has callback on click", () => {
  it("with text", () => {
    const handleClick = jest.fn();
    render(<Button text="button" onClick={handleClick} />);
    const button = screen.getByText("button");
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
