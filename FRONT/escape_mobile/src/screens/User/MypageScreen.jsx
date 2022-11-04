import React, { useState, useRef } from 'react';
import styled from 'styled-components/native';
import theme from '../../../theme';
import { Button, Text, View, TextInput, Dimensions, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// 마이페이지
//프로필 사진, 등급명, 닉네임명, 후기|내가찜한테마|작성한글|예약확인
//등급명 클릭시 등급 안내 모달창

//우측 상단에 톱니바퀴 누르면 수정 페이지로
//수정할 것 : 프로필 사진, 닉네임 명, 비밀번호
//이 상태에 회원탈퇴와 로그아웃까지
export default function MypageScreen() {
  const navigation = useNavigation();

  //edit가 False일 때 : 마이페이지 뷰 
  //edit가 True일 때 : 수정페이지 뷰
  const [edit, setEdit] = useState(false);

  return (
    <Container>

      
      {/* edit가 FALSE일 때 배경 flex 나누기 */}
      <View flex={1.2} style={{ backgroundColor: "tomato" }}>
      </View>

      {/* 마이페이지 뷰 */}
      <MypageView flex={3} style={{ backgroundColor: "#FBFBFB" }}>
        {/* 프로필 이미지 */}
        <ProfileView>
          <ProfileImg></ProfileImg>
        </ProfileView>

        {/* 톱니 바퀴 - 설정 */}
        <SettingsView>
          <Ionicons name="settings-outline" size={30} color="grey" />
        </SettingsView>

        {/* 등급명 및 닉네임 */}
        <MypageTxtView>
          <GradeTxt>집주인</GradeTxt>
          <NickNameTxt>명탐정 셜록</NickNameTxt>
        </MypageTxtView>

        {/* 후기 | 찜한 테마 | 작성한 글 | 예약 확인 */}
        <FunctionView>
          {/* 찜한 테마 | 예약 확인 */}
          <FunctionRow1>
            <LikeTheme flex={1}>
              <Ionicons name="heart-outline" size={50} color="black" />
              <LikeTxt>찜한 테마</LikeTxt>
              <LikeNum>24</LikeNum>
            </LikeTheme>
            <Reserve flex={1} onPress={() => {navigation.navigate('ReservationScreen')}}>
              <Ionicons name="calendar-sharp" size={45} color="black" />
              <ReserveTxt>예약 확인</ReserveTxt>
              <ReserveNum>24</ReserveNum>
            </Reserve>
          </FunctionRow1>
          {/* 후기 | 작성한 글 */}
          <FunctionRow2>
            <Review>
              <Ionicons name="md-pencil" size={40} color="black" />
              <ReviewTxt>후기</ReviewTxt>
              <ReviewNum>24</ReviewNum>
            </Review>
            <Article>
              <Ionicons name="chatbox-ellipses-outline" size={50} color="black" />
              <ArticleTxt>작성한 글</ArticleTxt>
              <ArticleNum>24</ArticleNum>
            </Article>
          </FunctionRow2>

        </FunctionView>
      </MypageView>

      {/* edit가 TRUE일 때, 수정 뷰 */}
      {/* 프로필 사진 수정 */}

      {/* 확인 버튼 */}

      {/* 업적명 & 닉네임명 */}

      {/* 기존 비밀번호 & 새로운 비밀번호 & 비밀번호 확인 */}

      {/* 회원 탈퇴하기 */}

      {/* 로그아웃 */}

    </Container>
  )
}


const Container = styled.KeyboardAvoidingView `
  flex: 1;
  background-color: tomato;
  /* width:SCREEN_WIDTH, */
`
const MypageView = styled.View`
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;

`
const ProfileView = styled.View`
  justify-content: center;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.screenMargin.marginBottom};
`
const ProfileImg = styled.View`
  position: absolute;
  justify-content: center;
  align-items: center;
  background-color: bisque;
  top: -80px;
  width: 150px;
  height: 150px;
  border-radius: 150px;
  z-index: 999;

`

const SettingsView = styled.TouchableOpacity`
  align-items: flex-end;
  margin: 10px 30px;
`

const MypageTxtView = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: ${({ theme }) => theme.screenMargin.marginBottom};
`

const GradeTxt = styled.Text`
  font-family: "SUIT-Medium";
  font-size:  ${({ theme }) => theme.fontSizes.title2};
  line-height:  ${({ theme }) => theme.fontHeight.title2};
`
const NickNameTxt = styled.Text`
  font-family: "SUIT-Bold";
  font-size:  ${({ theme }) => theme.fontSizes.title1};
  line-height:  ${({ theme }) => theme.fontHeight.title1};
`

const FunctionView = styled.View`
  margin-top: 20px;
  /* 할까말까 */
  margin-left: 25px;
  margin-right: 25px;
`

const FunctionRow1 = styled.View`
  flex-direction: row;
  margin: 0 10px;
`

const FunctionRow2 = styled(FunctionRow1)`
`

const LikeTheme = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: beige;
  border-radius: 10px;
  height: 170px;
  margin: 10px;
`
const Reserve = styled(LikeTheme)`
`
const Review = styled(LikeTheme)`
`
const Article = styled(LikeTheme)`
`
const LikeTxt = styled.Text`
  font-family: "SUIT-Bold";
  font-size :${({ theme }) => theme.fontSizes.body} ;
  line-height:  ${({ theme }) => theme.fontHeight.body};
`
const LikeNum = styled.Text`
  font-family: "SUIT-Bold";
  font-size: ${({ theme }) => theme.fontSizes.title2};
  /* line-height:  ${({ theme }) => theme.fontHeight.title2}; */
`
const ReserveTxt = styled(LikeTxt)`
`
const ReserveNum = styled(LikeNum)`
`
const ReviewTxt = styled(LikeTxt)`
`
const ReviewNum = styled(LikeNum)`
`

const ArticleTxt = styled(LikeTxt)`
`
const ArticleNum = styled(LikeNum)`
`