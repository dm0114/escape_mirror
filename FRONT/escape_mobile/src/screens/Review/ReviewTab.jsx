import React, { useState, useRef } from 'react';
import styled from 'styled-components/native';
import theme from '../../../theme';
import {Image,StyleSheet,FlatList,useWindowDimensions, ImageBackground, Button, Text, View, TextInput, Dimensions, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity, Alert } from 'react-native';
const { width: SCREEN_WIDTH } = Dimensions.get('window');
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import StarRating from 'react-native-star-rating-widget';
// ”star”:9,
// ”diff”:8,
// ”story”:6,
// ”interior”:5,
// ”horror”4,
// ”lock”:60(장치비율),
const data = [
  {
    'reviewId': 1,
    'themeTitle': '킹스맨',
    'content': '타인보다 우수하다고 해서 고귀한 것은 아니다. 과거의 자신보다 우수한 것이야 말로 진정으로 고귀한 것이다.',
    'reviewImg': 'https://pbs.twimg.com/media/E80HdMrUcAQv4hi.jpg',
    'star': 9,
    'diff':8,    
  },
  {
    'reviewId': 2,
    'themeTitle':'킹스맨',
    'content':'타인보다 우수하다고 해서 고귀한 것은 아니다. 과거의 자신보다 우수한 것이야 말로 진정으로 고귀한 것이다.',
    'reviewImg': 'https://pbs.twimg.com/media/E80HdMrUcAQv4hi.jpg',
    'star': 9,
    'diff':8,    
  },
  {
    'reviewId': 3,
    'themeTitle':'킹스맨',
    'content':'타인보다 우수하다고 해서 고귀한 것은 아니다. 과거의 자신보다 우수한 것이야 말로 진정으로 고귀한 것이다.',
    'reviewImg': 'https://pbs.twimg.com/media/E80HdMrUcAQv4hi.jpg',
    'star': 9,
    'diff':8,    
  },
  {
    'reviewId': 4,
    'themeTitle':'킹스맨',
    'content':'타인보다 우수하다고 해서 고귀한 것은 아니다. 과거의 자신보다 우수한 것이야 말로 진정으로 고귀한 것이다.',
    'reviewImg': '',
    'star': 9,
    'diff':8,    
  }
]
export default function ReviewTab() {
  const navigation = useNavigation();
  //리뷰 컴포넌트
  function RenderReview({ item }) {
    const rating = item.star/2
    return (
      <RenderView>
        {/* 리뷰 이미지 | 이미지 링크가 없을땐 출력 x, 있으면 이미지 o */}
        {item.reviewImg == '' ?
            <></> :
            <ImageView><Image source={{uri:item.reviewImg}} style={styles.tinyImage}/></ImageView>}
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
          <UpdateBtn>
            <UpdateTxt
            onPress={() => {
            navigation.navigate("ReviewCreateScreen");
            }}>수정</UpdateTxt>
          </UpdateBtn>
          {/* <DeleteBtn>
            <DeleteTxt>삭제</DeleteTxt>
          </DeleteBtn> */}
        </BtnView>
      </RenderView>
    )
  }


  return (
    <Container>
      {/* {data.map((item, index) => <RenderReview key={index} {...item} />)} */}
      <FlatList
        data={data}
        renderItem={RenderReview}
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
  background-color: #af8181;
  border-radius: 10px;
  padding: 5px;
  margin: 5px;
`
const UpdateBtn = styled(DeleteBtn)`
  background-color: cornsilk;
`
const DeleteTxt = styled.Text`
  font-family: "SUIT-Bold";
  font-size:  ${({ theme }) => theme.fontSizes.caption1};
  line-height:  ${({ theme }) => theme.fontHeight.caption1};
`
const UpdateTxt = styled(DeleteTxt)`
  
`