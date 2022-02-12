import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getTopics, getUsernames } from "../apiRequests";
import { capitaliseFirstChar, showAlert } from "../utils";
import { Button, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { signInWithGoogle, googleAccountSignOut } from "../firebase";

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

  const handleSignInWithGoogle = async () => {
    const result = await signInWithGoogle();
    if (!result.successful) {
      showAlert(result.err, "danger");
      return;
    }
    props.setLoggedIn(true);
    props.setLoggedInWithGoogle(true);
    props.setLoggedInUser(result.displayName);
    props.setGoogleAccountDetails(result);
  };

  const handleUserSelected = (username) => {
    if (window.location.pathname.includes("profile")) {
      navigate(`/profile/${username}`, { replace: true });
    }
    props.setLoggedIn(true);
    props.setLoggedInUser(username);
  };

  const logOut = async () => {
    localStorage.clear();

    if (props.loggedInWithGoogle) {
      props.setLoggedIn(false);
      props.setLoggedInWithGoogle(false);
      return;
    }

    const result = await googleAccountSignOut();

    if (!result.successful) {
      showAlert(result.error, "danger");
      return;
    }
    props.setLoggedIn(false);
  };

  return (
    <>
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
            <div id="logInSignInDiv">
              <NavDropdown title="Login as" id="basic-nav-dropdown">
                {usernames.map((username) => {
                  return (
                    <NavDropdown.Item key={username} onClick={() => handleUserSelected(username)}>
                      {username}
                    </NavDropdown.Item>
                  );
                })}
              </NavDropdown>
              <Button size="sm" onClick={handleSignInWithGoogle}>
                Sign in with Google
              </Button>
            </div>
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
      <div id="alertWrapper" className="mt-2"></div>
    </>
  );
};

export default NavBar;
