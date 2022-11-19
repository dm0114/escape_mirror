import React, { useState, useRef } from 'react';
import styled from 'styled-components/native';
import theme from '../../../theme';
import { Image,StyleSheet,FlatList ,useWindowDimensions, ImageBackground, Button, Text, View, TextInput, Dimensions, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity, Alert } from 'react-native';
import ThemeCompo from '../../components/ThemeCompo';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { getLikeTheme } from '../../apis/MyPage';

export default function ThemeTab() {
  const navigation = useNavigation();
  const { data } = useQuery(['likeTheme'], getLikeTheme)
  console.log(data)
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
          <Image source={item.themeImg ? { uri: `https://3blood-img-upload.s3.ap-northeast-1.amazonaws.com/${item.themeImg}` } :
        {uri:'https://3blood-img-upload.s3.ap-northeast-1.amazonaws.com/NoImage.png'}} style={styles.tinyImage} />
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
  background-color: ${({ theme }) => theme.colors.backgroundDark};
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