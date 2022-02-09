import { useEffect, useState } from "react";
import SingleArticle from "./SingleArticle";
import { getArticles, getSingleArticle } from "../apiRequests";
import { Link, useParams } from "react-router-dom";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const params = useParams();

  let topic;

  if (Object.keys(params).length === 0) {
    topic = "all";
  } else {
    topic = params.topic;
  }

  useEffect(() => {
    async function fetchArticles() {
      const articles = await getArticles(topic);
      setArticles(articles);
    }
    if (topic) {
      fetchArticles();
    }
  }, [topic]);

  return (
    <div id="articles-div">
      {articles.map((article) => (
        <div className="card-body card m-2" key={article.article_id}>
          <div id="topOfCard">
            <p id="cardVotes">Votes: {article.votes}</p>
            <p id="cardAuthor">{article.author}</p>
          </div>
          <Link to={`/article/${article.article_id}`} id="cardTitle">
            {article.title}
          </Link>
          <p id="cardBody">{article.body.substring(0, 200)}...</p>
          <div id="bottomOfCard">
            <p id="cardComments">{article.comment_count} comments</p>
            <i className="createdAt">{article.created_at}</i>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Articles;
