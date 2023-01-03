import { saveQuestion, saveQuestionAnswer } from '../utils/api'
import { showLoading,hideLoading } from 'react-redux-loading-bar'
import { addQuestionToUser, saveAnswerToUser } from './users'


export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'

function addQuestion (question) {
    return {
        type: ADD_QUESTION,
        question,
    }
}

export function handleAddQuestion (firstOptionText, secondOptionText) {
    return (dispatch, getState) => {
        const { authedUsed } = getState()
        dispatch(showLoading())

        return saveQuestion({
            firstOptionText,
            secondOptionText,
            author: authedUsed,
        })
        .then((question) => {
            dispatch(addQuestion(question))
            dispatch(addQuestionToUser(question))
        })
        .then(() => {
            dispatch(hideLoading())
        })
    }
}

export function receiveQuestions (questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions, 
    }
}

function answerQuestion ({ authedUsed, qid, answer }) {
    return {
        type: ANSWER_QUESTION,
        authedUsed,
        qid,
        answer,
    }
}

export function handleAnswerQuestion ({ authedUser, qid, answer }) {
    return (dispatch) => {
        dispatch(answerQuestion({ authedUser, qid, answer }))
        dispatch(saveAnswerToUser({ authedUser, qid, answer }))
    
        return saveQuestionAnswer({ authedUser, qid, answer })
        .catch((event) => {
            console.warn('Error in handleAnswerQuestion: ', event)
            dispatch(answerQuestion({ authedUser, qid, answer }))
            dispatch(saveAnswerToUser({ authedUser, qid, answer }))
            alert('There was an error. Please try again.')
        })
    }
}