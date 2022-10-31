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
  return fetch(`${BASE_URL}/mocks/db`).then((res) => res.json())
}

const getCafeDetail = () => {
  // api/book/store/{storeId}
  fetch(`${BASE_URL}/mocks/db`).then((res) => res.json());
}

const getThemeDetail = () => {
  // api/book/theme/{themeId}
  fetch(`${BASE_URL}/mocks/db`).then((res) => res.json());

}

export const searchApi = { getSearch, getCafeDetail, getThemeDetail };


// 예약
export const getReservationTime = (themeId) => {
  // api/reservation
  fetch(`${BASE_URL}/mocks/db`)
}

export const getReservationDate = (themeId, date) => {
  // api/reservation/date
  fetch(`${BASE_URL}/mocks/db`)
}

export const postReservation = ({themeId, reservationDate, reservationTime}) => {
  // api/reservation
  fetch(`${BASE_URL}/mocks/db`)
}

export const getSearchUser = () => {
  // api/reservation
  fetch(`${BASE_URL}/mocks/db`)
}


// 양도
export const putReservationTransfer = (reservationId,targetId) => {
  // api/reservation/transfer
  fetch(`${BASE_URL}/mocks/db`)
}