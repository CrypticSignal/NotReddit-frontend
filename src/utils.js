import { deleteArticle } from "./apiRequests";

export const capitaliseFirstChar = (string) => {
  return string[0].toUpperCase() + string.slice(1);
};

export const showAlert = (message, type) => {
  const alertWrapper = document.getElementById("alertWrapper");
  alertWrapper.style.display = "block";
  alertWrapper.innerHTML = `
  <div class="alert alert-${type} alert-dismissible fade show" role="alert">
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
  `;
};

export const handleDeleteArticle = async (articleID, setDeletedArticleID = undefined) => {
  showAlert("Deleting article...", "info");
  await deleteArticle(articleID);
  if (setDeletedArticleID) {
    setDeletedArticleID(articleID);
    showAlert("Article deleted.", "success");
  }
};
