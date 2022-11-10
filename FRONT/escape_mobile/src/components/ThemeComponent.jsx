import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { LinearGradient } from "expo-linear-gradient";
import styled from "styled-components/native";
const cardImage = require("../assets/mocks/image.png");

function ThemeComponent({
  themeId,
  themeName,
  storeName,
  themeImg,
  likeCount,
  star,
  randomReview,
}) {
  const navigation = useNavigation();
  return (
    <ThemePosterContainer 
      onPress={() => {
        navigation.navigate("ThemeDetailScreen", { themeId: themeId });
      }}
    >
      <LinearGradient
        colors={["#21212120", "#212121"]}
        style={{
            height: 323,
            width: 200,
            position: "absolute",
            zIndex: 3,
            // elevation: 3,
            borderRadius: 8,
          }}
      />
      <Image source={cardImage} style={styles.img} />
      <MainTitle>{themeName}</MainTitle>
      {/* <Text>{themeImg}</Text> */}
      <Description>{likeCount}좋아요 칩으로 등록</Description>
      <Description>{star}별점 아이콘으로 등록</Description>
      <Description>
        {randomReview ? `"${randomReview}"` : '"등록된 리뷰가 없어요"'}
      </Description>
    </ThemePosterContainer>
  );
}

export default ThemeComponent;

const ThemePosterContainer = styled.TouchableOpacity`
  margin-top: 40px;
  align-items: center;
`;
const MainTitle = styled.Text`
  margin-top: 20px;
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
    borderRadius: 8,
  },
});
