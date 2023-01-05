import { useState }  from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'


export const LoginPage = (props) => {
    
    const [selectedUser, setSelectedUser] = useState("none");
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || "/";
    
    const onChange = (e) => {
        setSelectedUser(e.target.value);
    };
      
    const onSubmit = (e) => {
        e.preventDefault();
        props.dispatch(setAuthedUser(selectedUser));
        navigate(from, { replace: true });
    };

    return (
        <div>
            <h3>Login</h3>
            <form onSubmit={onSubmit}>
            <select
                className="login"
                defaultValue={"none"}
                onChange={onChange}
            >
                <option value="disabled" disabled> Username </option>
                {props.users.map((user) => (
                    <option key={user.id} value={user.id}>
                        {user.name}
                    </option>
                ))}
                <option value="id:1">Person 1</option>
                <option value="id:2">Person 2</option>
            </select>
            <button
                type="submit"
                className="btn-login"
                disabled={selectedUser === "none" ? true : false}
            >
                Login
            </button>
            </form>
        </div>
    )
}

const mapStateToProps = ({ authedUser, users }) => {
    return {
        isAuthorised: authedUser === null ? false : true,
        users: Object.values(users),
    };
  };
  
  export default connect(mapStateToProps)(LoginPage);