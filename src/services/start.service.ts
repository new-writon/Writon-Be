import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';
import { affiliationDao, organizationDao } from '../dao/index.js';
import { EnrollOrganization } from '../interfaces/start.interface.js';
import { promises } from 'dns';


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


export default {
    enrollOrganization
}
