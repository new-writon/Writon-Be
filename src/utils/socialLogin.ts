import axios, { AxiosResponse } from 'axios';

const getKakaoData = async (
  kakaoAccessToken: string
): Promise<AxiosResponse<any, any>> => {

  const userData = await axios({
    method: 'get',
    url: 'https://kapi.kakao.com/v2/user/me',
    headers: {
      Authorization: `Bearer ${kakaoAccessToken}`
    }
  });

  return userData;
}

export default {
  getKakaoData
}