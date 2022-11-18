import React from "react";
import { TouchableOpacity, Image, View, Linking, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Ionicons, Fontisto, FontAwesome5  } from "@expo/vector-icons";
import { BestBadge, Container, IconContainer, MainContentWrapper, MainSubTitle, MainTextContainer, MainTitle, RepThemeContainer, StoreImgContainer, SubContentWrapper, styles } from "../styles/Search/CafeList";


export default function SearchCafeList({
  storeId,
  storeName,
  storeImg,
  storeTel,
  storeHomepage,
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
            <ImageBackground
              source={ storeImg 
                ? {uri:`https://3blood-img-upload.s3.ap-northeast-1.amazonaws.com/${storeImg}`} 
                : {uri:'https://3blood-img-upload.s3.ap-northeast-1.amazonaws.com/NoImage.png'}} 
              style={styles.storeImg} blurRadius={3} />
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
                onPress={()=>{ Linking.openURL(`tel:+${storeTel}`)}}
              />
              <Ionicons
                name="md-logo-instagram"
                size={20}
                color="black"
                style={{ marginHorizontal: 8 }}
                onPress={()=>{ Linking.openURL(`${storeHomepage}`)}}
              />
              <Ionicons
                name="md-location-sharp"
                size={20}
                color="black"
                style={{ marginLeft: 4 }}
                onPress={()=>{ Linking.openURL(`http://map.naver.com/?query=${storeAddress}`)}}
              />
            </IconContainer>
          </MainTextContainer>
          <RepThemeContainer>
            <Image 
            source={ themeImg 
              ? {uri:`https://3blood-img-upload.s3.ap-northeast-1.amazonaws.com/${themeImg}`} 
              : {uri:'https://3blood-img-upload.s3.ap-northeast-1.amazonaws.com/NoImage.png'}} 
            style={styles.img} />
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


