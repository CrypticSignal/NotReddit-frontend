import Articles from "./components/Articles";
import SingleArticle from "./components/SingleArticle";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";

function App() {
  return (
    <Container>
      <NavBar />
      <Routes>
        <Route path="/" element={<Articles />}></Route>
        <Route path="/topics/:topic" element={<Articles />}></Route>
        <Route path="/article/:articleID" element={<SingleArticle />}></Route>
      </Routes>
    </Container>
  );
}

export default App;
