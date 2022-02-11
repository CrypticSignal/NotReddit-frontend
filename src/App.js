import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import NavBar from "./components/NavBar";
import Articles from "./components/Articles";
import SingleArticle from "./components/SingleArticle";

function App() {
  const [loggedInUser, setLoggedInUser] = useState("");
  return (
    <Container>
      <NavBar loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
      <Routes>
        <Route path="/" element={<Articles />}></Route>
        <Route path="/topics/:topic" element={<Articles />}></Route>
        <Route path="/article/:articleID" element={<SingleArticle user={loggedInUser} />}></Route>
      </Routes>
    </Container>
  );
}

export default App;
