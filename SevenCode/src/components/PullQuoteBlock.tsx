import { PullQuoteBlockProps } from "../types/types";
import styles from "../styles/pullQuoteBlock.module.css";
export default function PullQuoteBlock({
  data,
}: {
  data: PullQuoteBlockProps;
}) {
  return (
    <div className={styles.pullQuoteBlock}>
      <p className={styles.text}>{data.text}</p>
      <p>{data.attribution}</p>
    </div>
  );
}
