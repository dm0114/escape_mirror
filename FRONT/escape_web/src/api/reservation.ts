import { QueryFunctionContext } from '@tanstack/react-query';
const BASE_URL = "https://k7c104.p.ssafy.io/api/admin";
const Token = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkB0ZXN0LmNvbSIsInJvbGVzIjpbIkFETUlOIl0sInVzZXJJZCI6MywiaXNzIjoiZXNjYXBlZGljdGlvbmFyeS5jb20iLCJpYXQiOjE2Njg2NDkwODIsImV4cCI6MTY2ODczNTQ4Mn0.iHBK5kii_0RC_zBtDjan5yddQiUittGdRA_oGRHe-FI';


// 참고
// return await fetch(`${BASE_URL}/mainpage/search?${query}`,{
//   headers : {
//        Authorization : //토큰 추가
//   },
// })
// .then((res) => {
//   console.log(res.json());
//   res.json()
// })

// 메인
export const putReservation = async ({ queryKey }: QueryFunctionContext<[string, number]>) => {
  console.log('관리자 예약 승인'); // return true

  let [_, reservationId] = queryKey;
  
  return await (
    await fetch(`${BASE_URL}/reservation/${reservationId}`, {
      method: 'put',
      headers: {
        Authorization: Token,
        'Content-Type': 'application/json' 
      },
    })
  ).json();
};

export const deleteReservation = async ({ queryKey }: QueryFunctionContext<[string, number]>) => {
  console.log('관리자 예약 삭제'); // return true

  let [_, reservationId] = queryKey;

  return await (
    await fetch(`${BASE_URL}/reservation/${reservationId}`, {
      method: 'delete',
      headers: {
        Authorization: Token,
        'Content-Type': 'application/json' 
      },
    })
  ).json();
};

// 
export const getReservation = async ({ queryKey }: QueryFunctionContext<[string, string, number | null | undefined]>) => {
  console.log('관리자 예약 현황'); // return true
  
  let [_, reservationDay, storeId] = queryKey;
  const params = new URLSearchParams({
    reservationDay: reservationDay
  });
  
  return await (
    await fetch(`${BASE_URL}/reservation/day/${storeId}?${params}`, {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkB0ZXN0LmNvbSIsInJvbGVzIjpbIkFETUlOIl0sInVzZXJJZCI6MywiaXNzIjoiZXNjYXBlZGljdGlvbmFyeS5jb20iLCJpYXQiOjE2Njg2NDkwODIsImV4cCI6MTY2ODczNTQ4Mn0.iHBK5kii_0RC_zBtDjan5yddQiUittGdRA_oGRHe-FI',
      },
    })
  ).json();
};

export const reservationApi = {
  getReservation,
  putReservation,
  deleteReservation,
};
