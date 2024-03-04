
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';
import challengeDao from '../dao/challenge.dao.js';
import emailFunction from '../modules/mailHandler.js'
import { smtpTransport } from "../config/email.js";
import affiliationDao from '../dao/affiliation.dao.js';
import { sortOrganization } from '../utils/organization.js';

const sendInvitation = async (
    organization: string,
    challenge: string,
    email: Array<string>

) => {

    const challengeData = await challengeDao.selectChallengeInformation(challenge);

    await Promise.all(
        email.map(async (e) => {
          await emailFunction.sendInvitationEmail(organization, challengeData.challenge_id, e, challenge);
        })
      );

      smtpTransport.close();
}


const selectAllOragnizationAndAllChallenge = async ( ) => {

  return sortOrganization(await affiliationDao.selectAllOragnizationAndAllChallenge());

}


export default {

    sendInvitation,
    selectAllOragnizationAndAllChallenge
}

