import { SecureState } from "../store/SecureStore";
const BASE_URL = "http://k7c104.p.ssafy.io:8080/api";
const ACCESS_TOKEN = SecureState.getData('accessToken');
const Token = `Bearer ${ACCESS_TOKEN}`

//짬한 테마
export const getLikeTheme = async ({ queryKey }) => { 
  const response = await (await fetch(`${BASE_URL}/mypage/likes?page=0`, {
    headers: {
      Authorization : await SecureState.getData('accessToken')
      // Authorization : Token
    }
  })).json()
  return response
}


//나의 리뷰 보기
const getMyReview = async ({ queryKey }) => {
  const query = new URLSearchParams({
    page: 0
  });
  return await (
    await fetch(`${BASE_URL}/mypage/reviews?${query}`, {
      headers: {
        Authorization: await SecureState.getData("accessToken"),
      },
    })
  ).json();
};
// export const getMyReview = async ({ queryKey }) => { 
//   const response = await (await fetch(`${BASE_URL}/mypage/reviews?page=0`, {
//     headers: {
//       Authorization : await SecureState.getData('accessToken')
//       // Authorization : Token
//     }
//   })).json()
//   return response
// }

//리뷰 작성을 위해 마이페이지 활동내역 get
export const getActiveLog = async ({ queryKey }) => { 
  const response = await (await fetch(`${BASE_URL}/mypage/acts`, {
    headers: {
      Authorization : await SecureState.getData('accessToken')
      // Authorization : Token
    }
  })).json()
  return response
}




//나의 정보
export const getMyInfo = async ({ queryKey }) => { 
  const response = await (await fetch(`${BASE_URL}/mypage`, {
    headers: {
      // Authorization : Token
      Authorization : await SecureState.getData('accessToken')
    }
  })).json()
  return response
}

//리뷰 작성 하기
export const postReview = async ({ queryKey }) => {
  const response = await (await fetch(`${BASE_URL}/review`, {
    method:'POST',
    headers: {
      // Authorization: Token
      Authorization: await SecureState.getData('accessToken')
    },
    body: {
      
    }
  })).json()
  return response
}