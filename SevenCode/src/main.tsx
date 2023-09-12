import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Article from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Article ArticleLocation={"/testData/article.json"} />
  </React.StrictMode>
);
