import { ImageBlockProps } from "../types/types";
import styles from "../styles/imageBlock.module.css";
export default function ImageBlock({ data }: { data: ImageBlockProps }) {
  return (
    <figure>
      <img className={styles.image} src={data.url} alt="image failed to load" />
      {data.captionText && (
        <figcaption className={styles.caption}>{data.captionText}</figcaption>
      )}
    </figure>
  );
}
