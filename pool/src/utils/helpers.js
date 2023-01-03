export function formatDate (timestamp) {
    const d = new Date(timestamp)
    const time = d.toLocaleTimeString('en-US')
    return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
  }
  
export function formatQuestion (question, author, authedUser) {
    const { id, optionOne, optionTwo, timestamp } = question
    const { name, avatarURL } = author
  
    return {
        name,
        id,
        timestamp: formatDate(timestamp),
        avatar: avatarURL,
        optionOneText: optionOne.text,
        optionOneVotes: optionOne.votes,
        optionTwoText: optionTwo.text,
        optionTwoVotes: optionTwo.votes,
        isAnswered: 
            optionOne.votes.includes(authedUser) ||
            optionTwo.votes.includes(authedUser) ? true : false,
        isOptionOneVoted: optionOne.votes.includes(authedUser),
        isOptionTwoVoted: optionTwo.votes.includes(authedUser)
    }
}