import { QueryFunctionContext } from '@tanstack/react-query';
const BASE_URL = "https://k7c104.p.ssafy.io/api/admin";
const Token = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkB0ZXN0LmNvbSIsInJvbGVzIjpbIkFETUlOIl0sInVzZXJJZCI6MywiaXNzIjoiZXNjYXBlZGljdGlvbmFyeS5jb20iLCJpYXQiOjE2Njg2NDkwODIsImV4cCI6MTY2ODczNTQ4Mn0.iHBK5kii_0RC_zBtDjan5yddQiUittGdRA_oGRHe-FI';


interface IReqBody {
  clear: number,
  clearTime: string,
  reservationId: number,
  themeId: number,
  usedHint: number,
  userNicknames: []
}
export const postValidation = async ({ queryKey }: QueryFunctionContext<[string, IReqBody]>) => {
  console.log('관리자 탈출 인증'); // return true

  let [_, reqBody] = queryKey;
  
  reqBody = {
    clear: reqBody.clear,
    clearTime: reqBody.clearTime,
    reservationId: reqBody.reservationId,
    themeId: reqBody.themeId,
    usedHint: reqBody.usedHint,
    userNicknames: reqBody.userNicknames,
  }
  const data = JSON.stringify(reqBody)
  console.log(reqBody);
  
  return await (
    await fetch(`${BASE_URL}/validation`, {
      method: 'post',
      headers: {
        Authorization: Token,
        'Content-Type': 'application/json' 
      },
      body: data
    })
  ).json();
};
