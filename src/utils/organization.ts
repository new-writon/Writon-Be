import { organizationDao } from '../dao/index.js';
import { OrganizationChallenge } from '../interfaces/challenge.interface.js';



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



const sortOrganization = (array : Array<OrganizationChallenge>) => 
{

    
    const groupOrganization : {
        [organization: string]: string[];
      } = {}

    array.forEach(item => {
    if (!groupOrganization[item.organization]) {
        groupOrganization[item.organization] = [];
    }
    groupOrganization[item.organization].push(item.challenge);
    });


    const sortData = Object.entries(groupOrganization).map(([organization, challenges]) => ({
    organization,
    challenges
    }));

    return sortData
}

export {
    checkOrganization,
    sortOrganization
}