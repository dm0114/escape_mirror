import React from "react";
import { Dimensions, ImageBackground } from "react-native";
const { width } = Dimensions.get("window");

import styled from "styled-components/native";
import "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import ReservationComponent from "../components/Reservation/ReservationComponent";

const testUri = 'https://3blood-img-upload.s3.ap-northeast-1.amazonaws.com/main_reservation2.gif'


export default function MainScreen() {
  // 프리로딩 API 연결
  const data = {
    reservations: [
      {
        reservationId: 1,
        themeName: "테마이름",
        storeName: "카페이름",
        date: "22-02-08",
        reserveTime: "16:20",
      },
      {
        reservationId: 2,
        themeName: "테마이름",
        storeName: "카페이름",
        date: "22-02-08",
        reserveTime: "16:20",
      },
      {
        reservationId: 3,
        themeName: "테마이름",
        storeName: "카페이름",
        date: "22-02-08",
        reserveTime: "16:20",
      },
    ],
  };

  return (
    <ImageBackground  source={{uri:testUri}} style={{flex:1}}>
      <MainContainer>
        <MainText>
          안녕하세요, {}님.{"\n"}
          오랜만에 저택으로 돌아오셨네요.{"\n"}
          받으신 초대장 목록을 보여드릴게요.
        </MainText>
        <Carousel
          loop={false}
          width={width - 40}
          height={width / 3.5}
          autoPlay={false}
          data={data.reservations}
          mode={'parallax'}
          modeConfig={
            {
              parallaxScrollingScale: 1,
              parallaxAdjacentItemScale: 0.9
            }
          }
          vertical={true}
          scrollAnimationDuration={2000}
          renderItem={({item}) => (
            <ReservationComponent
              key={item.reservationId}
              reservationId={item.reservationId}
              themeName={item.themeName}
              storeName={item.storeName}
              date={item.date}
              reserveTime={item.reserveTime}
            />
          )}
        />

        {/* {data.reservations.map((item) => {
          return (
            <ReservationComponent
              key={item.reservationId}
              reservationId={item.reservationId}
              themeName={item.themeName}
              storeName={item.storeName}
              date={item.date}
              reserveTime={item.reserveTime}
            />
          );
        })} */}
      </MainContainer>
    </ImageBackground>
  );
}

const MainContainer = styled.View`
  flex: 1;
  padding-left: ${({ theme }) => theme.screenMargin.padding};
  padding-right: ${({ theme }) => theme.screenMargin.padding};
  padding-top: ${({ theme }) => theme.screenMargin.paddingTop};
`;
const MainText = styled.Text`
  font-family: "SUIT-Bold";
  font-size: ${({ theme }) => theme.fontSizes.title2};
  color: #fff;
  line-height: ${({ theme }) => theme.fontHeight.title2};
  margin-left: ${({ theme }) => theme.screenMargin.titleLeftMargin};
  margin-bottom: ${({ theme }) => theme.screenMargin.marginBottom};
`;
