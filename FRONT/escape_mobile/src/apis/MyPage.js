import { ContentType } from 'react-native-ui-lib/src/components/skeletonView';
import { SecureState } from "../store/SecureStore";
import axios from "axios";
const BASE_URL = "http://k7c104.p.ssafy.io:8080/api";
const ACCESS_TOKEN = SecureState.getData('accessToken');
const Token = `Bearer ${ACCESS_TOKEN}`


// 닉네임 수정
export const putNickName = async (nickname) => { 
  console.log(nickname)
  const response = await (await fetch(`${BASE_URL}/mypage/update`, {
    method: 'put',
    headers: {
      Authorization: await SecureState.getData('accessToken'),
      "Content-Type": "application/json",
      // Authorization : Token
    },
    body: JSON.stringify({
      "nickname": nickname
    })
  }))//.json()
  return response
}

//짬한 테마
export const getLikeTheme = async ({ queryKey }) => { 
  console.log('getLikeTheme');
  const response = await (await fetch(`${BASE_URL}/mypage/likes?page=0`, {
    headers: {
      Authorization : await SecureState.getData('accessToken')
      // Authorization : Token
    }
  })).json()
  console.log(response);
  return response
}


//나의 리뷰 보기
export const getMyReview = async () => {
  const query = new URLSearchParams({
    page: 0
  });
  console.log('주소',`${BASE_URL}/mypage/reviews?${query}`)
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
  console.log('postReview')
  const {themeId,bookId,rating,active,different,horror,interrior,story,locker,reviewImg,textAreaValue } = queryKey[1]
  const data = {
    bookId: bookId,
    content: textAreaValue,
    feelActivity: active,
    feelDifficulty: different,
    feelHorror: horror,
    feelInterrior: interrior,
    feelStory: story,
    locker: locker,
    reviewImg: reviewImg,
    star: rating,
    themeId: themeId
}
  const res = await axios({
    url: `${BASE_URL}/review`,
    method: "post",
    data: JSON.stringify(data),
    headers: {
      Authorization: await SecureState.getData("accessToken"),
      "Content-Type": "application/json",
    },
  });
  return res;
}
//리뷰 삭제 하기
// export const delReview = async ({ queryKey }) => {
//   console.log('delReview')
//   let [_, reviewId] = queryKey;

//   const res = await axios({
//     url: `${BASE_URL}/review/${reviewId}`,
//     method: "delete",
//     data: JSON.stringify(data),
//     headers: {
//       Authorization: await SecureState.getData("accessToken"),
//       "Content-Type": "application/json",
//     },
//   });
//   return res;
// }

export const delReview = async ({ queryKey }) => {
  console.log('delReview')
  let [_, reviewId] = queryKey;

  const res = await axios({
    url: `${BASE_URL}/review/${reviewId}`,
    method: "delete",
    headers: {
      Authorization: await SecureState.getData("accessToken"),
      "Content-Type": "application/json",
    },
  });
  console.log(res);
  return res;
}


//회원탈퇴
export const postSignOut = async({ queryKey }) => {
  const response = await (await fetch(`${BASE_URL}/user/kakao`,{
    method:'POST',
    headers: {
      Authorization : await SecureState.getData('accessToken')
    }
  })).json()
  return response 
}

//로그아웃
export const delLogOut = async ({ queryKey }) => {
  const response = await (await fetch(`${BASE_URL}/user/logout`, {
    method: 'DELETE',
    headers: {
      Authorization: await SecureState.getData('accessToken')
    }
  })).json()
  return response
}
