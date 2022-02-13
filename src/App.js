import { useEffect, useState } from "react";
import { LoginRelatedContext } from "./contexts/LoginRelated";
import { Routes, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import NavBar from "./components/NavBar";
import Articles from "./components/Articles";
import SingleArticle from "./components/SingleArticle";
import ViewProfile from "./components/ViewProfile";
import ErrorPage from "./components/ErrorPage";
import PostArticle from "./components/PostArticle";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedInWithGoogle, setLoggedInWithGoogle] = useState(false);
  const [googleAccountDetails, setGoogleAccountDetails] = useState({});
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("loggedInWithGoogle"))) {
      setLoggedIn(true);
      setLoggedInWithGoogle(true);
      const accountDetails = JSON.parse(localStorage.getItem("googleAccountDetails"));
      setGoogleAccountDetails(accountDetails);
      setName(accountDetails.displayName.trim().split(" ")[0]);
      setUsername(localStorage.getItem("username"));
    }
  }, []);

  return (
    <Container>
      <LoginRelatedContext.Provider
        value={{
          loggedIn,
          setLoggedIn,
          loggedInWithGoogle,
          setLoggedInWithGoogle,
          googleAccountDetails,
          setGoogleAccountDetails,
          name,
          setName,
          username,
          setUsername,
        }}
      >
        <NavBar />
        <Routes>
          <Route path="/" element={<Articles />}></Route>
          <Route path="/topics/:topic" element={<Articles />}></Route>
          <Route path="/article/:articleID" element={<SingleArticle />}></Route>
          <Route path="/post-article" element={<PostArticle />}></Route>
          <Route path="/profile/:username" element={<ViewProfile />}></Route>
          <Route path="*" element={<ErrorPage />}></Route>
        </Routes>
      </LoginRelatedContext.Provider>
    </Container>
  );
}

export default App;
