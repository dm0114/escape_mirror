const BASE_URL = "http://k7c104.p.ssafy.io:8080/api";
const BASE_UR2 = "https://my-json-server.typicode.com/dm0113";
const Token = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkbTEwODAyQGdtYWlsLmNvbSIsInJvbGVzIjoiVXNlciIsInVzZXJJZCI6MSwiaXNzIjoiZXNjYXBlZGljdGlvbmFyeS5jb20iLCJpYXQiOjE2NjgzODg5MjAsImV4cCI6MTY2ODQ3NTMyMH0.8BYTYNSKJE_VHctLsTnZM6PW94StnfS1b7ALNWdvRvU'


//짬한 테마
export const getLikeTheme = async ({ queryKey }) => { 
  const response = await (await fetch(`${BASE_URL}/mypage/likes`, {
    headers: {
      Authorization : Token
    }
  })).json()
  return response
}

//나의 리뷰 보기
export const getMyReview = async ({ queryKey }) => { 
  const response = await (await fetch(`${BASE_URL}/mypage/reviews`, {
    headers: {
      Authorization : Token
    }
  })).json()
  return response
}


//나의 정보
export const getMyInfo = async ({ queryKey }) => { 
  const response = await (await fetch(`${BASE_URL}/mypage`, {
    headers: {
      Authorization : Token
    }
  })).json()
  return response
}

//리뷰 작성 하기
export const postReview = async ({ queryKey }) => {
  const response = await (await fetch(`${BASE_URL}/review`, {
    headers: {
      Authorization:Token
    }
  })).json()
  return response
}