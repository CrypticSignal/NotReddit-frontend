import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTopics, getUsernames } from "../apiRequests";
import { capitaliseFirstChar } from "../utils";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";

const NavBar = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const [topics, setTopics] = useState([]);
  const [usernames, setUsernames] = useState([]);

  useEffect(() => {
    async function fetchTopics() {
      const topics = await getTopics();
      setTopics(topics);
    }
    async function fetchUsernames() {
      setUsernames(await getUsernames());
    }
    fetchTopics();
    fetchUsernames();
  }, []);

  const handleUserSelected = (username) => {
    setLoggedIn(true);
    props.setLoggedInUser(username);
  };

  const logOut = () => {
    setLoggedIn(false);
  };

  return (
    <Navbar id="navbar" bg="dark" variant="dark" expand="sm">
      <Link to={"/"}>
        <Navbar.Brand>Randicles</Navbar.Brand>
      </Link>

      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          {topics.map((topic) => {
            return (
              <Link key={topic.slug} to={`/topics/${topic.slug}`}>
                <Nav.Link href={`/topics/${topic.slug}`}>
                  {capitaliseFirstChar(topic.slug)}
                </Nav.Link>
              </Link>
            );
          })}
          <Link to={"/"}>
            <Nav.Link href={"/"}>All</Nav.Link>
          </Link>
        </Nav>
        {!loggedIn ? (
          <NavDropdown title="Login as" id="basic-nav-dropdown">
            {usernames.map((username) => {
              return (
                <NavDropdown.Item onClick={() => handleUserSelected(username)}>
                  {username}
                </NavDropdown.Item>
              );
            })}
          </NavDropdown>
        ) : null}
        {loggedIn ? (
          <div id="loggedInLogOut">
            <p id="loggedInAs" className="navbar-text">
              Logged in as <strong>{props.loggedInUser}</strong>
            </p>
            <p className="navbar-text" id="logOut" onClick={logOut}>
              Log out
            </p>
          </div>
        ) : null}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
