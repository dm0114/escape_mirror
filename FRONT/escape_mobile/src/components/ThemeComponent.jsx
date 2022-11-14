import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { LinearGradient } from "expo-linear-gradient";
import styled from "styled-components/native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
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
      activeOpacity={1}
      onPress={() => {
        navigation.navigate("ThemeDetailScreen", { themeId: themeId });
      }}
    >
      <LinearGradient
        colors={["#21212110",'#21212120', '#21212130', '#21212140', '#21212140',"#21212140","#21212140","#21212160", '#21212190', '#21212190', '#21212190', '#21212190', '#21212190', '#212121',"#212121", "#212121"]}
        style={{
            height: 363,
            width: 225,
            position: "absolute",
            zIndex: 3,
            // elevation: 3,
            borderRadius: 8,
          }}
      />
      <Image source={cardImage} style={styles.img} />

      {/* <Text>{themeImg}</Text> */}
      <InfoContainer>
        <RowContainer>
          <Chip>
            <Ionicons name="md-heart" size={17} color="#ff5f3f" />
            <ChipText>
              {likeCount}
            </ChipText>
          </Chip>
          <Chip>
            <Ionicons name="md-star" size={17} color="#FF9133" />
            <ChipText>
              {star != -1 ? star : '0'}
            </ChipText>
          </Chip>
        </RowContainer>
        <MainTitle>{themeName}</MainTitle>
        <DescriptionView>
          <FontAwesome name="quote-left" size={24} color="white" />
            <Description>
              {randomReview ? `${randomReview}` : '등록된 리뷰가 없어요'}
            </Description>
          <FontAwesome name="quote-right" size={24} color="white" />
        </DescriptionView>
      </InfoContainer>
    </ThemePosterContainer>
  );
}

export default ThemeComponent;

const InfoContainer = styled.View`
  position: relative;
  top: -84px;
  align-items: center;
  z-index: 999;
  
`
const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  
`
const ThemePosterContainer = styled.TouchableOpacity`
  margin-top: 40px;
  align-items: center;
`;
const Chip = styled.View`
  width: 60px;
  height: 30px;
  margin: 0px 5px 0px 5px;

  flex-direction: row;
  justify-content: center;
  align-items: center;

  border-radius: 40px;
  border-style: solid;
  border-width: 1px;
  border-color: #00000020;

  background-color: #212121;
  
`;
const DescriptionView = styled.View`
  flex-direction: row;
  width: 256px;
  height: 64px;
  overflow-y: hidden;
  justify-content: space-between;
`

const ChipText = styled.Text`
  font-family: "SUIT-SemiBold";
  font-size: ${({ theme }) => theme.fontSizes.caption0};
  line-height: ${({ theme }) => theme.fontHeight.caption0};
  letter-spacing: 1px;
  margin-left: 8px;
  text-align: center;
  color: #fff;
`;

const MainTitle = styled.Text`
  margin-top: 10px;
  margin-bottom: 10px;
  font-family: "SUIT-Bold";
  font-size: ${({ theme }) => theme.fontSizes.title2};
  line-height: ${({ theme }) => theme.fontHeight.title2};
  letter-spacing: -0.5px;
  color: #fff;
  z-index: 999;
`;

const Description = styled.Text`
  font-family: "SUIT-SemiBold";
  margin-top: 10px;
  font-size: ${({ theme }) => theme.fontSizes.body};
  line-height: ${({ theme }) => theme.fontHeight.body};
  letter-spacing: -0.3px;
  color: #ddd;
`;

export const styles = StyleSheet.create({
  img: {
    width: 225,
    height: 360,
    resizeMode: "cover",
    borderRadius: 8,
  },
});
