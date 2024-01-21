import { ChallengeDay, UserTemplete } from "@prisma/client";



const sortCallendarDateBadge = (
    challengeDays: ChallengeDay[],
    userTemplateDays: UserTemplete[]

) => {
    const result = [];

    for (const challengeDay of challengeDays!) {
        const hasMatchingDate = userTemplateDays!.some(userTemplateDay =>
            isSameDate(challengeDay.day, userTemplateDay.finished_at!)
        );

        const customObject:  { date:Date, badge?: string } = {
            date: challengeDay.day
        };


        if (hasMatchingDate) {
            const matchingUserTemplateDays = userTemplateDays!.filter(userTemplateDays =>
                isSameDate(challengeDay.day, userTemplateDays.finished_at!)
            );

            for (const matchingUserTemplateDay of matchingUserTemplateDays) {

                if (matchingUserTemplateDay.complete) {
                    customObject["badge"] = "Gold";
                } else {
                    customObject["badge"] = "Silver";
                }

                result.push({ ...customObject }); 
            }
        }
         else if (isSameDate(challengeDay.day, new Date())) {
           // isSameDate(challengeDay.day, new Date())

            customObject["badge"] = "Purple";
            result.push({ ...customObject });
        } else {

            customObject["badge"] = "lightPurple";
            result.push({ ...customObject });
        }
    }

    return result


}



const isSameDate = (
    firstDate: Date,
    secondDate: Date
): boolean => {
    return (
        firstDate.getFullYear() === secondDate.getFullYear() &&
        firstDate.getMonth() === secondDate.getMonth() &&
        firstDate.getDate() === secondDate.getDate()
    );
}


export {

    sortCallendarDateBadge,
    isSameDate

}