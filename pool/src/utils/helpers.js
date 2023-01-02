export function formatDate (timestamp) {
    const d = new Date(timestamp)
    const time = d.toLocaleTimeString('en-US')
    return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
  }
  
export function formatQuestion (question, author, authedUser) {
    const { id, firstOption, secondOption, timestamp } = question
    const { name, avatarURL } = author
  
    return {
        name,
        id,
        timestamp: formatDate(timestamp),
        avatar: avatarURL,
        firstOptionText: firstOption.text,
        firstOptionVotes: firstOption.votes,
        secondOptionText: secondOption.text,
        secondOptionVotes: secondOption.votes,
        isAnswered: 
            firstOption.votes.includes(authedUser) ||
            secondOption.votes.includes(authedUser) ? true : false,
        isFirstOptionVoted: firstOption.votes.includes(authedUser),
        isSecondOptionVoted: secondOption.votes.includes(authedUser)
    }
}