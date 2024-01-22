interface SelectTemplateContent {
    question_id: number,
    user_templete_id: number,
    question_content_id: number,
    content: string,
    finished_at: Date
    category: string,
    question: string
}


interface IncludeCompany {
    company_public: number,
    company: string | null
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
    myCommentSign: string
    likeCount: string,
    commentCount: string
}


export {
    SelectTemplateContent,
    SelectDateTemplateContent,
    IncludeCompany
}