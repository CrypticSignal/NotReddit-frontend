import { useContext, useState } from "react";
import { LoginRelatedContext } from "../contexts/LoginRelated";
import { useNavigate } from "react-router-dom";
import { addArticle } from "../apiRequests";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { showAlert } from "../utils";

function PostArticle() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [topic, setTopic] = useState("coding");

  const { username } = useContext(LoginRelatedContext);
  let navigate = useNavigate();

  const handlePostArticle = async () => {
    const article = await addArticle(username, title, body, topic);
    navigate(`/article/${article.data.article.article_id}`);
    showAlert("Article posted.", "success");
  };

  return (
    <>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label className="center">Article Title:</Form.Label>
          <Form.Control onChange={(e) => setTitle(e.target.value)} placeholder="Enter a title" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label className="center">Body:</Form.Label>
          <Form.Control
            onChange={(e) => setBody(e.target.value)}
            as="textarea"
            rows={5}
            placeholder="Article body... "
          />
        </Form.Group>
      </Form>
      <div className="flexDirectionColumnCenter">
        <label id="sortByLabel" htmlFor="chooseTopic">
          Topic:
        </label>
        <select onChange={(e) => setTopic(e.target.value)} id="chooseTopic">
          <option value="coding">Coding</option>
          <option value="cooking">Cooking</option>
          <option value="football">Football</option>
        </select>
        <Button onClick={handlePostArticle} className="mt-3">
          Post Article
        </Button>
      </div>
    </>
  );
}

export default PostArticle;
