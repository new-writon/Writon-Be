import { bool } from "aws-sdk/clients/signer";

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
  content: string,
  visibility: bool
}

interface InsertUserTemplateContent {

  question_id: number,
  content: string,
  visibility: bool,
  user_templete_id: number
}


interface ChallengeParticipantCount {
  count: number
}

interface SelectUserCompleteCount {
  count: number
}


interface SelectOverlapCount {
  count: number
}


interface SelectSuccessChallengeCount {
  count: number
}

interface SelectLikeCount {
  count: number
}

export {
  SelectPeriod,
  SelectChallengeId,
  SelectDay,
  SelectFinishAt,
  WriteTemplete,
  InsertUserTemplateContent,
  ChallengeParticipantCount,
  SelectUserCompleteCount,
  SelectOverlapCount,
  SelectSuccessChallengeCount,
  SelectLikeCount
}