import renderer from "react-test-renderer";
import { ElementStates } from "../../../types/states";
import { Circle } from "./circle";

describe("<Circle /> is rendered", () => {
  it("with letters", () => {
    const button = renderer.create(<Circle letter="ABC" />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it("without letters", () => {
    const button = renderer.create(<Circle />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it("with head prop", () => {
    const button = renderer.create(<Circle head={"head"} />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it("with react element head prop", () => {
    const button = renderer
      .create(<Circle head={<Circle isSmall={true} />} />)
      .toJSON();
    expect(button).toMatchSnapshot();
  });

  it("with tail prop", () => {
    const button = renderer.create(<Circle tail={"tail"} />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it("with react element tail prop", () => {
    const button = renderer
      .create(<Circle tail={<Circle isSmall={true} />} />)
      .toJSON();
    expect(button).toMatchSnapshot();
  });

  it("with index", () => {
    const button = renderer.create(<Circle index={1} />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it("with props isSmall ===  true", () => {
    const button = renderer.create(<Circle isSmall={true} />).toJSON();
    expect(button).toMatchSnapshot();
  });
  it(`with state ${ElementStates.Default}`, () => {
    const button = renderer
      .create(<Circle state={ElementStates.Default} />)
      .toJSON();
    expect(button).toMatchSnapshot();
  });
  it(`with state ${ElementStates.Changing}`, () => {
    const button = renderer
      .create(<Circle state={ElementStates.Changing} />)
      .toJSON();
    expect(button).toMatchSnapshot();
  });
  it(`with state ${ElementStates.Modified}`, () => {
    const button = renderer
      .create(<Circle state={ElementStates.Modified} />)
      .toJSON();
    expect(button).toMatchSnapshot();
  });
});
