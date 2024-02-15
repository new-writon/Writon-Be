
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';
import challengeDao from '../dao/challenge.dao.js';
import emailFunction from '../modules/mailHandler.js'
import { smtpTransport } from "../config/email.js";

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

export default {

    sendInvitation
}

