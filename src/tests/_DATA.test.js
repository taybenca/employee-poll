const { _saveQuestion, _saveQuestionAnswer } = require('../utils/_DATA.js')

describe ('_saveQuestion', () => {
  it ('expected fields are populated when the question is saved', async() => {
    const optionOneText = 'Red'
    const optionTwoText = 'Blue'
    const author = 'Someone'

    const result = await(_saveQuestion({ optionOneText, optionTwoText, author }))
    expect(result.optionOne.text).toEqual('Red')
    expect(result.optionTwo.text).toEqual('Blue')
    expect(result.author).toEqual('Someone')
  })

  it ('expected throw an error if any field is not passed', async() => {
    const optionOneText = null
    const optionTwoText = 'Blue'
    const author = 'Someone'

    const result = await(_saveQuestion({ optionOneText, optionTwoText, author }))
      .catch((e) => e)
    expect(result).toMatch("Please provide optionOneText, optionTwoText, and author")
  })
})

describe ('_saveQuestionAnswer', () => {
  it ('expected fields are populated when the question answer is saved', async() => {
    const answer = {
      authedUser: 'sarahedo',
      qid: '8xf0y6ziyjabvozdd253nd',
      answer: 'optionOne'
    };
    const result = await _saveQuestionAnswer(answer);
    expect(result).toEqual(true);
  })

  it ('expected throw an error if field of answer is not passed', async() => {
    const authedUser = null
    const qid = '123'
    const answer = 'optionOne'
    const result = await (_saveQuestionAnswer({authedUser, qid, answer}))
      .catch((e) => e)
    expect(result).toMatch("Please provide authedUser, qid, and answer")
  })
})