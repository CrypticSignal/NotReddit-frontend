import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserDetails } from "../apiRequests";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const ViewProfile = (props) => {
  const [username, setUsername] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const [photoURL, setPhotoURL] = useState("");

  const params = useParams();

  // useEffect(() => {
  //   console.log(props.googleAccountDetails.photoURL);
  //   setPhotoURL(props.googleAccountDetails.photoURL);
  // }, [props.googleAccountDetails.photoURL]);

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
      {props.loggedIn ? (
        <>
          {props.loggedInWithGoogle ? (
            <div className="profileCard">
              <Card style={{ width: "18rem" }} className="mt-2">
                <Card.Img variant="top" src={props.googleAccountDetails.photoURL} />
                <Card.Body>
                  <Card.Title>{props.googleAccountDetails.displayName}</Card.Title>
                  <i>{props.googleAccountDetails.email}</i>
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
