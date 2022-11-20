import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components/native';
import theme from '../../../theme';
import {Image,StyleSheet,FlatList,useWindowDimensions, ImageBackground, Button, Text, View, TextInput, Dimensions, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity, Alert } from 'react-native';
const { width: SCREEN_WIDTH } = Dimensions.get('window');
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import StarRating from 'react-native-star-rating-widget';
import { useQuery } from '@tanstack/react-query';
import { getMyReview, delReview } from '../../apis/MyPage';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { ReviewIdData } from "../../store/Atom";


//리뷰 컴포넌트
export function RenderReview({ items }) {
  const navigation = useNavigation()
  const {item } = items
  console.log(item);

  const rating = item.star / 2

  const { data: reviewData, refetch } = useQuery(
    ["ReviewResult", item.reviewId],
    delReview,
    { enabled: false }
  );

  return (
    <RenderView>
      {/* 리뷰 이미지 | 이미지 링크가 없을땐 출력 x, 있으면 이미지 o */}
      {item.reviewImg == '' ?
          <></> :
          <ImageView><Image source={{uri:`https://pureblood3-image-for-user.s3.ap-northeast-2.amazonaws.com/${item.reviewImg}`}} style={styles.tinyImage}/></ImageView>}
      {/* 리뷰의 제목 */}
      <TitleView>
        <TitleTxt>{item.themeTitle}</TitleTxt>
      </TitleView>
      {/* 별점 */}
      <StarView>
        <StarRating
          rating={rating}
          starSize={20}
        />
        {/* <Ionicons name="star" size={20} color="yellow" />
        <StarTxt>{item.star}</StarTxt> */}
      </StarView>
      {/* 난이도 */}
      <DiffView>
        <DiffTxt>난이도</DiffTxt>
        <DiffNum>{item.diff}</DiffNum>
      </DiffView>
      {/* 리뷰내용 */}
      <ContentView>
        <ContentTxt>{item.content}</ContentTxt>
      </ContentView>
      {/* 수정 삭제 버튼 */}
      <BtnView>
        {/* <UpdateBtn>
          <UpdateTxt
          onPress={() => {
          navigation.navigate("ReviewCreateScreen");
          }}>수정</UpdateTxt>
        </UpdateBtn> */}

        {/* 삭제 버튼@!@@!! */}
        <DeleteBtn>
          <DeleteTxt onPress={() => {refetch().then(navigation.replace('MypageMoreScreen'))}}>삭제</DeleteTxt>
        </DeleteBtn>
      </BtnView>
    </RenderView>
  )
}


export default function ReviewTab() {
  const navigation = useNavigation();
  const { data } = useQuery(['myReview'], getMyReview)
  useEffect(() => { console.log(data); }, [data])


  // useEffect(() => {
  //   console.log(reviewData);
  // }, [reviewData])

  return (
    <Container>
      {/* {data.map((item, index) => <RenderReview key={index} {...item} />)} */}
      <FlatList
        data={data}
        renderItem={(object) => <RenderReview items={object}/>}
        keyExtractor={(data) => data.reviewId}
        style={{ margin: 20 }}
      />
    </Container>
  )
}

const styles = StyleSheet.create({
  tinyImage: {
    width: SCREEN_WIDTH-50,
    height: SCREEN_WIDTH-50,
    resizeMode: "cover",
    borderRadius: 10,
    margin: 0,
  },
});

const Container = styled.View`
  flex:1;
  justify-content:center;
  align-items:center;
`
const RenderView = styled.View`
  margin: 10px;
`

const TitleView = styled.View`
  margin: 10px 0;
`
const ImageView = styled.View`
  
`
const ContentView = styled.View`
  
`
const TitleTxt = styled.Text`
  font-family: "SUIT-Bold";
  font-size:  ${({ theme }) => theme.fontSizes.title1};
  line-height:  ${({ theme }) => theme.fontHeight.title1};
  color: white;
`
const ContentTxt = styled.Text`
  font-family: "SUIT-Medium";
  font-size:  ${({ theme }) => theme.fontSizes.body};
  line-height:  ${({ theme }) => theme.fontHeight.body};
  color: white;
`

const StarView = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
`

const StarTxt = styled.Text`
  font-family: "SUIT-Medium";
  font-size:  ${({ theme }) => theme.fontSizes.body};
  line-height:  ${({ theme }) => theme.fontHeight.body};
  color: white;
  margin-left: 10px;
`

const DiffView = styled(StarView)`
  flex-direction: row;
`
const DiffTxt = styled.Text`
  font-family: "SUIT-Medium";
  font-size:  ${({ theme }) => theme.fontSizes.body};
  line-height:  ${({ theme }) => theme.fontHeight.body};
  color: white;
  margin-right:5px;
`
const DiffNum = styled(DiffTxt)`
  font-family: "SUIT-Bold";

`
const BtnView = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`

const DeleteBtn = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.point};
  border-radius: 10px;
  padding: 5px;
  margin: 5px;
`
const UpdateBtn = styled(DeleteBtn)`
  background-color: cornsilk;
`
const DeleteTxt = styled.Text`
  color: white;
  font-family: "SUIT-Bold";
  font-size:  ${({ theme }) => theme.fontSizes.caption1};
  line-height:  ${({ theme }) => theme.fontHeight.caption1};
`
const UpdateTxt = styled(DeleteTxt)`
  
`