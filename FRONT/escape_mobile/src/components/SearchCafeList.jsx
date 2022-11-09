import React from "react";
import { TouchableOpacity, Image, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Ionicons, Fontisto, FontAwesome5  } from "@expo/vector-icons";
import { BestBadge, Container, IconContainer, MainContentWrapper, MainSubTitle, MainTextContainer, MainTitle, RepThemeContainer, StoreImgContainer, SubContentWrapper, styles } from "../styles/Search/CafeList";
const cardImage = require("../assets/mocks/image.png");
const storeImage = require("../assets/mocks/storeImg.png");

export default function SearchCafeList({
  storeId,
  storeName,
  storeImg,
  storeAddress,
  likeCount,
  mostReviewedTheme,
}) {
  const navigation = useNavigation();
  const { themeId, themeName, themeImg, star } = mostReviewedTheme;
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("CafeDetailScreen", { storeId: storeId });
      }}
    >
      <Container mb="60px">
        <MainContentWrapper>
          <StoreImgContainer>
            <View style={styles.storeImgContainer} />
            <Image source={storeImage} style={styles.storeImg} blurRadius={3} />
          </StoreImgContainer>
        </MainContentWrapper>

        <SubContentWrapper>
          <MainTextContainer>
            <MainTitle>{storeName}</MainTitle>
            <MainSubTitle>{storeAddress}</MainSubTitle>
            <IconContainer>
              <Ionicons
                name="md-call"
                size={19}
                color="black"
                style={{ marginRight: 4 }}
              />
              <Ionicons
                name="md-logo-instagram"
                size={20}
                color="black"
                style={{ marginHorizontal: 8 }}
              />
              <Ionicons
                name="md-location-sharp"
                size={20}
                color="black"
                style={{ marginLeft: 4 }}
              />
            </IconContainer>
          </MainTextContainer>
          <RepThemeContainer>
            <Image source={cardImage} style={styles.img} />
            {/* <Title>{storeName}</Title> */}
            <BestBadge>
              {/* <SubTitle>BEST</SubTitle> */}
              <FontAwesome5 name="trophy" size={17} color="white" />
              {/* <FontAwesome5 name="medal" size={17} color="white" /> */}
              {/* <Fontisto name="fire" size={17} color="white" /> */}
            </BestBadge>
            
          </RepThemeContainer>
        </SubContentWrapper>
      </Container>
    </TouchableOpacity>
  );
}


