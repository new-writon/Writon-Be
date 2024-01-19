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
 //   DateTemplateContent
  }