import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import styled from "styled-components/native";

const cardImage = require("../assets/mocks/image.png");


function ThemeComponent({
  themeId,
  themeName,
  storeName,
  themeImg,
  likeCount,
  star,
  randomReview
}) {
  return (
    <ThemePosterContainer>
      <Image source={cardImage} style={styles.img}/>
      <MainTitle>{themeName}</MainTitle>
      <Text>{themeImg}</Text>
      <Text>{likeCount}</Text>
      <Text>{star}</Text>
      <Description>{randomReview ? `"${randomReview}"` : '"등록된 리뷰가 없어요"'}</Description>
    </ThemePosterContainer>
  );
}

export default ThemeComponent;

const ThemePosterContainer = styled.View`
  align-items: center;
`
const MainTitle = styled.Text`
  font-family: "SUIT-Bold";
  font-size: ${({ theme }) => theme.fontSizes.title2};
  line-height: ${({ theme }) => theme.fontHeight.title2};
  letter-spacing: -0.5px;
  color: #fff;
`;

const Description = styled.Text`
  font-family: "SUIT-Medium";
  font-size: ${({ theme }) => theme.fontSizes.body2};
  line-height: ${({ theme }) => theme.fontHeight.body2};
  letter-spacing: 0.3px;
  color: #fff;
`;

export const styles = StyleSheet.create({
  img: {
    width: 200,
    height: 320,
    resizeMode: "cover",
    elevation: 5,
  },
})

