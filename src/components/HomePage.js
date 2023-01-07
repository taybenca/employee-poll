import { useState } from 'react';
import { connect } from 'react-redux';
import Poll from './Poll'

const HomePage = (props) => {
    const [answered, setAnswered] =  useState(false)
    const [unanswered, setUnanswered] = useState(true)

    const filteredAnswered = Object.values(props.questions)
    .filter(
        (question) =>
            question.optionOne.votes.includes(props.authedUser) ||
            question.optionTwo.votes.includes(props.authedUser)
    )
    .sort((a, b) => b.timestamp - a.timestamp);

    const filteredUnanswered = Object.values(props.questions)
        .filter(
            (question) =>
                !question.optionOne.votes.includes(props.authedUser) &&
                !question.optionTwo.votes.includes(props.authedUser)
            )
        .sort((a, b) => b.timestamp - a.timestamp);

    const onChangeAnswered = (e) => {
        setAnswered(!answered);
        setUnanswered(!unanswered);
    };

    const onChangeUnanswered = (e) => {
        setAnswered(!answered);
        setUnanswered(!unanswered);
    };

    return (
        <div>
            <h2>Hello {props.user.name}!</h2>
            <form>
                <span className="homepage-input">
                    <input
                        type="radio"
                        name="unanswered"
                        checked={unanswered}
                        value={unanswered}
                        onChange={onChangeUnanswered}
                    />
                    New questions
                </span>
                <span className="homepage-input">
                    <input
                        type="radio"
                        name="answered"
                        checked={answered}
                        value={answered}
                        onChange={onChangeAnswered}
                    />
                    Done
                </span>
            </form>
            {filteredUnanswered.length === 0 && unanswered && (
                <div className="empty">Thanks for answering all the questions! 🥰</div>
            )}
            {filteredAnswered.length === 0 && !unanswered && (
                <div className="empty">You didn't answer any question yet 😔</div>
            )}
        <div>
            {unanswered
            ? filteredUnanswered.map((q) => <Poll key={q.id} id={q.id} />)
            : filteredAnswered.map((q) => <Poll key={q.id} id={q.id} />)}
        </div>
        </div>
    );
};

const mapStateToProps = ({ authedUser, questions, users }) => {
    const user = users[authedUser];
    return{
        authedUser,
        questions,
        user,
    }
};

export default connect(mapStateToProps)(HomePage);