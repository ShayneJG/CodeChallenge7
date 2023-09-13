import { useEffect, useState } from "react";
import "./App.css";
import { ArticleProps, HeaderProps } from "./types/types";
import Header from "./components/Header";
import TextBlock from "./components/TextBlock";
import ImageBlock from "./components/ImageBlock";
import PullQuoteBlock from "./components/PullQuoteBlock";

//Article is passed the fetch request path.
function Article({ ArticleLocation }: { ArticleLocation: string }) {
  const [articleData, setArticleData] = useState<ArticleProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchData() {
    try {
      const response = await fetch(ArticleLocation);
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.status}`);
      }
      const data = await response.json();
      setArticleData(data);
    } catch (error) {
      console.error(error);
      setError("Article failed to load...");
    } finally {
      setLoading(false);
    }
  }
  //grab data on first render
  //TODO: make this an anonymous async?
  useEffect(() => {
    fetchData();
  }, []);

  if (error) {
    //does not attempt to render if article data did not arrive.
    return <div>{error}</div>;
  } else if (loading) {
    //handle loading time between page render and api call.
    return <div>fancy loading effect</div>;
  } else if (articleData) {
    //article fetched successfully and json is loaded into state.

    //copying article data and passing to header
    const { headline, source, byline, publicationDate } = articleData;
    const headerData: HeaderProps = {
      headline,
      source,
      byline,
      publicationDate,
    };

    //map the blocks to render the correct components based on kind.
    //with the error handling, i'm assuming its best to not render incomplete data.
    const blocks = articleData.blocks.map((block, index) => {
      const key: string = `${block.kind} ${index}`;
      switch (block.kind) {
        case "text": {
          if (!block.text) {
            console.error(`${key} is missing a text property`);
            break;
          } else {
            return <TextBlock key={key} data={block} />;
          }
        }
        case "image": {
          if (!block.url) {
            console.error(`${key} is missing an image source`);
            break;
          } else if (!block.captionText) {
            console.error(`${key} is missing a caption`);
            break;
          } else {
            return <ImageBlock key={key} data={block} />;
          }
        }
        case "pull-quote": {
          if (!block.text) {
            console.error(`${key} is missing text`);
            break;
          } else if (!block.attribution) {
            console.error(`${key} is missing an attribution`);
            break;
          } else {
            return <PullQuoteBlock key={key} data={block} />;
          }
        }
        //handle basic errors
        default: {
          console.error(`Block kind missing or broken for: ${block}`);
        }
      }
    });
    return (
      <article>
        <Header headerData={headerData} />
        {blocks}
      </article>
    );
  }
}

export default Article;
