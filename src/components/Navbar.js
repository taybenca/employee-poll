import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { logoutAuthedUser } from "../actions/authedUser.js";

const Navbar = (props) => {
    const location = useLocation();

    const onClickLogout = () => {
        return props.dispatch(logoutAuthedUser());
    };

    return (
        <div>
            <nav className="navbar">
                <span className="navbar-element">
                    <img
                      className="navbar-user-img"
                      alt="user-avatar"
                      src={props.user.avatarURL}
                    />
                  Hello, {props.user.name}!
                </span>
                <Link to="/" className="navbar-element">
                    Homepage
                </Link>
                <Link to="/add" className="navbar-element">
                    New question
                </Link>
                <Link to="/leaderboard" className="navbar-element">
                    Leaderboard
                </Link>
                <Link
                    to="/login"
                    state={{ from: location }}
                    replace
                    className="navbar-element"
                >
                <button onClick={onClickLogout} className="button">
                    Logout
                </button>
                </Link>
          </nav>      
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