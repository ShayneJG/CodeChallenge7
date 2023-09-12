import { useEffect, useState } from "react";
import "./App.css";
import ArticleType from "./types/types";

function Article() {
  const [articleData, setArticleData] = useState<ArticleType | null>(null);
  useEffect(() => {
    //fetching to mimic an API call
    fetch("/testData/article.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setArticleData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return <p>test</p>;
}

export default Article;
