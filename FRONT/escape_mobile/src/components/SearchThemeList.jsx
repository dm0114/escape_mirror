import React from "react";
import { TouchableOpacity, Text, Image } from "react-native";

import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";

import Ionicons from "@expo/vector-icons/Ionicons";
const cardImage = require("../assets/mocks/image.png");

export default function SearchThemeList({
  themeId,
  themeName,
  storeName,
  themeImg,
  likeCount,
  star,
  randomReview
}) {
  const navigation = useNavigation();

  return (
    <MainContainer
      onPress={() => {
        navigation.navigate("ThemeDetailScreen", { themeId: themeId });
      }}
    >
      <Container>
        <CafeImage>
          <Image source={cardImage} />
        </CafeImage>
        <TextContainer>
          <Title>{themeName}</Title>
          <SubTitle>{storeName}</SubTitle>
          <IconWrapper>
            <IconContainer>
              <Ionicons name="star" size={17} color="black" />
              <IconStyle>{star}</IconStyle>
            </IconContainer>
            <IconContainer>
              <Ionicons name="heart" size={17} color="red" />
              <IconStyle>{likeCount}</IconStyle>
            </IconContainer>
          </IconWrapper>
        </TextContainer>
      </Container>
      <ReviewWrapper>
        <ReviewContainerDesign />
        <ReviewContainer>
          <Text>{`"${randomReview}"`}</Text>
        </ReviewContainer>
      </ReviewWrapper>
    </MainContainer>
  );
}
const MainContainer = styled.TouchableOpacity`
  background-color: #fff;
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 8px;
  margin-top: 80px;
  margin-bottom: 60px;
  margin-left: 20px;
  margin-right: 20px;
`;
const Container = styled.View`
  flex-direction: row;
`;

const TextContainer = styled.View`
  margin-top: 20px;
  margin-left: 40px;
  margin-right: 20px;
`;

const IconWrapper = styled.View`
  width: 60%;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 20px;
`;

const IconContainer = styled.View`
  flex-direction: row;
`;

const CafeImage = styled.View`
  position: relative;
  top: -50px;
  width: 100px;
  height: 160px;
  border-radius: 10px;
  background-color: gray;
`;

const ReviewWrapper = styled.View`
  position: relative;
  top: -20px;
`
const ReviewContainerDesign = styled.View`
  margin: auto;
  width: 0;
  height: 0;
  background-color: transparent;
  border-style: solid;
  border-top-width: 0px;
  border-right-width: 10px;
  border-bottom-width: 10px;
  border-left-width: 10px;
  border-top-color: transparent;
  border-right-color: transparent;
  border-bottom-color: #f6f5e9;
  border-left-color: transparent;
`;

const ReviewContainer = styled.View`
  width: 100%;
  margin: auto;
  padding: 20px;

  align-items: center;

  border-radius: 8px;
  background-color: #f6f5e9;
`;

const Title = styled.Text`
  font-family: "SUIT-Bold";
  font-size: ${({ theme }) => theme.fontSizes.title3};
  color: #000;
  margin-bottom: 8px;
`;
const SubTitle = styled.Text`
  font-family: "SUIT-Regular";
  font-size: ${({ theme }) => theme.fontSizes.caption1};
  line-height: ${({ theme }) => theme.fontHeight.caption1};
  color: #000;
`;

const IconStyle = styled.Text`
  font-family: "SUIT-Bold";
  font-size: ${({ theme }) => theme.fontSizes.caption1};
  line-height: ${({ theme }) => theme.fontHeight.caption1};
  vertical-align: middle;
  color: #000;
  margin-left: 4px;
`;
