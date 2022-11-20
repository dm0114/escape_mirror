import { QueryFunctionContext } from '@tanstack/react-query';
const BASE_URL = "https://k7c104.p.ssafy.io/api/admin";
const Token = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkB0ZXN0LmNvbSIsInJvbGVzIjpbIkFETUlOIl0sInVzZXJJZCI6MywiaXNzIjoiZXNjYXBlZGljdGlvbmFyeS5jb20iLCJpYXQiOjE2Njg5MjE4MjgsImV4cCI6MTY2OTAwODIyOH0.k71V0Vcg794MdAlNdXP6W4tG9c5qaha__Ym7W9NlL9s';


interface IReqBody {
  clear: string,
  clearTime: string,
  reservationId: number,
  themeId: number,
  usedHint: string,
  userNicknames: []
}
export const postValidation = async ({ queryKey }: QueryFunctionContext<[string, IReqBody]>) => {
  console.log('관리자 탈출 인증'); // return true

  let [_, reqBody] = queryKey;
  
  const reqData = { 
    clear: parseInt(reqBody.clear),
    clearTime: reqBody.clearTime,
    reservationId: reqBody.reservationId,
    themeId: reqBody.themeId,
    usedHint: parseInt(reqBody.usedHint),
    userNicknames: [reqBody.userNicknames],
  }
  
  const data = JSON.stringify(reqData)
  
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
