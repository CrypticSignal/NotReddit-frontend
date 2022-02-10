import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleComments, getSingleArticle } from "../apiRequests";

// topics/coding

const SingleArticle = () => {
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);
  const { articleID } = useParams();

  useEffect(async () => {
    const singleArticle = await getSingleArticle(articleID);
    const comments = await getArticleComments(articleID);
    setComments(comments);
    setArticle(singleArticle);
  }, [articleID]);

  return (
    <div>
      <div id="articleSubheading">
        <h3>{article.title}</h3>
        <br />
        <i>
          By {article.author} at {new Date(article.created_at).toLocaleString()}
        </i>
      </div>
      <hr />
      <p>{article.body}</p>

      <hr />
      <h4>Comments:</h4>
      {comments.map((comment) => (
        <div className="card-body card m-2" key={comment.comment_id}>
          <div id="topOfCard">
            <strong className="cardAuthor">{comment.author}</strong>
            <p id="cardVotes">Votes: {comment.votes}</p>
          </div>
          <hr />
          <i id="cardBody">{comment.body}</i>
          <div id="bottomOfCard">
            <i className="createdAt">{new Date(comment.created_at).toLocaleString()}</i>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SingleArticle;
