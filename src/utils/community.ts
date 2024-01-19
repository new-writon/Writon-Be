
import {  ParticipantData } from '../interfaces/community.interface.js';
import { SelectDateTemplateContent } from '../interfaces/userChallenge.interface.js';
import { isSameDate } from './record.js'





const sortParticipantInformation = (data: ParticipantData[]): ParticipantData[] => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    return data.map((user) => {

        if (!user.cheering_phrase_date || !isSameDate(new Date(user.cheering_phrase_date), currentDate)) {
            user.cheering_phrase = null;
        }

        if (user.company_public === 0) {
            user.company = null;
        }

        return user;
    });
}

const sortCompanyPublic = (data: SelectDateTemplateContent[]): SelectDateTemplateContent[] => {

    return data.map((user) => {

        if (user.company_public === 0) {
            user.company = null;
        }

        return user;
    });
}


export {
    sortParticipantInformation,
    sortCompanyPublic,

}



