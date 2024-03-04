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
  deduction_amount: number
}


interface ChallengeAllInformationCustom {
  [key: string]: {
    challenge_id: number;
    deposit: number;
    challengeDayCount: string;
    deductions: { start_count: number; end_count: number; deduction_amount: number }[];
  };
}

interface DataCount {
  count: number
}


interface OrganizationChallenge {
  organization: string
  challenge: string
}

export {
  SelectPeriod,
  SelectChallengeId,
  SelectDay,
  SelectFinishAt,
  WriteTemplete,
  InsertUserTemplateContent,
  DataCount,
  ChallengeAllInformation,
  ChallengeAllInformationCustom,
  OrganizationChallenge
}