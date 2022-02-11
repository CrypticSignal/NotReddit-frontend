import { useEffect } from "react";
import { showAlert } from "../utils";

const ErrorPage = () => {
  useEffect(() => {
    showAlert(
      "You have visited an invalid URL. Click <a href='/'>here</a> to go to the homepage.",
      "danger"
    );
  }, []);
  return <div id="alertWrapper" className="mt-2"></div>;
};

export default ErrorPage;
