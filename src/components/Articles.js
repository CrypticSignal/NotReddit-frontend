import { useEffect, useState } from "react";
import { getArticles, updateArticleVotes } from "../apiRequests";
import { Link, useParams } from "react-router-dom";
import { capitaliseFirstChar } from "../utils";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [articleVoteInfo, setArticleVoteInfo] = useState({});
  const [sortMethod, setSortMethod] = useState("created_at");

  const params = useParams();

  let topic;

  if (Object.keys(params).length === 0) {
    topic = "all";
  } else {
    topic = params.topic;
  }

  const handleUpvote = (articleID) => {
    const originalNumVotes = articleVoteInfo[articleID][0];
    if (articleVoteInfo[articleID][1]) return;
    const newObject = { ...articleVoteInfo };
    newObject[articleID] = [originalNumVotes, true, false, originalNumVotes + 1];
    setArticleVoteInfo(newObject);
    const delta = articleVoteInfo[articleID][3] < originalNumVotes ? 2 : 1;
    updateArticleVotes(articleID, delta);
  };

  const handleDownvote = (articleID) => {
    const originalNumVotes = articleVoteInfo[articleID][0];
    if (articleVoteInfo[articleID][2]) return;
    const newObject = { ...articleVoteInfo };
    newObject[articleID] = [originalNumVotes, false, true, originalNumVotes - 1];
    setArticleVoteInfo(newObject);
    const delta = articleVoteInfo[articleID][3] > originalNumVotes ? -2 : -1;
    updateArticleVotes(articleID, delta);
  };

  useEffect(() => {
    const articleIDTOVoteInfo = {};
    async function fetchArticles() {
      const articles = await getArticles(topic, sortMethod);
      articles.forEach((article) => {
        // Value is in the format:
        // Original num of votes, upvoted?, downvoted? new number of votes
        articleIDTOVoteInfo[article.article_id] = [article.votes, false, false, article.votes];
      });
      setArticleVoteInfo(articleIDTOVoteInfo);
      setArticles(articles);
    }
    if (topic) {
      fetchArticles();
    }
  }, [topic, sortMethod]);

  const handleSortMethodChange = (e) => setSortMethod(e.target.value);

  return (
    <div>
      {Object.keys(articleVoteInfo).length > 0 ? (
        <div id="articles-div">
          <h3>{capitaliseFirstChar(topic)} Articles</h3>

          <div id="sortMethodDiv">
            <label htmlFor="sortMethodDropdown">Sort By: </label>
            <select onChange={handleSortMethodChange} id="sortMethodDropdown">
              <option value="created_at">Date Posted</option>
              <option value="comment_count">Number of Comments</option>
              <option value="votes">Votes</option>
            </select>
          </div>

          {articles.map((article) => (
            <div className="card-body card mb-2 mt-2" key={article.article_id}>
              <div id="topOfCard">
                <div id="voteDiv">
                  <i
                    className="chevron up icon"
                    onClick={() => handleUpvote(article.article_id)}
                  ></i>
                  <i
                    className="chevron down icon"
                    onClick={() => handleDownvote(article.article_id)}
                  ></i>
                  <p id="cardVotes">
                    Votes:{" "}
                    {articleVoteInfo[article.article_id]
                      ? articleVoteInfo[article.article_id][3]
                      : article.votes}
                  </p>
                </div>

                <strong className="cardAuthor">{article.author}</strong>
              </div>
              <Link to={`/article/${article.article_id}`} id="cardTitle">
                {article.title}
              </Link>
              <p id="cardBody">{article.body.substring(0, 200)}...</p>
              <div id="bottomOfCard">
                <p id="cardComments">{article.comment_count} comments</p>
                <i className="createdAt">{new Date(article.created_at).toLocaleString()}</i>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Articles;
