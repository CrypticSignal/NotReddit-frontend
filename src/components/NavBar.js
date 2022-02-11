import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getTopics, getUsernames } from "../apiRequests";
import { capitaliseFirstChar } from "../utils";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";

const NavBar = (props) => {
  const [topics, setTopics] = useState([]);
  const [usernames, setUsernames] = useState([]);

  let navigate = useNavigate();

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
    if (window.location.pathname.includes("profile")) {
      navigate(`/profile/${username}`, { replace: true });
    }
    props.setLoggedIn(true);
    props.setLoggedInUser(username);
  };

  const logOut = () => {
    props.setLoggedIn(false);
  };

  return (
    <Navbar id="navbar" bg="dark" variant="dark" expand="md">
      <Link to={"/"}>
        <Navbar.Brand>NotReddit</Navbar.Brand>
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
        {!props.loggedIn ? (
          <NavDropdown title="Login as" id="basic-nav-dropdown">
            {usernames.map((username) => {
              return (
                <NavDropdown.Item key={username} onClick={() => handleUserSelected(username)}>
                  {username}
                </NavDropdown.Item>
              );
            })}
          </NavDropdown>
        ) : null}
        {props.loggedIn ? (
          <div id="loggedInLogOut">
            <p id="loggedInAs" className="navbar-text">
              Logged in as <strong>{props.loggedInUser}</strong>
            </p>
            <Link to={`/profile/${props.loggedInUser}`}>
              <p id="viewProfile" className="navbar-text">
                View Profile
              </p>
            </Link>

            <p className="navbar-text" id="logOut" onClick={logOut}>
              Log out
            </p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
