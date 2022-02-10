import Articles from "./components/Articles";
import SingleArticle from "./components/SingleArticle";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { useState } from "react";

function App() {
  const [loggedInUser, setLoggedInUser] = useState("jessjelly");
  return (
    <Container>
      <NavBar user={loggedInUser} />
      <Routes>
        <Route path="/" element={<Articles />}></Route>
        <Route path="/topics/:topic" element={<Articles />}></Route>
        <Route path="/article/:articleID" element={<SingleArticle user={loggedInUser} />}></Route>
      </Routes>
    </Container>
  );
}

export default App;
