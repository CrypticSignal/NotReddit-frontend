import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleArticle } from "../apiRequests";

// topics/coding

const SingleArticle = () => {
  const [article, setArticle] = useState({});
  const { articleID } = useParams();

  useEffect(async () => {
    const singleArticle = await getSingleArticle(articleID);
    setArticle(singleArticle);
  }, [articleID]);

  return (
    <div>
      {article ? (
        <div id="SingleArticle">
          <h1>{article.title}</h1>
          <i>By {article.author}</i>
          <p>{article.body}</p>
        </div>
      ) : null}
    </div>
  );
};

export default SingleArticle;
