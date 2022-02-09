function bla() {
  window.location.href = "/";
}

const Header = () => {
  return (
    <div id="header">
      <h1 onClick={bla}>Randicles</h1>
      <i>A news articles API, using data provided by Northcoders.</i>
    </div>
  );
};

export default Header;
