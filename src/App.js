import { useEffect, useState } from "react";
import { LoginRelatedContext } from "./contexts/LoginRelated";
import { Routes, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import NavBar from "./components/NavBar";
import Articles from "./components/Articles";
import SingleArticle from "./components/SingleArticle";
import ViewProfile from "./components/ViewProfile";
import ErrorPage from "./components/ErrorPage";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedInWithGoogle, setLoggedInWithGoogle] = useState(false);
  const [googleAccountDetails, setGoogleAccountDetails] = useState({});
  const [loggedInUser, setLoggedInUser] = useState("");

  useEffect(() => {
    if (localStorage.getItem("loggedInWithGoogle")) {
      setLoggedIn(true);
      setLoggedInWithGoogle(true);
      const accountDetails = JSON.parse(localStorage.getItem("googleAccountDetails"));
      setGoogleAccountDetails(accountDetails);
      setLoggedInUser(accountDetails.displayName.trim().split(" ")[0]);
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
          loggedInUser,
          setLoggedInUser,
        }}
      >
        <NavBar />
        <Routes>
          <Route path="/" element={<Articles />}></Route>
          <Route path="/topics/:topic" element={<Articles />}></Route>
          <Route path="/article/:articleID" element={<SingleArticle />}></Route>
          <Route path="/profile/:username" element={<ViewProfile />}></Route>
          <Route path="*" element={<ErrorPage />}></Route>
        </Routes>
      </LoginRelatedContext.Provider>
    </Container>
  );
}

export default App;
