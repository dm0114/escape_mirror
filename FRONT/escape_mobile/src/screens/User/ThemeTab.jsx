import React, { useState, useRef } from 'react';
import styled from 'styled-components/native';
import theme from '../../../theme';
import { Image,StyleSheet,FlatList ,useWindowDimensions, ImageBackground, Button, Text, View, TextInput, Dimensions, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity, Alert } from 'react-native';
import ThemeCompo from '../../components/ThemeCompo';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { getLikeTheme } from '../../apis/MyPage';
// const data = [
//   {
//     'themeId': 1,
//     'themeImg':'https://pbs.twimg.com/media/E80HdMrUcAQv4hi.jpg',
//   },
//   {
//     'themeId': 2,
//     'themeImg':'https://pbs.twimg.com/media/E80HdMrUcAQv4hi.jpg',
//   },
//   {
//     'themeId': 3,
//     'themeImg':'https://pbs.twimg.com/media/E80HdMrUcAQv4hi.jpg',
//   },
//   {
//     'themeId': 4,
//     'themeImg':'https://pbs.twimg.com/media/E80HdMrUcAQv4hi.jpg',
//   },
//   {
//     'themeId': 5,
//     'themeImg':'https://pbs.twimg.com/media/E80HdMrUcAQv4hi.jpg',
//   },
//   {
//     'themeId': 6,
//     'themeImg':'https://pbs.twimg.com/media/E80HdMrUcAQv4hi.jpg',
//   },
//   {
//     'themeId': 7,
//     'themeImg':'https://pbs.twimg.com/media/E80HdMrUcAQv4hi.jpg',
//   },
//   {
//     'themeId': 8,
//     'themeImg':'https://pbs.twimg.com/media/E80HdMrUcAQv4hi.jpg',
//   },
//   {
//     'themeId': 9,
//     'themeImg':'https://pbs.twimg.com/media/E80HdMrUcAQv4hi.jpg',
//   },
//   {
//     'themeId': 10,
//     'themeImg':'https://pbs.twimg.com/media/E80HdMrUcAQv4hi.jpg',
//   },
//   {
//     'themeId': 11,
//     'themeImg':'https://pbs.twimg.com/media/E80HdMrUcAQv4hi.jpg',
//   },
//   {
//     'themeId': 12,
//     'themeImg':'https://pbs.twimg.com/media/E80HdMrUcAQv4hi.jpg',
//   },
//   {
//     'themeId': 13,
//     'themeImg':'https://pbs.twimg.com/media/E80HdMrUcAQv4hi.jpg',
//   },
//   {
//     'themeId': 14,
//     'themeImg':'https://pbs.twimg.com/media/E80HdMrUcAQv4hi.jpg',
//   },
//   {
//     'themeId': 15,
//     'themeImg':'https://pbs.twimg.com/media/E80HdMrUcAQv4hi.jpg',
//   },
// ]
export default function ThemeTab() {
  const navigation = useNavigation();
  const { data } = useQuery(['likeTheme'], getLikeTheme)
  // console.log(data)
  //테마 컴포넌트
  function RenderTheme({ item }) {
    return (
      <RenderView>
        <TouchableOpacity
          onPress={() => {
          navigation.navigate("ThemeDetailScreen", { themeId: item.themeId });
          }}
        >
          <Image source={{ uri: `https://3blood-img-upload.s3.ap-northeast-1.amazonaws.com/${item.themeImg}` }} style={styles.tinyImage} />
        </TouchableOpacity>
      </RenderView>
    )
  }
  
  return (
    <Container>
      <FlatList
        data={data}
        renderItem={RenderTheme}
        keyExtractor={(data) => data.themeId}
        style={{ margin: 20 }}
        numColumns={3}
      />
    </Container>
  )
}

const Container = styled.View`
  flex: 1;

`

const styles = StyleSheet.create({
  tinyImage: {
    width: 110,
    height: 150,
    borderRadius: 10,
    margin: 10,
  },
});

const RenderView = styled.View`
  align-items: center;
  justify-content: center;
`