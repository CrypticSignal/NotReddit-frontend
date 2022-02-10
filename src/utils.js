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
