import React, { useEffect, useState } from 'react';
import {ImageBackground, View, Text, TouchableOpacity, Animated} from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

const BookMain = () => {
    const navigation = useNavigation();
    
    return(
        <ImageBackground source={{uri:'https://3blood-img-upload.s3.ap-northeast-1.amazonaws.com/main_book2.gif'}} style={{flex:1}}>
            <MainBookView style={{flex:1}}>
                <MainBookText>어서오세요</MainBookText>
                <MainBookText>ㅇㅇㅇ님의 저택이에요.</MainBookText>
                <MainBookText>모든 방문을 열어야만</MainBookText>
                <MainBookText>이 저택의 진정한 주인이 되실 수 있어요.</MainBookText>
                <MainBookText>지금 바로 저택에 입성해보세요.</MainBookText>
            </MainBookView>
            <Enter style={{flex:2}} onPress={()=>{navigation.navigate('Book')}}>
                <EnterText>저택 들어가기</EnterText>
            </Enter>
        </ImageBackground>
    )
}

const MainBookView = styled.View`
    margin-Top:80px;
    padding:20px;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
`
const MainBookText = styled.Text`
    font-size: 20px;
    color:white;
    font-family: 'SUIT-Bold';
    margin-bottom: 20px;
`
const Enter = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    align-items: center;

`

const EnterText = styled.Text`
    font-size: 20px;
    color:'rgba(255,255,255,0.5)';
    font-family: 'SUIT-Bold';
    margin-top: 150px;
`

export default BookMain;