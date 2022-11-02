const BASE_URL = "https://my-json-server.typicode.com/dm0114";
// const BASE_URL = "https://k7c104.p.ssafy.io:8080";



// 메인
export const getPreloading = (mapX, mapY) => {
  // /api/mainpage
  fetch(`${BASE_URL}/mocks/db`)
}



// 검색
// const getSearch = (searchWord) => {
//   // api/mainpage/search
//   fetch(`${BASE_URL}/mocks/db`).then((res) => res.json());
// }
const getSearch = ({ queryKey }) => {
  const [_, query] = queryKey
  console.log(query);
  return fetch(`${BASE_URL}/mocks/db`,{
    // headers : {
    //      Authorization : //토큰 추가
    // }
}).then((res) => res.json())
}

const getCafeDetail = () => {
  // api/book/store/{storeId}
  // 헤더에 토큰 추가
  return fetch(`${BASE_URL}/mocksCafe/db`).then((res) => res.json());
}

const getThemeDetail = () => {
  // api/book/theme/{themeId}
  // 헤더에 토큰 추가
  fetch(`${BASE_URL}/mocks/db`).then((res) => res.json());

}

export const searchApi = { getSearch, getCafeDetail, getThemeDetail };



// 예약
const getMypageActs = () => {
  // api/mypage/acts
  return fetch(`${BASE_URL}/mocksTheme/db`).then((res) => res.json())
}

//예약 상세
const getReservationDetail = (reservationId) => {
  // /api/mypage/{reservationId}
  return fetch(`${BASE_URL}/mocksTheme/db`).then((res) => res.json())
}

//테마 예약 가능 시간
const getReservationTime = (themeId) => {
  // api/reservation
  fetch(`${BASE_URL}/mocks/db`)
}

//날짜별 예약 현황
const getReservationDate = (themeId, date) => {
  // api/reservation/date
  fetch(`${BASE_URL}/mocks/db`)
}

//예약하기
const postReservation = ({themeId, reservationDate, reservationTime}) => {
  // api/reservation
  fetch(`${BASE_URL}/mocks/db`)
}

// 닉네임 유효성 검사
const getSearchUser = () => {
  // api/reservation
  fetch(`${BASE_URL}/mocks/db`)
}

// 양도
const putReservationTransfer = (reservationId,targetId) => {
  // api/reservation/transfer
  fetch(`${BASE_URL}/mocks/db`)
}

export const reservationApi = { getMypageActs, getReservationDetail, getReservationTime, getReservationDate, 
  postReservation, getSearchUser, putReservationTransfer};

