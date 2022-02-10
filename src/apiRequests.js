import axios from "axios";

const api = axios.create({
  baseURL: "https://randicles.herokuapp.com/api",
});

export const getArticles = async (topic, sortMethod) => {
  let requestURL = "/articles";
  // if (topic && topic !== "all") requestURL += `?topic=${topic}`;
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

export const submitComment = async (articleID, comment) => {
  const res = await api.post(`/articles/${articleID}/comments`, {
    username: "jessjelly",
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
