import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getArticleComments,
  getSingleArticle,
  submitComment,
  deleteComment,
  updateCommentVotes,
} from "../apiRequests";
import Button from "react-bootstrap/Button";
import { showAlert } from "../utils";

const SingleArticle = (props) => {
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [commentVotesInfo, setCommentVotesInfo] = useState({});
  const [newComment, setNewComment] = useState("");
  const [commentAdded, setCommentAdded] = useState({});
  const [deletedCommentID, setDeletedCommentID] = useState("");

  const { articleID } = useParams();

  const handleUpvote = (commentID) => {
    const originalNumVotes = commentVotesInfo[commentID][0];
    if (commentVotesInfo[commentID][1]) return;
    const newObject = { ...commentVotesInfo };
    newObject[commentID] = [originalNumVotes, true, false, originalNumVotes + 1];
    setCommentVotesInfo(newObject);
    const delta = commentVotesInfo[commentID][3] < originalNumVotes ? 2 : 1;
    updateCommentVotes(commentID, delta);
  };

  const handleDownvote = (commentID) => {
    const originalNumVotes = commentVotesInfo[commentID][0];
    if (commentVotesInfo[commentID][2]) return;
    const newObject = { ...commentVotesInfo };
    newObject[commentID] = [originalNumVotes, false, true, originalNumVotes - 1];
    setCommentVotesInfo(newObject);
    const delta = commentVotesInfo[commentID][3] > originalNumVotes ? -2 : -1;
    updateCommentVotes(commentID, delta);
  };

  // Fetch the article's comments.
  useEffect(() => {
    const commentIDToVotesInfo = {};
    async function fetchArticleComments() {
      const comments = await getArticleComments(articleID);
      setComments(comments.reverse());
      comments.forEach((comment) => {
        // The value is in the format
        // [Original num of votes, upvoted?, downvoted? new number of votes]
        commentIDToVotesInfo[comment.comment_id] = [comment.votes, false, false, comment.votes];
      });
      setCommentVotesInfo(commentIDToVotesInfo);
    }
    fetchArticleComments();
  }, [articleID, commentAdded, deletedCommentID]);

  // Fetch an article by its ID.
  useEffect(() => {
    async function fetchSingleArticle() {
      const singleArticle = await getSingleArticle(articleID);
      setArticle(singleArticle);
    }
    fetchSingleArticle();
  }, [articleID]);

  const handleCommentInput = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmission = async (e) => {
    if (!newComment) {
      showAlert("Trying to submit an empty comment? You silly billy.", "danger");
      return;
    }
    const addedComment = await submitComment(props.username, articleID, newComment);
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
        <label htmlFor="exampleFormControlTextarea1">Submit a comment:</label>
        <textarea
          onInput={handleCommentInput}
          value={newComment}
          className="form-control"
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

            {comment.author === props.username ? (
              <Button
                className="btn btn-primary btn-sm"
                onClick={() => handleDeleteComment(comment.comment_id)}
              >
                Delete
              </Button>
            ) : null}
            <div id="votesDiv">
              <i className="chevron up icon" onClick={() => handleUpvote(comment.comment_id)}></i>
              <i
                className="chevron down icon"
                onClick={() => handleDownvote(comment.comment_id)}
              ></i>

              <p id="cardVotes">
                Votes:{" "}
                {commentVotesInfo[comment.comment_id]
                  ? commentVotesInfo[comment.comment_id][3]
                  : comment.votes}
              </p>
            </div>
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
