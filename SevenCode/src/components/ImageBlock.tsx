import { ImageBlockProps } from "../types/types";

export default function ImageBlock({ data }: { data: ImageBlockProps }) {
  return (
    <figure>
      <img src={data.url} alt="image failed to load" />
      {data.captionText && <figcaption>{data.captionText}</figcaption>}
    </figure>
  );
}
