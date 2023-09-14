import { formatText } from "../components/TextBlock";
import { Intentions } from "../types/types";
import React from "react";
describe("formatText", () => {
  it("should format the text with valid intentions correctly", () => {
    const text: string =
      "This is test text. I should be bold. I should be italic.";

    const intentions: Intentions[] = [
      {
        kind: "emphasized",

        index: 37,
        length: 18,
      },
      {
        kind: "important",
        index: 19,
        length: 16,
      },
    ];

    const formatted = formatText(text, intentions);

    const expected = <React.Fragment></React.Fragment>;

    expect(formatted).toBe(expected);
  });
});
