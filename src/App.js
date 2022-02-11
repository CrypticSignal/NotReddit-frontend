import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import NavBar from "./components/NavBar";
import Articles from "./components/Articles";
import SingleArticle from "./components/SingleArticle";
import ViewProfile from "./components/ViewProfile";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState("");
  return (
    <Container>
      <NavBar
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        loggedInUser={loggedInUser}
        setLoggedInUser={setLoggedInUser}
      />
      <Routes>
        <Route path="/" element={<Articles />}></Route>
        <Route path="/topics/:topic" element={<Articles />}></Route>
        <Route
          path="/article/:articleID"
          element={<SingleArticle username={loggedInUser} />}
        ></Route>
        <Route
          path="/profile/:username"
          element={<ViewProfile loggedIn={loggedIn} username={loggedInUser} />}
        ></Route>
      </Routes>
    </Container>
  );
}

export default App;
