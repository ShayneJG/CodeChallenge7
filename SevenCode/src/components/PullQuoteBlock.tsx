import { PullQuoteBlockProps } from "../types/types";

export default function PullQuoteBlock({
  data,
}: {
  data: PullQuoteBlockProps;
}) {
  return (
    <div>
      <div />
      <div>
        <p>{data.text}</p>
        <p>{data.attribution}</p>
      </div>
    </div>
  );
}
