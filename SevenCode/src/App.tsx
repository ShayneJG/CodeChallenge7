import { useEffect, useState } from "react";
import "./App.css";
import ArticleType, { HeaderProps } from "./types/types";
import Header from "./components/Header";

//Article is passed the fetch request path.
function Article({ ArticleLocation }: { ArticleLocation: string }) {
  const [articleData, setArticleData] = useState<ArticleType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  //grab data on first render
  useEffect(() => {
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
    fetchData();
  }, []);

  //does not attempt to render if article data did not arrive
  if (error) {
    <div>{error}</div>;
  } else if (loading) {
    return <div>fancy loading effect</div>;
  }

  //article fetched successfully and json is loaded into state.

  if (articleData) {
    //copying article data and passing to header
    const { headline, source, byline, publicationDate } = articleData;
    const headerData: HeaderProps = {
      headline,
      source,
      byline,
      publicationDate,
    };

    return (
      <article>
        <Header headerData={headerData} />
      </article>
    );
  }
}

export default Article;
