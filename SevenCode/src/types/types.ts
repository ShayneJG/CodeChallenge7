export default interface ArticleType {
  headline: string;
  source: string;
  byline: string;
  publicationDate: string;
  blocks: Array<TextBlock | ImageBlock | PullQuoteBlock>;
}

export interface TextBlock {
  kind: "text";
  text: string;
  intentions: [] | Intentions[];
}

export interface ImageBlock {
  kind: "image";
  captionText: string;
  url: string;
}

export interface PullQuoteBlock {
  kind: "pull-quote";
  text: string;
  attribution: string;
}

export interface Intentions {
  kind: "emphasized" | "important";
  index: number;
  length: number;
}
