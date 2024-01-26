
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';
import challengeDao from '../dao/challenge.dao.js';
import emailFunction  from '../modules/mailHandler.js'


const sendInvitation = async (
    organization:string,
    challenge: string,
    email: Array<string>

) => {

    const challengeData = await challengeDao.selectChallengeInformation(challenge);

    email.map( async (e) => {
      const a =  await emailFunction.sendInvitationEmail(organization, challengeData.challenge_id, e);
      console.log(a)
    })

     

}

export default {

    sendInvitation
}

