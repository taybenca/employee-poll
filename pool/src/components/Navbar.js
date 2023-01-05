import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { logoutAuthedUser } from "../actions/authedUser.js";

const Navbar = (props) => {
  const location = useLocation();

  const onClickLogout = () => {
    return props.dispatch(logoutAuthedUser());
  };

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <Link to="/" className="navbar-element">
          Home
        </Link>
        <Link to="/add" className="navbar-element">
          New Poll
        </Link>
        <Link to="/leaderboard" className="navbar-element">
          Leaderboard
        </Link>
        <span className="navbar-element navbar-user">
          <img
            className="navbar-user-img"
            alt="Authorised User Avatar"
            src={props.user.avatarURL}
          />{" "}
          {props.user.name}
        </span>
        <Link
          to="/login"
          state={{ from: location }}
          replace
          className="navbar-element"
        >
          <button onClick={onClickLogout} className="btn btn-logout">
            Logout
          </button>
        </Link>
      </nav>
      <hr />
    </div>
  );
};

const mapStateToProps = ({ authedUser, users }) => {
  const user = users[authedUser];
  return {
    user,
  };
};

export default connect(mapStateToProps)(Navbar);