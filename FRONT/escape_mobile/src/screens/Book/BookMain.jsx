import React, { useEffect, useState } from 'react';
import {ImageBackground, View, Text, TouchableOpacity, Animated} from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

const BookMain = () => {
    const navigation = useNavigation();
    
    return(
        <ImageBackground source={{uri:'https://3blood-img-upload.s3.ap-northeast-1.amazonaws.com/main_book2.gif'}} style={{flex:1}}>
            <MainBookView style={{flex:1}}>
                <MainBookText>ㅇㅇㅇ님을 기다리는 저택이에요.</MainBookText>
                <MainBookText>모든 방문을 열어</MainBookText>
                <MainBookText>저택의 주인이 되어주세요.</MainBookText>
            </MainBookView>
            <Enter style={{flex:2}} onPress={()=>{navigation.navigate('Book')}}>
                <EnterText>저택 입성하기</EnterText>
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
    font-size: ${({ theme }) => theme.fontSizes.title2};
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