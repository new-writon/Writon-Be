interface ParticipantData {
  profile: string | null;
  job: string;
  job_introduce: string;
  nickname: string;
  company_public: number;
  company: string | null;
  cheering_phrase: string | null;
  cheering_phrase_date: Date | null;
}


interface SelectComment {
  job: string,
  company: string,
  company_public: number,
  profile: string,
  comment_id: string,
  nickname: string,
  comment_group: string,
  user_templete_id: number,
  myCommentSign: boolean;
  content: string,
  created_at: Date


}




interface CommentWithReplies extends SelectComment{

  reply: CommentWithReplies[];
}
// interface DateTemplateContent {

//   question_id: number,
//   user_templete_id: number,
//   question_content_id: number,
//   content: string,
//   category: string,
//   question: string,
//   created_at: Date,
//   job: string,
//   company: string | null,
//   company_public: number,
//   nickname: string,
//   profile: string,
//   likeCount: number,
//   commentCount: number

// }

export {
  ParticipantData,
  SelectComment,
  //   DateTemplateContent,
  CommentWithReplies
}