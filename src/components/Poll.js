import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { formatQuestion } from "../utils/helpers.js";

const Poll = (props) => {
    const { id, name, avatar, timestamp } = props.question;

    return (
        <div className="parent-card">
            <div className="card-poll">
            <Link to={`questions/${id}`} className="poll">
                <img
                src={avatar}
                alt="Poll Author Avatar"
                className="homepage-avatar"
                />
                <h5>{name}</h5>
                <p>{timestamp}</p>
                <button className="btn btn-homepage-view">View</button>
            </Link>
            </div>
        </div>
    );
};

const mapStateToProps = ({ authedUser, users, questions }, { id }) => {
    const question = questions[id];
    return {
        authedUser,
        question: formatQuestion(question, users[question.author], authedUser),
    };
};

export default connect(mapStateToProps)(Poll);
