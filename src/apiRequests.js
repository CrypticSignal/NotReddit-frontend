import axios from "axios";

const api = axios.create({
  baseURL: "https://notreddit-backend.herokuapp.com/api",
});

export const getArticles = async (topic, sortMethod) => {
  let requestURL = "/articles";
  const res = await api.get(requestURL, {
    params: {
      topic: topic && topic !== "all" ? topic : null,
      sort_by: sortMethod,
    },
  });
  return res.data.articles;
};

export const getSingleArticle = async (articleID) => {
  const res = await api.get(`/articles/${articleID}`);
  return res.data.article;
};

export const getTopics = async () => {
  const res = await api.get("/topics");
  return res.data.topics;
};

export const getArticleComments = async (articleID) => {
  const res = await api.get(`/articles/${articleID}/comments`);
  return res.data.comments;
};

export const updateArticleVotes = async (articleID, delta) => {
  await api.patch(`/articles/${articleID}`, { inc_votes: delta });
};

export const submitComment = async (username, articleID, comment) => {
  const res = await api.post(`/articles/${articleID}/comments`, {
    username: username,
    body: comment,
  });
  return res.data.comment[0];
};

export const deleteComment = async (commentID) => {
  await api.delete(`/comments/${commentID}`);
  return "Comment deleted.";
};

export const updateCommentVotes = async (commentID, delta) => {
  await api.patch(`/comments/${commentID}`, { inc_votes: delta });
};

export const getUsernames = async () => {
  const res = await api.get("/users");
  return res.data.usernames.map((usernameObject) => usernameObject.username);
};

export const getUserDetails = async (username) => {
  const res = await api.get(`/users/${username}`);
  return res.data.user;
};
