import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';
import { affiliationDao, organizationDao } from '../dao/index.js';
import { EnrollOrganization } from '../interfaces/start.interface.js';


const enrollOrganization = async (
    userId: number,
    organization: string,
    nickname: string,
    job: string,
    jobIntroduce: string,
    hireDate: Date,
    company: string,
    companyPublic: boolean,

) : Promise<EnrollOrganization> => {

    const organizationId = await organizationDao.selectOrganizationId(organization);

    const affilationData = await affiliationDao.insertAffiliation(

        userId,
        organizationId?.organization_id!,
        nickname,
        job,
        jobIntroduce,
        hireDate,
        company,
        companyPublic
    );

    return {
        affiliationId: affilationData?.affiliations_id!
    }




}


export default {
    enrollOrganization
}
