import { PullQuoteBlockProps } from "../types/types";
import styles from "../styles/pullQuoteBlock.module.css";
export default function PullQuoteBlock({
  data,
}: {
  data: PullQuoteBlockProps;
}) {
  if (!data.text) {
    console.error(`PullQuoteBlock is missing text`);
    return <></>;
  } else if (!data.attribution) {
    console.error(`PullQuoteBlock is missing an attribution`);
    return <></>;
  }

  return (
    <div className={styles.pullQuoteBlock}>
      <p className={styles.text}>{data.text}</p>
      <p className={styles.attribution}>{data.attribution}</p>
    </div>
  );
}
