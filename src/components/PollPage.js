import { useLocation, useNavigate, useParams, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { formatQuestion } from '../utils/helpers';
import { handleAnswerQuestion } from '../actions/questions';

const withRouter = (Component) => {
    const ComponentWithRouterProp = (props) => {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return <Component {...props} router={{ location, navigate, params }} />;
    };
    
    return ComponentWithRouterProp;
}

const calculatePercent = (optionVotes, totalVotes) =>
  Math.round((optionVotes / totalVotes) * 100 * 10) / 10;

const PollPage = (props) => {
    if (!props.authedUser || !props.question || !props.id) {
        return <Navigate to="/404" />;
    }

    const {
        name,
        avatar,
        timestamp,
        optionOneText,
        optionOneVotes,
        optionTwoText,
        optionTwoVotes,
        isAnswered,
        isOptionOneVoted,
        isOptionTwoVoted,
    } = props.question;

    const totalVotes = optionOneVotes.length + optionTwoVotes.length;

    const onChangeVoteOne = (e) => {
        e.preventDefault();
        const { dispatch, question, authedUser } = props;
        dispatch(
        handleAnswerQuestion({
            qid: question.id,
            authedUser,
            answer: "optionOne",
        })
        );
    };

    const onChangeVoteTwo = (e) => {
        e.preventDefault();
        const { dispatch, question, authedUser } = props;
        dispatch(
        handleAnswerQuestion({
            qid: question.id,
            authedUser,
            answer: "optionTwo",
        })
        );
    };

    return (
        <div>
        <div>
            <h3>Poll by {name}</h3>
            <img 
                src={avatar} 
                alt="author-avatar"
                className="avatar-poll"    
            />
            <h2>Would You Rather . . .</h2>
        </div>
        {!isAnswered ? (
            <div>
                <div className="poll-option">
                    <p>{optionOneText}</p>
                    <button onClick={onChangeVoteOne} className="button-vote">
                    Vote
                    </button>
                </div>
                <div className="poll-option">
                    <p>{optionTwoText}</p>
                    <button onClick={onChangeVoteTwo} className="button-vote">
                    Vote
                    </button>
                </div>
                <p>Poll created at {timestamp}</p>
            </div>
        ) : (
            <div>
                <div className="poll-option">
                    <h3>{optionOneText}</h3>
                    {optionOneVotes.length} people voted in this option.
                    This means {calculatePercent(optionOneVotes.length, totalVotes)}% of the votes.
                    <p style={{color:'magenta'}}><b>{isOptionOneVoted ? "YOU CHOOSE THIS OPTION!" : false}</b></p>
                </div>
                <div className="poll-option">
                    <h3>{optionTwoText}</h3>
                    {optionTwoVotes.length} people voted in this option.
                    This means {calculatePercent(optionTwoVotes.length, totalVotes)}% of the votes.
                    <p style={{color:'magenta'}}><b>{isOptionTwoVoted ? "YOU CHOOSE THIS OPTION!" : false}</b></p>
                </div>
                <p>Poll created at {timestamp}</p>
            </div>
        )}
        </div>
    );
};

const mapStateToProps = ({ authedUser, users, questions }, props) => {
    try {
        const { id } = props.router.params;
        const question = questions[id];
        return {
        id,
        question: formatQuestion(question, users[question.author], authedUser),
        authedUser,
        };
    } catch (e) {
        return <Navigate to="/404" />;
    }
};

export default withRouter(connect(mapStateToProps)(PollPage));