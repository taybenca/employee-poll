import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { formatQuestion } from "../utils/helpers.js";

const Poll = (props) => {
    const { id, name, avatar, timestamp } = props.question;

    return (
        <div className="parent-card">
            <div className="card-poll">
            <Link to={`questions/${id}`}>
                <img
                src={avatar}
                alt="author-avatar"
                className="homepage-avatar"
                />
                <h4>{name}</h4>
                <h5>{timestamp}</h5>
                <button className="button">View</button>
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
