import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';
import { affiliationDao, organizationDao, challengeDao } from '../dao/index.js';
import { EnrollOrganization } from '../interfaces/start.interface.js';
import prisma from '../client.js';



const enrollOrganization = async (
    userId: number,
    organization: string,
    nickname: string,
    job: string,
    jobIntroduce: string,
    hireDate: Date,
    company: string,
    companyPublic: boolean,

): Promise<void> => {

    const organizationId = await organizationDao.selectOrganizationId(organization);

    await affiliationDao.insertAffiliation(

        userId,
        organizationId?.organization_id!,
        nickname,
        job,
        jobIntroduce,
        hireDate,
        company,
        companyPublic
    );

}


const enrollChallenge = async (
    userId: number,
    organization: string
) => {

    const challengeData = await challengeDao.selectChallenge(organization, userId);

    await challengeDao.insertChallenge(userId, challengeData.challenge_id, challengeData.deposit);

}



export default {
    enrollOrganization,
    enrollChallenge
}
