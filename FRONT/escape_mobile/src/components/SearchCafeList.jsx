import React from "react";
import { TouchableOpacity, Image, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { BlurView } from "@react-native-community/blur";

import Ionicons from "@expo/vector-icons/Ionicons";
const cardImage = require("../assets/mocks/image.png");
const storeImage = require("../assets/mocks/storeImg.png");

export default function SearchCafeList({
  storeId,
  storeName,
  storeImg,
  storeAddress,
  likeCount,
}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("CafeDetailScreen");
      }}
    >
      <Container>
        {/* storeImg 넣기 */}
        <MainContentWrapper>
          <StoreImgContainer>
            <View style={styles.storeImgContainer} />
            <Image source={storeImage} style={styles.storeImg} blurRadius={3} />
          </StoreImgContainer>
          <MainTextContainer>
            <MainTitle>{storeName}</MainTitle>
            <MainSubTitle>{storeAddress}</MainSubTitle>
          </MainTextContainer>
        </MainContentWrapper>
        <SubContentWrapper>
          <TextContainer>
            <SubTitle>대표 테마</SubTitle>
            <Title>{storeName}</Title>
          </TextContainer>
          <View style={{elevation: 10}}>
            <Image source={cardImage} style={styles.img} />
          </View>
        </SubContentWrapper>
        {/* store LikeButton 추가 */}
      </Container>
    </TouchableOpacity>
  );
}

// 뷰
const Container = styled.View`
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 8px;
`;
const MainContentWrapper = styled.View`
  height: 80px;
`;
const SubContentWrapper = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  height: 100px;
`;

const StoreImgContainer = styled.View`
  overflow: hidden;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

const MainTextContainer = styled.View`
  position: absolute;
  padding: 20px;
`;
const TextContainer = styled.View`
  align-items: flex-end;
  justify-content: flex-end;
  padding-bottom: 20px;
`;


// 텍스트
const MainTitle = styled.Text`
  font-family: "SUIT-SemiBold";
  font-size: ${({ theme }) => theme.fontSizes.title3};
  line-height: ${({ theme }) => theme.fontHeight.title3};
  color: #fff;
`;
const MainSubTitle = styled.Text`
  font-family: "SUIT-Regular";
  font-size: ${({ theme }) => theme.fontSizes.caption1};
  line-height: ${({ theme }) => theme.fontHeight.caption1};
  color: #fff;
`;
const Title = styled.Text`
  font-family: "SUIT-Bold";
  font-size: ${({ theme }) => theme.fontSizes.title3};
  line-height: ${({ theme }) => theme.fontHeight.title3};
  letter-spacing: -0.1px;
`;
const SubTitle = styled.Text`
  font-family: "SUIT-Regular";
  font-size: ${({ theme }) => theme.fontSizes.caption1};
  line-height: ${({ theme }) => theme.fontHeight.caption1};
`;

// styles
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    height: "20%",
  },
  img: {
    height: 100,
    resizeMode: "contain",
    position: "relative",
    top: -20,
    elevation: 5,
  },
  storeImg: {
    position: 'absolute',
    height: 80,
    resizeMode: "cover",
  },
  storeImgContainer: {
    position: 'relative',
    top: 0,
    left: 0,
    height: 80,
    backgroundColor: '#00000090',
    zIndex: 999,
  }
});
