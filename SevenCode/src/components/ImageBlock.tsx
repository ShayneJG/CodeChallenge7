import { ImageBlockProps } from "../types/types";
import styles from "../styles/imageBlock.module.css";
export default function ImageBlock({ data }: { data: ImageBlockProps }) {
  if (!data.url) {
    console.error(`ImageBlock is missing an image source`);
    return <></>;
  } else if (!data.captionText) {
    console.error(`ImageBlock is missing a caption`);
    return <></>;
  }
  return (
    <figure>
      <img className={styles.image} src={data.url} alt="image failed to load" />
      {data.captionText && (
        <figcaption className={styles.caption}>{data.captionText}</figcaption>
      )}
    </figure>
  );
}
