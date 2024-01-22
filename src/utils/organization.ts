import { organizationDao } from '../dao/index.js';



const checkOrganization = async (
    organization: string,
    userId: number
): Promise<boolean | null> => {
    let affiliatedConfirmation;

    const checkAffiliation = await organizationDao.selectAffiliation(organization, userId);

    if (!checkAffiliation?.affiliations![0]) {
        affiliatedConfirmation = false;

    } else {
        affiliatedConfirmation = true;
    }

    return affiliatedConfirmation;
}


export {
    checkOrganization
}