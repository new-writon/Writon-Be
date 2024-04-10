import prisma from '../client.js';
import { Prisma, PrismaClient, QuestionContent, UserChallenge } from '@prisma/client'
import { ChallengeDay  } from '@prisma/client'
import { DataCount } from '../interfaces/challenge.interface.js';
import { SubjectiveAnswer, ObjectiveAnswer } from '../interfaces/satisfaction.interface.js';


const selectChallengeSatisFactionQuestion = async(
    challengeId: number
) => {
    return await prisma.$queryRaw
    `
    SELECT 
        s.satisfaction_id,
        s.type,
        s.question
    FROM 
        SatisFaction AS s
    WHERE
        s.challenge_id = ${challengeId}

    `
}

const insertManyObjectiveAnswer = async(
    satisfationAnswer: Array<ObjectiveAnswer>
): Promise<Prisma.BatchPayload> => {

    return await prisma.satisfactionObjectiveResult.createMany({

        data: satisfationAnswer

      });
    
}

const insertManySubjectiveAnswer = async(
    satisfationAnswer: Array<SubjectiveAnswer>
): Promise<Prisma.BatchPayload> => {

    return await prisma.satisfactionSubjectiveResult.createMany({
        data: satisfationAnswer
      });
    
}


export default {

    selectChallengeSatisFactionQuestion,
    insertManyObjectiveAnswer,
    insertManySubjectiveAnswer
    
}