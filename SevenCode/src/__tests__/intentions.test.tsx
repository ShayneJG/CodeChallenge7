import { Fragment } from "react";
import { formatText } from "../components/TextBlock";
import { Intentions } from "../types/types";

describe("formatText", () => {
  it("should format the text with valid intentions correctly", () => {
    const text: string =
      "This is test text. I should be bold. I should be italic.";

    const intentions: Intentions[] = [
      {
        kind: "emphasized",

        index: 37,
        length: 19,
      },
      {
        kind: "important",
        index: 19,
        length: 17,
      },
    ];

    const formatted: JSX.Element[] = formatText(text, intentions);

    //assertions
    expect(formatted).toHaveLength(4);

    //check specifics
    expect(formatted[0].type).toBe(Fragment);
    expect(formatted[0].props.children).toBe("This is test text. ");

    expect(formatted[1].props.children).toStrictEqual(
      <strong>I should be bold.</strong>
    );

    expect(formatted[2].props.children).toStrictEqual(" ");

    expect(formatted[3].props.children).toStrictEqual(
      <em>I should be italic.</em>
    );
  });

  it("should not attempt to format intentions with out of bounds indexes", () => {
    const text: string =
      "This should NOT be bold. This SHOULD be italic. This should be untouched. ";

    const intentions: Intentions[] = [
      {
        kind: "important",

        index: -2,
        length: 19,
      },
      {
        kind: "emphasized",
        index: 25,
        length: 22,
      },
      {
        kind: "emphasized",
        index: 300,
        length: 17,
      },
    ];

    const formatted: JSX.Element[] = formatText(text, intentions);

    expect(formatted[0].type).toBe(Fragment);
    expect(formatted[0].props.children).toBe("This should NOT be bold. ");

    expect(formatted[1].props.children).toStrictEqual(
      <em>This SHOULD be italic.</em>
    );

    expect(formatted[2].props.children).toBe(" This should be untouched. ");
  });

  it("should not format an intention if it begins partway through the previous intention", () => {
    const text: string = "This should be bold. This should not be touched. ";

    const intentions: Intentions[] = [
      {
        kind: "important",

        index: 0,
        length: 20,
      },
      {
        kind: "emphasized",
        index: 10,
        length: 10,
      },
    ];

    const formatted: JSX.Element[] = formatText(text, intentions);

    expect(formatted[0].props.children).toStrictEqual(
      <strong>This should be bold.</strong>
    );
    expect(formatted[1].props.children).toStrictEqual(
      " This should not be touched. "
    );
  });

  it("should return unformatted text if kind is not found", () => {
    const text: string = "This should not be a URL. This should be fine. ";

    const intentions: any = [
      {
        kind: "URL",

        index: 0,
        length: 25,
      },
    ];

    const formatted: JSX.Element[] = formatText(text, intentions);

    expect(formatted[0].type).toBe(Fragment);
    expect(formatted.length).toBe(2);

    expect(formatted[0].props.children).toStrictEqual(
      <>This should not be a URL.</>
    );
    expect(formatted[1].props.children).toBe(" This should be fine. ");
  });
  it("should return unformatted text if no intentions were found", () => {
    const text: string = "This should come back fine";

    const intentions: any = [];

    const formatted: JSX.Element[] = formatText(text, intentions);

    expect(formatted[0]).toStrictEqual(<>{text}</>);
  });
});
