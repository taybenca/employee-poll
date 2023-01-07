import { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleAddQuestion } from "../actions/questions.js";

const NewQuestion = ({ dispatch }) => {
    const navigate = useNavigate();
    const [optionOneText, setOptionOneText] = useState("");
    const [optionTwoText, setOptionTwoText] = useState("");

    const onChangeOptionOne = (e) => {
        setOptionOneText(e.target.value);
    };

    const onChangeOptionTwo = (e) => {
        setOptionTwoText(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(handleAddQuestion(optionOneText, optionTwoText));
        setOptionOneText("");
        setOptionTwoText("");
        navigate("/");
    };

    return (
        <div>
            <h2>Would You Rather?</h2>
            <h4>Create Your Own Poll</h4>
    
            <form onSubmit={handleSubmit}>
                <div>
                    <div>
                        First Option:
                        <input
                            type="text"
                            value={optionOneText}
                            placeholder="Option One..."
                            onChange={onChangeOptionOne}
                            className="poll-select"
                        />
                    </div>
                    <div>
                        Second Option:
                        <input
                            type="text"
                            value={optionTwoText}
                            placeholder="Option Two..."
                            onChange={onChangeOptionTwo}
                            className="poll-select"
                        />
                    </div>
                </div>
                <div>
                    <button
                        className="button"
                        disabled={optionOneText === "" || optionTwoText === ""}
                    >
                    Add question
                    </button>
                </div>
            </form>
        </div>
    );
};
    
export default connect()(NewQuestion);
