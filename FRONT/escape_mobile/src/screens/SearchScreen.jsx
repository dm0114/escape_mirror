import React, { useEffect, useState } from "react";
import { ImageBackground } from "react-native";
import styled from "styled-components/native";
import theme from "../../theme"

import { useNavigation } from "@react-navigation/native";
const testUri = 'https://3blood-img-upload.s3.ap-northeast-1.amazonaws.com/main_search.gif'



export default function SearchScreen() {
  /**
   * API
   */
  const [query, setQuery] = useState("");

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
      return navigation.navigate("CafeSearchScreen", { queryParam: query, toggleState: true });
    }
    
    else {
      return navigation.navigate("CafeSearchScreen", { queryParam: query, toggleState: false });
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
              <SubText>테마 검색</SubText>
            </FocusedButtonLeft>
           }
            
            {toggleValue 
            ? <FocusedButtonRight>
                <SubText>카페 검색</SubText>
              </FocusedButtonRight>
            : <ToggleButtonRight onPress={() => {setToggleValue(true)}}>
                <SubText>카페 검색</SubText>
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


export const ToggleContainer = styled.View`
  margin-top: 40px;
  margin-bottom: 10px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`
export const ToggleButton = styled.TouchableOpacity`
  padding: 10px 30px 10px 30px;
  border-width: 1px;
  border-style: solid;
`
export const ToggleButtonLeft = styled(ToggleButton)`
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;  
  border-color: #fff;
  border-right-width: 0;
`
export const FocusedButtonLeft = styled(ToggleButton)`
  background-color: #ff5f3f;
  border-color: #ff5f3f;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
`
export const ToggleButtonRight = styled(ToggleButton)`
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  border-width: 1px;
  border-style: solid;
  border-color: #fff;
  border-left-width: 0;
`
export const FocusedButtonRight = styled(ToggleButton)`
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
export const FocusedSubText = styled.Text`
  font-family: "SUIT-SemiBold";
  font-size: ${({ theme }) => theme.fontSizes.body2};
  color: #fff;
`;