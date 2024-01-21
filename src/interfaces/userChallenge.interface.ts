interface SelectTemplateContent {
    question_id: number,
    user_templete_id: number,
    question_content_id: number,
    content: string,
    finished_at: Date
    category: string,
    question: string
}


interface SelectDateTemplateContent {
    question_id: number,
    user_templete_id: number,
    question_content_id: number,
    content: string,
    category: string,
    question: string,
    created_at: Date,
    job: string,
    company: string | null,
    company_public: number,
    nickname: string,
    profile: string,
    myCommentSign: number
    likeCount: number,
    commentCount: number
}


export {
    SelectTemplateContent,
    SelectDateTemplateContent
}