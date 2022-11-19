import React, { useEffect, useState } from "react";

import styled from "styled-components/native";
import theme from "../../theme"
import { useWindowDimensions, Text, ImageBackground } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import Carousel from "react-native-reanimated-carousel";
import Toggle from "react-native-toggle-element";

import { useQuery } from "@tanstack/react-query";
import { searchApi } from "../apis/api";

const testUri = 'https://3blood-img-upload.s3.ap-northeast-1.amazonaws.com/main_search.gif'
import SearchCafeList from "../components/SearchCafeList";
import SearchThemeList from "../components/SearchThemeList";
import LoadingScreen from "./LoadingScreen";
import ThemeComponent from "../components/ThemeComponent";
import { useNavigation } from "@react-navigation/native";



export default function SearchScreen() {
  /**
   * API
   */
  const [query, setQuery] = useState("");
  const { isLoading, isFetching, data, refetch } = useQuery(
    ["searchCafeAndTheme", query], //토큰 추가
    searchApi.getSearch,
    { enabled: false }
  );

  /**
   * 토글
   */
  const [toggleValue, setToggleValue] = useState(false);
  useEffect(() => {
  }, [toggleValue])

  /**
   * 검색
   */
  const navigation = useNavigation();
  const onChangeText = (text) => setQuery(text);
  const onSubmit = () => {
    if (query === "") {
      return;
    }

    if (toggleValue) {
      return navigation.navigate("CafeSearchScreen", { queryParam: query });
    }
    
    else {
      return navigation.navigate("ThemeSearchScreen", { queryParam: query });
    }
  };

  return (
    <ImageBackground source={{uri:testUri}} style={{flex:1}}>
      <TextContainer>
        <RowContainer>
          <MainText>
            초대 받지 않은 곳을 {"\n"}
            가는 것도 큰 재미이죠.{"\n"}
            새로운 곳에 가보시겠어요?
          </MainText>

        </RowContainer>
        <ToggleContainer>
          {toggleValue 
          ? <ToggleButtonLeft onPress={() => {setToggleValue(false)}}>
              <SubText>테마 검색</SubText>
            </ToggleButtonLeft>
          : <FocusedButtonLeft>
              <FocusedSubText>테마 검색</FocusedSubText>
            </FocusedButtonLeft>
           }
            
            {toggleValue 
            ? <FocusedButtonRight>
                <FocusedSubText>카페 검색</FocusedSubText>
              </FocusedButtonRight>
            : <ToggleButtonRight onPress={() => {setToggleValue(true)}}>
                <FocusedSubText>카페 검색</FocusedSubText>
              </ToggleButtonRight>
            }
        </ToggleContainer>
      </TextContainer>
      <SearchTextInput
        placeholder={toggleValue ? "카페를 입력하세요." : "테마를 입력하세요."}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        autoComplete ='off'
        caretHidden={true}
      />
      {/* <SerachResultView>
        <SearchResult />
      </SerachResultView> */}
    </ImageBackground>
  );
}


/**
 * 뷰
 */
const RowContainer = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`

const TextContainer = styled.View`
  padding-left: ${({ theme }) => theme.screenMargin.padding};
  padding-right: ${({ theme }) => theme.screenMargin.padding};
  padding-top: ${({ theme }) => theme.screenMargin.paddingTop};
  margin-left: ${({ theme }) => theme.screenMargin.titleLeftMargin};
  margin-right: ${({ theme }) => theme.screenMargin.titleLeftMargin};
  margin-bottom: ${({ theme }) => theme.screenMargin.marginBottom};
`;

const ThemeListScroll = styled.FlatList``;

const CafeListScroll = styled.FlatList``;

const SearchView = styled.View`
  flex: ${(props) => props.flex};
  background-color: ${(props) => props.backgroundColor};
  justify-content: center;
`;

const SerachResultView = styled.View`
  /* background-color: #212121; */
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  height: 100%;
`

const ToggleContainer = styled.View`
  margin-top: 40px;
  margin-bottom: 10px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`
const ToggleButton = styled.TouchableOpacity`
  padding: 10px 30px 10px 30px;
  border-width: 1px;
  border-style: solid;
`
const ToggleButtonLeft = styled(ToggleButton)`
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;  
  border-color: #fff;
  border-right-width: 0;
`
const FocusedButtonLeft = styled(ToggleButton)`
  background-color: #ff5f3f;
  border-color: #ff5f3f;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
`
const ToggleButtonRight = styled(ToggleButton)`
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  border-width: 1px;
  border-style: solid;
  border-color: #fff;
  border-left-width: 0;
`
const FocusedButtonRight = styled(ToggleButton)`
  background-color: #ff5f3f;
  border-color: #ff5f3f;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
`


/**
 * 요소
 */
const SearchTextInput = styled.TextInput`
  background-color: #fff;
  padding: 8px 16px;
  margin: 0px 20px 20px 20px;
  border-color: #fff;
  border-radius: 20px;

  text-align: center;
`;


/**
 * 텍스트
 */
const MainText = styled.Text`
  font-family: "SUIT-Bold";
  font-size: ${({ theme }) => theme.fontSizes.title2};
  color: #fff;
  line-height: ${({ theme }) => theme.fontHeight.title2};
  letter-spacing: -1px;
`;

const SubText = styled.Text`
  font-family: "SUIT-SemiBold";
  font-size: ${({ theme }) => theme.fontSizes.body2};
  /* color: #ff5f3f; */
  color: #fff;
`;
const FocusedSubText = styled.Text`
  font-family: "SUIT-SemiBold";
  font-size: ${({ theme }) => theme.fontSizes.body2};
  color: #fff;
`;



const ErrorText = styled.Text`
  font-family: "SUIT-Bold";
  font-size: ${({ theme }) => theme.fontSizes.title3};
  line-height: ${({ theme }) => theme.fontHeight.title3};
  letter-spacing: -0.5px;
  color: #fff;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
`