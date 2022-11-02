import React, { useState } from "react";
import styled from "styled-components/native";

import { useQuery } from "@tanstack/react-query";
import { searchApi } from "../apis/api";
import { ScrollView } from "react-native-gesture-handler";
import { Text, View } from "react-native";

function ThemeDetailScreen({navigation}) {
  const [query, setQuery] = useState("");
  const { isLoading, data } = useQuery(
    ["ThemeDetail", query],
    searchApi.getThemeDetail
  );
  
  const ThemeDatas = {
    themeId: 3,
    themeName: "비밀의 가족",
    genre: "공포/스릴러",
    capacity: "2인 이상",
    price: "/44000/66000/88000/110000",
    difficulty: 8,
    leadtime: 60,
    description: "string(상세설명)",
    themeImg: "url",
    star: 8,
    feeldifficulty: 8,
    feelstrory: 8,
    feelinterior: 8,
    feelactivity: 6,
    feelhorror: 8,
    lock: 60,
    reviews: [
      {
        reviewId: 4,
        User: "리뷰 작성자",
        content: "리뷰 내용",
        star: 8,
        reviewImg: "리뷰이미지 링크",
        created_at: "2022-08-08",
        clearDate: "2022-08-01",
        usedHint: 3,
        clearTime: "76:52",
      },
      {
        reviewId: 5,
        User: "리뷰 작성자",
        content: "리뷰 내용",
        star: 8,
        reviewImg: "리뷰이미지 링크",
        created_at: "2022-08-08",
        clearDate: "2022-08-01",
        usedHint: 3,
        clearTime: "76:52",
      }
    ],
    noHintRanking: [
      {
        userNickname: "방탈출랭커",
        cleartime: "72:12",
      },
    ],
    hintRanking: [
      {
        userNickname: "방탈출고수",
        cleartime: "72:12",
        usedHint: 4,
      },
    ],
  };
  return (
    <MainContainer>
      <Container>
        {/* themeImg 넣기 */}
        <CafeImage />
        <TextContainer>
          <Title>{ThemeDatas.themeName}</Title>
          <SubTitle>{ThemeDatas.star}점</SubTitle>
          <RowContainer>
            <SubTitle>{ThemeDatas.leadtime}분 | </SubTitle>
            <SubTitle>난이도 {ThemeDatas.difficulty} | </SubTitle>
            <SubTitle>{ThemeDatas.capacity} </SubTitle>
          </RowContainer>
          <SubTitle>{ThemeDatas.price}</SubTitle>
        </TextContainer>
      </Container>
      <RowContainer>
        <Title>별점</Title>
        <Title>스탯</Title>
      </RowContainer>
      <SubTitle>{ThemeDatas.description}</SubTitle>
      <Title>리뷰</Title>
      <View>
        {ThemeDatas.reviews.map((item) => {
          return (
            <TmpContainer key={item.reviewId}>
              <Text>{item.User}</Text>
              <Text>{item.content}</Text>
              <Text>{item.star}</Text>
              <Text>{item.reviewImg}</Text>
              <Text>{item.created_at}</Text>
              <Text>{item.clearDate}</Text>
              <Text>{item.usedHint}</Text>
              <Text>{item.clearTime}</Text>
            </TmpContainer>
          )})}
      </View>       
        <Title>힌트 랭킹</Title>        
        <View>{
          ThemeDatas.hintRanking.map((item, index) => {
                  return (
                    <TmpContainer key={index}>
                      <Text>{item.userNickname}</Text>
                      <Text>{item.clearTime}</Text>
                      <Text>{item.usedHint}</Text>
                    </TmpContainer>
                  )})
        }</View>
        <Title>노힌트 랭킹</Title>
        <View>{
          ThemeDatas.noHintRanking.map((item, index) => {
                  return (
                    <TmpContainer key={index}>
                      <Text>{item.userNickname}</Text>
                      <Text>{item.clearTime}</Text>
                    </TmpContainer>
                  )})
        }</View>
      {/* store LikeButton 추가 */}
      <ButtonContainer
        onPress={() => {navigation.navigate('PostReservationScreen', {
          themeName: ThemeDatas.themeName,
          leadtime: ThemeDatas.leadtime,
          price: ThemeDatas.price,
          themeImg: ThemeDatas.themeImg,
        })}}
      >
        <Text>예약하기</Text>
      </ButtonContainer>
    </MainContainer>
  );
}

export default ThemeDetailScreen;

const MainContainer = styled.ScrollView`
  
`
const Container = styled.View`
  flex-direction: row;
  margin-bottom: 16px;
  align-items: center;
`;

const TextContainer = styled.View`
  margin-left: 16px;
`;
const RowContainer = styled.View`
  flex-direction: row;
`;

// 추후 이미지 태그로 대체
const CafeImage = styled.View`
  width: 100px;
  height: 160px;
  background-color: gray;
`;
const Title = styled.Text`
  font-family: "SUIT-SemiBold";
  font-size: ${({ theme }) => theme.fontSizes.body};
  color: #fff;
  margin-bottom: 8px;
`;
const SubTitle = styled.Text`
  font-family: "SUIT-Bold";
  font-size: ${({ theme }) => theme.fontSizes.caption1};
  color: #fff;
`;

const ButtonContainer = styled.TouchableOpacity`
  width: 256px;
  height: 64px;
  border-radius: 40px;
  background-color: #f9dc87;
`;

const TmpContainer = styled.View`
  background-color: #fff;
`