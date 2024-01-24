import prisma from '../client.js';
import { Affiliation, Organization, Question } from '@prisma/client'



const selectBasicQuestion = async(
    challengeId: number
): Promise<Question[]> => {
    const basicQuestionData = await prisma.$queryRaw<Question[]>
    `
      SELECT 
      q.question_id, 
      q.question 
      FROM Question as q
      WHERE q.challenge_id = ${challengeId}
      AND q.category LIKE  '%베이직%'
      ORDER BY q.question_id  
    `

    return basicQuestionData
}


const selectSpecialQuestion = async (
    challengeId: number
): Promise<Question[]> => {

    const specialQuestionData = await prisma.$queryRaw<Question[]>
    `
      SELECT 
      q.question_id, 
      q.question, 
      qt.category 
      FROM Question as q
      INNER JOIN QuestionTag as qt ON q.question_id = qt.question_id
      WHERE q.challenge_id = ${challengeId}
      AND q.category LIKE  '%스페셜%'
      ORDER BY qt.category, q.question_id
    
    `

    return specialQuestionData

}

export default {
    selectBasicQuestion,
    selectSpecialQuestion
 
}