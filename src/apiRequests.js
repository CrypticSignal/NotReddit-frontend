import axios from "axios";

const api = axios.create({
  baseURL: "https://randicles.herokuapp.com/api",
});

export const getArticles = async (topic) => {
  let requestURL = "/articles";
  if (topic && topic !== "all") requestURL += `?topic=${topic}`;
  const res = await api.get(requestURL);
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
  console.log(res);
};
