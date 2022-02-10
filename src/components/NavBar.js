import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTopics } from "../apiRequests";
import { capitaliseFirstChar } from "../utils";
import { Nav, Navbar } from "react-bootstrap";

const NavBar = (props) => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    async function fetchTopics() {
      const topics = await getTopics();
      setTopics(topics);
    }
    fetchTopics();
  }, []);

  return (
    <Navbar id="navbar" bg="dark" variant="dark">
      <Link to={"/"}>
        <Navbar.Brand>Randicles</Navbar.Brand>
      </Link>
      <Nav className="me-auto">
        {topics.map((topic) => {
          return (
            <Link key={topic.slug} to={`/topics/${topic.slug}`}>
              <Nav.Link href={`/topics/${topic.slug}`}>{capitaliseFirstChar(topic.slug)}</Nav.Link>
            </Link>
          );
        })}
        <Link to={"/"}>
          <Nav.Link href={"/"}>All</Nav.Link>
        </Link>
      </Nav>
      <span className="navbar-text">
        Logged in as <strong>{props.user}</strong>
      </span>
    </Navbar>
  );
};

export default NavBar;
