import { SecureState } from "../store/SecureStore";

const BASE_URL = "http://k7c104.p.ssafy.io:8080/api";
const BASE_URL2 = "https://my-json-server.typicode.com/dm0113";
const ACCESS_TOKEN = SecureState.getData('accessToken');
// const Token = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ5b29qaDQ1NkBuYXZlci5jb20iLCJyb2xlcyI6IlVzZXIiLCJ1c2VySWQiOjIsImlzcyI6ImVzY2FwZWRpY3Rpb25hcnkuY29tIiwiaWF0IjoxNjY4NDA4MzIxLCJleHAiOjE2Njg0OTQ3MjF9.FkbJ_SprhWX_Fvqgd7ezkt3d0rB_0-48JfL9zD2XED4`
const Token = `Bearer ${ACCESS_TOKEN}`

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
export const getPreloading = (mapX, mapY) => {
  // /api/mainpage
  fetch(`${BASE_URL}/mocks/db`)
}



// 검색
const getSearch = async ({ queryKey }) => {
  let [_, query] = queryKey
  query = new URLSearchParams({
    searchWord: await SecureState.getData("accessToken")
  })
  const response = await (await fetch(`${BASE_URL}/mainpage/search?${query}`,{
    headers : {
      Authorization : await SecureState.getData("accessToken")
    }
  })).json()
  return response
}

const getCafeDetail = async({queryKey}) => {
  let [_, storeId] = queryKey
  return await (await fetch(`${BASE_URL}/book/store/${storeId}`,{
    headers : {
      Authorization : await SecureState.getData("accessToken")
    }
  })).json();
}

const getThemeDetail = async({queryKey}) => {
  let [_, themeId] = queryKey
  return await (await fetch(`${BASE_URL}/book/theme/${themeId}`,{
    headers : {
      Authorization : await SecureState.getData("accessToken")
    }
  })).json();
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
const getReservationTime = async({queryKey}) => {
  let [_, themeId] = queryKey
  themeId = new URLSearchParams({
    themeId: themeId
  })
  return await (await fetch(`${BASE_URL}/reservation?${themeId}`,{
    headers : {
      Authorization : await SecureState.getData("accessToken")
    }
  })).json();
}

//날짜별 예약 현황
const getReservationDate = async({queryKey}) => {
  let [_, themeId, date] = queryKey
  themeId = new URLSearchParams({
    themeId: themeId,
    date: date
  })
  return await (await fetch(`${BASE_URL}/reservation/date?${themeId}`,{
    headers : {
      Authorization : await SecureState.getData("accessToken")
    }
  })).json();
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



// 커뮤니티
const getCommunityList = (head, page) => {
  // api/community
  return fetch(`${BASE_URL2}/communityList/db`).then((res) => res.json())
}
const getCommunitySearch = (searchWord) => {
  // api/community/search
  return fetch(`${BASE_URL2}/communitySearch/db`).then((res) => res.json())
}
const getCommunityDetail = (articleId) => {
  // api/community/{articleId}
  return fetch(`${BASE_URL2}/communityDetail/db`).then((res) => res.json())
}

export const communityApi = { getCommunityList, getCommunitySearch, getCommunityDetail};
