import { challengeDao } from '../dao/index.js';


const calculateOverlapCount = async (
    challengeId: number
) => {

    let count = 0;

    const overlapCount = await challengeDao.selectOverlapCount(challengeId);

    for (let i = 0; i < overlapCount.length; i++) {

        if (!await challengeDao.selectPeriodDate(overlapCount[i].day)) {
            continue;
        }

        count++;
    }

    return count;

}
const signChallengeComplete = async (
    challengeId: number
) => {

    const challengeComplete = await challengeDao.signChallengeComplete(challengeId);

    let complete;

    if (!challengeComplete) {
        complete = false

    } else {
        complete = true
    }

    return complete;

}


export {
    calculateOverlapCount,
    signChallengeComplete
}