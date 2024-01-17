interface SelectPeriod {
  period: number;
//  challenge_id: number
}

interface SelectChallengeId {

  challenge_id: number
}


interface SelectDay {

  day: Date
}

interface SelectFinishAt {

  finished_at: Date
}

interface WriteTemplete {

  question_id: number,
  content: string
}



export {
  SelectPeriod,
  SelectChallengeId,
  SelectDay,
  SelectFinishAt,
  WriteTemplete
}