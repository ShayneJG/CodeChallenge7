import React from "react";
import { Intentions, TextBlockProps } from "../types/types";

//Applies intentions to the text.
export function formatText(text: string, intentions: Intentions[]) {
  //TODO: comment

  if (!intentions || intentions.length === 0) {
    return [<>{text}</>];
  }

  //sorts the array to ensure that intentions are handled in the appropriate order.
  intentions.sort((a, b) => {
    return a.index - b.index;
  });

  //currentIndex is used to move through the text and is used to identify the text between intentions.
  let currentIndex: number = 0;

  const formattedText: JSX.Element[] = [];

  //assumptions: Kinds do not overlap, a kind that is emphasized AND important would be its own kind.
  intentions.forEach((intention, index) => {
    const { kind, index: startIndex, length } = intention;

    //validate that the starting index of the intentions are inside the text.
    if (startIndex < 0 || startIndex > text.length) {
      console.error(`intention ${startIndex}, ${length} out of bounds.`);
      return;
      //validate that intentions do not overlap
    } else if (currentIndex > startIndex) {
      console.error(
        `intention ${startIndex}, ${length} cannot overlap another intention.`
      );
      return;
      //validate that intention does not run over length of the text.
    } else if (startIndex + length > text.length) {
      console.error(
        `intention ${startIndex}, ${length} exceeded the length of the text.`
      );
      return;
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

      formattedText.push(
        <React.Fragment key={index}>
          {renderIntention(kind, text.slice(startIndex, startIndex + length))}
        </React.Fragment>
      );
    }

    currentIndex = startIndex + length;
  });

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

function renderIntention(kind: string, text: string) {
  switch (kind) {
    case "emphasized": {
      return <em>{text}</em>;
    }
    case "important": {
      return <strong>{text}</strong>;
    }
    default: {
      console.error(`intention kind of type ${kind} not found.`);
      return <>{text}</>;
    }
  }
}

export default function TextBlock({ data }: { data: TextBlockProps }) {
  if (!data.text) {
    console.error(`TextBlock is missing a text property`);
    return <></>;
  }
  const formattedText = formatText(data.text, data.intentions);
  return <p>{formattedText}</p>;
}
