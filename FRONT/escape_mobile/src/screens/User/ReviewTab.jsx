import React, { useState, useRef } from 'react';
import styled from 'styled-components/native';
import theme from '../../../theme';
import {Image,StyleSheet,FlatList,useWindowDimensions, ImageBackground, Button, Text, View, TextInput, Dimensions, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity, Alert } from 'react-native';
const { width: SCREEN_WIDTH } = Dimensions.get('window');

const data = [
  {
    'reviewId': 1,
    'themeTitle':'킹스맨',
    'content':'타인보다 우수하다고 해서 고귀한 것은 아니다. 과거의 자신보다 우수한 것이야 말로 진정으로 고귀한 것이다.',
    'reviewImg': 'https://pbs.twimg.com/media/E80HdMrUcAQv4hi.jpg',
  },
  {
    'reviewId': 2,
    'themeTitle':'킹스맨',
    'content':'타인보다 우수하다고 해서 고귀한 것은 아니다. 과거의 자신보다 우수한 것이야 말로 진정으로 고귀한 것이다.',
    'reviewImg': 'https://pbs.twimg.com/media/E80HdMrUcAQv4hi.jpg',
  },
  {
    'reviewId': 3,
    'themeTitle':'킹스맨',
    'content':'타인보다 우수하다고 해서 고귀한 것은 아니다. 과거의 자신보다 우수한 것이야 말로 진정으로 고귀한 것이다.',
    'reviewImg': 'https://pbs.twimg.com/media/E80HdMrUcAQv4hi.jpg',
  },
  {
    'reviewId': 4,
    'themeTitle':'킹스맨',
    'content':'타인보다 우수하다고 해서 고귀한 것은 아니다. 과거의 자신보다 우수한 것이야 말로 진정으로 고귀한 것이다.',
    'reviewImg': 'https://pbs.twimg.com/media/E80HdMrUcAQv4hi.jpg',
  }
]
export default function ReviewTab() {

  function RenderReview({item}) {
    // const [isImage, setIsImage] = useState(true)
    return (
      <RenderView>

        {/* 이미지 */}
        <ImageView>
          <Image source={{uri:item.reviewImg}} style={styles.tinyImage}/>
        </ImageView>

        {/* 제목 */}
        <TitleView>
          <TitleTxt>{item.themeTitle}</TitleTxt>
        </TitleView>


        {/* 리뷰내용 */}
        <ContentView>
          <ContentTxt>{item.content}</ContentTxt>
        </ContentView>

      

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