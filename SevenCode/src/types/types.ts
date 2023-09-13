export interface ArticleProps {
  headline: string;
  source: string;
  byline: string;
  publicationDate: string;
  blocks: Array<TextBlockProps | ImageBlockProps | PullQuoteBlockProps>;
}
//ArticleProps could inherit HeaderProps to avoid repitition, but this feels more compositionally correct.
export interface HeaderProps {
  headline: string;
  source: string;
  byline: string;
  publicationDate: string;
}

export interface TextBlockProps {
  kind: "text";
  text: string;
  intentions: [] | Intentions[];
}

export interface ImageBlockProps {
  kind: "image";
  captionText: string;
  url: string;
}

export interface PullQuoteBlockProps {
  kind: "pull-quote";
  text: string;
  attribution: string;
}

export interface Intentions {
  kind: "emphasized" | "important";
  index: number;
  length: number;
}
