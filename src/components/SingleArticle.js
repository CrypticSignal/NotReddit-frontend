import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleComments, getSingleArticle, submitComment, deleteComment } from "../apiRequests";
import Button from "react-bootstrap/Button";
import { showAlert } from "../utils";

const SingleArticle = (props) => {
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [commentAdded, setCommentAdded] = useState({});
  const [deletedCommentID, setDeletedCommentID] = useState("");
  const { articleID } = useParams();

  useEffect(() => {
    async function fetchSingleArticle() {
      const singleArticle = await getSingleArticle(articleID);
      setArticle(singleArticle);
    }
    fetchSingleArticle();
  }, [articleID]);

  useEffect(() => {
    async function fetchArticleComments() {
      const comments = await getArticleComments(articleID);
      setComments(comments.reverse());
    }
    fetchArticleComments();
  }, [articleID, commentAdded, deletedCommentID]);

  const handleCommentInput = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmission = async (e) => {
    if (!newComment) {
      showAlert("Trying to submit an empty comment? You silly billy.", "danger");
      return;
    }
    const addedComment = await submitComment(articleID, newComment);
    setCommentAdded(addedComment);
    showAlert("Comment submitted.", "success");
  };

  const handleDeleteComment = async (commentID) => {
    await deleteComment(commentID);
    setDeletedCommentID(commentID);
    showAlert("Comment deleted.", "success");
  };

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
      <div id="submitCommentDiv" className="form-group m-2">
        <label for="exampleFormControlTextarea1">Submit a comment:</label>
        <textarea
          onInput={handleCommentInput}
          value={newComment}
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
        ></textarea>
        <Button onClick={handleCommentSubmission} className="btn-sm mt-2">
          Submit
        </Button>
      </div>

      <div id="alertWrapper"></div>

      <h4>Comments:</h4>

      {comments.map((comment) => (
        <div className="card-body card mb-2" key={comment.comment_id}>
          <div id="topOfCard">
            <strong className="cardAuthor">{comment.author}</strong>
            <p id="cardVotes">Votes: {comment.votes}</p>
            {comment.author === props.user ? (
              <Button
                className="btn btn-primary btn-sm"
                onClick={() => handleDeleteComment(comment.comment_id)}
              >
                Delete
              </Button>
            ) : null}
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
