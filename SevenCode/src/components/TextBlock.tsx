import React from "react";
import { Intentions, TextBlockProps } from "../types/types";

//Applies intentions to the text.
export function formatText(text: string, intentions: Intentions[]) {
  let error: boolean = false;

  if (!intentions || intentions.length === 0) {
    return <>{text}</>;
  }

  //sorts the array to ensure that intentions are mapped in the appropriate order
  intentions.sort((a, b) => {
    return a.index - b.index;
  });

  //currentIndex is used to move through the text and is used to identify the text between intentions.
  let currentIndex: number = 0;

  const formattedText: JSX.Element[] = [];

  //assumptions: Kinds do not overlap, a kind that is emphasized AND important would be its own kind.
  intentions.forEach((intention, index) => {
    const { kind, index: startIndex, length } = intention;

    //validate that intentions start in the lower bounds of the text
    if (startIndex < 0) {
      console.error(`intention ${startIndex}, ${length} cannot start below 0.`);
      error = true;
      //validate that intentions do not overlap
    } else if (currentIndex > startIndex) {
      console.error(
        `intention ${startIndex}, ${length} cannot overlap another intention.`
      );
      error = true;
      //validate that intention does not run over length of the text.
    } else if (startIndex + length > text.length) {
      console.error(
        `intention ${startIndex}, ${length} exceeded the length of the text.`
      );
      error = true;
      //if everything is fine, proceed with the formatting
    } else {
      const beforeText = text.slice(currentIndex, startIndex);

      if (beforeText) {
        formattedText.push(
          <React.Fragment key={`before-${index}`}>{beforeText}</React.Fragment>
        );
      }

      //add new kind handling here.
      //TODO: handle nested intention?
      switch (kind) {
        case "emphasized": {
          formattedText.push(
            <React.Fragment key={index}>
              <em>{text.slice(startIndex, startIndex + length)}</em>
            </React.Fragment>
          );
          break;
        }
        case "important": {
          formattedText.push(
            <React.Fragment key={index}>
              <strong>{text.slice(startIndex, startIndex + length)}</strong>
            </React.Fragment>
          );
          break;
        }
        default: {
          formattedText.push(
            <React.Fragment key={index}>
              {text.slice(startIndex, startIndex + length)}
            </React.Fragment>
          );

          console.error(
            `intention ${index} not applied to: ${text.slice(
              startIndex,
              startIndex + length
            )}; kind not found.`
          );
        }
      }
    }

    // Update the current index
    currentIndex = startIndex + length;
  });
  //end of forEach.

  //if intentions have caused errors at any point, avoid rendering any formatting for this block.
  //doing this to avoid partially formatted / broken looking text.
  if (error) {
    return <>{text}</>;
  }
  // Add any remaining text after the last intention
  const remainingText = text.slice(currentIndex);
  if (remainingText) {
    formattedText.push(
      <React.Fragment key={`after-${intentions.length}`}>
        {remainingText}
      </React.Fragment>
    );
  }

  return formattedText;
}

//textblock component

export default function TextBlock({ data }: { data: TextBlockProps }) {
  if (!data.text) {
    console.error(`TextBlock is missing a text property`);
    return <></>;
  }
  const formattedText = formatText(data.text, data.intentions);
  return <p>{formattedText}</p>;
}
