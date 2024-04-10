interface ObjectiveAnswer extends Answer{

    satisfaction_id: number,
    score: number
 
}

interface ObjectiveAnswerRequest{

    satisfactionId: number,
    score: number
 
}

interface SubjectiveAnswer extends Answer{

    satisfaction_id: number,
    answer:string
}

interface SubjectiveAnswerRequest{

    satisfactionId: number,
    answer:string
}

interface Answer {
    user_challenge_id: number
}


export {
    ObjectiveAnswer,
    SubjectiveAnswer,
    ObjectiveAnswerRequest,
    SubjectiveAnswerRequest
} 