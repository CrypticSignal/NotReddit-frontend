import Articles from "./components/Articles";
import SingleArticle from "./components/SingleArticle";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import TopicSelector from "./components/TopicSelector";

function App() {
  return (
    <div className="container">
      <Header />
      <TopicSelector />
      <Routes>
        <Route path="/" element={<Articles />}></Route>
        <Route path="/topics/:topic" element={<Articles />}></Route>
        <Route path="/article/:articleID" element={<SingleArticle />}></Route>
      </Routes>
    </div>
  );
}

export default App;
