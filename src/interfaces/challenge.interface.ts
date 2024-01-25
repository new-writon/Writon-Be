import { bool } from "aws-sdk/clients/signer";

interface SelectPeriod {
  period: number;

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
  content: string,
  visibility: bool
}

interface InsertUserTemplateContent {

  question_id: number,
  content: string,
  visibility: bool,
  user_templete_id: number
}

interface ChallengeAllInformation {
  challenge_id: number,
  deposit: number,
  challengeDayCount: string,
  start_count: number,
  end_count: number,
  deduction_rate: number
}

// interface ChallengeParticipantCount {
//   count: number
// }

// interface SelectUserCompleteCount {
//   count: number
// }


// interface SelectOverlapCount {
//   count: number
// }


interface DataCount {
  count: number
}

// interface SelectLikeCount {
//   likeCount: number
// }

export {
  SelectPeriod,
  SelectChallengeId,
  SelectDay,
  SelectFinishAt,
  WriteTemplete,
  InsertUserTemplateContent,
  DataCount,
  ChallengeAllInformation 
  // ChallengeParticipantCount,
  // SelectUserCompleteCount,
  // SelectOverlapCount,
  // SelectSuccessChallengeCount,
  // SelectLikeCount
}