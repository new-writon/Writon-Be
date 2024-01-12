import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';
import { affiliationDao } from '../dao/index.js';
import { PresentSituation }  from '../interfaces/record.interface.js';


const presentSituation = async (
    affiliationsId: number,
    userId: number
  ) : Promise<PresentSituation>=> {

    const nickname =  await affiliationDao.selectNickname(affiliationsId, userId);

    // 전체기간 
    // 남은 기간
    // 성공 챌린지 횟수
    // 남은 보증금

    console.log(nickname?.nickname)





    return {
       nickname: nickname?.nickname!



    }


  

  
  }






export default {

    presentSituation

}

