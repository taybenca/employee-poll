import { useState }  from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'

const LoginPage = (props) => {
    console.log(props)
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
            <h1>Welcome to Employee Poll 🎉</h1>
            <h3>Please select your Name:</h3>
            <form onSubmit={onSubmit}>
            <select
                className="login-select"
                defaultValue={"none"}
                onChange={onChange}
            >
                <option value="none" disabled> Name </option>
                {props.users.map((user) => (
                    <option key={user.id} value={user.id}>
                        {user.name}
                    </option>
                ))}
            </select>
            <div>
                <button
                    type="submit"
                    className="button"
                    disabled={selectedUser === "none" ? true : false}
                >
                    Login
                </button>
            </div>   
            </form>
            <img 
                src="https://robohash.org/bbc16eeff73a86b27c4c688dc91eecfa?set=set4&bgset=&size=400x400"
                alt="pink-cat"
                className='img-login'
            />
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