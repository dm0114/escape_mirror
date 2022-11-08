import React from 'react'
import styled from 'styled-components/native';
import ReservationComponent from '../components/ReservationComponent';


export default function MainScreen() {
  
  // 프리로딩 API 연결
  const data = {
    "reservations": [{
      "reservationId": 1,
      "themeName": "테마이름",
      "storeName": "카페이름",
      "date":"22-02-08",
      "reserveTime":"16:20"
      }
    ],
  }

  return (
    <MainContainer>
      <MainText>
        안녕하세요, {}님.{"\n"}
        오랜만에 저택으로 돌아오셨네요.{"\n"}
        받으신 초대장 목록을 보여드릴게요.
      </MainText>
      {data.reservations.map((item) => {
        return (
          <ReservationComponent 
          key={item.reservationId}
          reservationId={item.reservationId}
          themeName={item.themeName}
          storeName={item.storeName}
          date={item.date}
          reserveTime={item.reserveTime}
        />
        )
      })}
    </MainContainer>
  );
}

const MainContainer = styled.View`
  flex: 1;
  padding-left: ${({ theme }) => theme.screenMargin.padding};
  padding-right: ${({ theme }) => theme.screenMargin.padding};
  padding-top: ${({ theme }) => theme.screenMargin.paddingTop};
`
const MainText = styled.Text`
  font-family: "SUIT-Bold";
  font-size: ${({ theme }) => theme.fontSizes.title2};
  color: #fff;
  line-height: ${({ theme }) => theme.fontHeight.title2};
  margin-left: ${({ theme }) => theme.screenMargin.titleLeftMargin};
  margin-bottom: ${({ theme }) => theme.screenMargin.marginBottom};
`
