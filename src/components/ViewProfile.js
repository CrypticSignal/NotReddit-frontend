import { useContext, useEffect, useState } from "react";
import { LoginRelatedContext } from "../contexts/LoginRelated";
import { useParams } from "react-router-dom";
import { getUserDetails } from "../apiRequests";
import Card from "react-bootstrap/Card";

const ViewProfile = () => {
  const [username, setUsername] = useState("");
  const [userDetails, setUserDetails] = useState({});

  const { loggedIn, loggedInWithGoogle, googleAccountDetails } = useContext(LoginRelatedContext);

  const params = useParams();

  useEffect(() => {
    setUsername(params.username);
  }, [params]);

  useEffect(() => {
    async function fetchUserDetails() {
      const userDetails = await getUserDetails(username);
      setUserDetails(userDetails);
    }
    fetchUserDetails();
  }, [username]);

  return (
    <>
      {loggedIn ? (
        <>
          {loggedInWithGoogle ? (
            <div className="profileCard">
              <Card style={{ width: "18rem" }} className="mt-2">
                <Card.Img variant="top" src={googleAccountDetails.photoURL} />
                <Card.Body>
                  <Card.Title>{googleAccountDetails.displayName}</Card.Title>
                  <i>{googleAccountDetails.email}</i>
                </Card.Body>
              </Card>
            </div>
          ) : (
            <>
              {userDetails && Object.keys(userDetails).length > 0 ? (
                <div className="profileCard">
                  <Card style={{ width: "18rem" }} className="mt-2">
                    <Card.Img variant="top" src={userDetails.avatar_url} />
                    <Card.Body>
                      <Card.Title>{userDetails.name}</Card.Title>
                      <i>{username}</i>
                      <Card.Text>Placeholder text.</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              ) : (
                <p>Loading profile details...</p>
              )}
            </>
          )}
        </>
      ) : (
        <p>Not logged in</p>
      )}
    </>
  );
};

export default ViewProfile;
