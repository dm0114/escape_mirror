import React, { useEffect, useState } from 'react';
import {View, Text, TouchableOpacity, FlatList, ActivityIndicator, ImageBackground} from 'react-native';
import styled from 'styled-components/native';
import theme from '../../../theme';
import { Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import { withTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';

 
// 화면 너비, 높이 구하는 방법
// const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;

// const testbg = 'https://3blood-img-upload.s3.ap-northeast-1.amazonaws.com/main_reservation2.gif';

const Region = ['서울', '경기', '충청', '경상', '전라', '강원', '제주']
const Tel = ['02', '031', '04?', '05!', '06$', '033', '064']

export default function Book(){
    const navigation = useNavigation();
    const [showRegion, setShowRegion] = useState(false);
    useEffect(()=>{
        setTimeout(()=>{
            setShowRegion(true)
        }, 1000)
    }, [])
    return(
        <ImageBackground source={{uri:'https://3blood-img-upload.s3.ap-northeast-1.amazonaws.com/book_lobby.gif'}} style={{flex:1}}>
        {showRegion && <Container>
            {/* <WebView source={{uri:'https://k7c104.p.ssafy.io/unity/test'}} /> */}
            <TwoRegion>
                <RegionBtn onPress={()=>{navigation.navigate('RegionBook',{
                    num:Tel[0],
                    name:Region[0]
                })
                setShowRegion(false)}}><RegionTitle>{Tel[0]}</RegionTitle></RegionBtn>
                <RegionBtn onPress={()=>{navigation.navigate('RegionBook',{
                    num:Tel[1],
                    name:Region[1]
                })}}><RegionTitle>{Tel[1]}</RegionTitle></RegionBtn>
            </TwoRegion>
            <TwoRegion>
                <RegionBtn onPress={()=>{navigation.navigate('RegionBook',{
                    num:Tel[2],
                    name:Region[2]
                })}}><RegionTitle>{Tel[2]}</RegionTitle></RegionBtn>
                <RegionBtn onPress={()=>{navigation.navigate('RegionBook',{
                    num:Tel[3],
                    name:Region[3]
                })}}><RegionTitle>{Tel[3]}</RegionTitle></RegionBtn>
            </TwoRegion>
            <TwoRegion>
                <RegionBtn onPress={()=>{navigation.navigate('RegionBook',{
                    num:Tel[4],
                    name:Region[4]
                })}}><RegionTitle>{Tel[4]}</RegionTitle></RegionBtn>
                <RegionBtn onPress={()=>{navigation.navigate('RegionBook',{
                    num:Tel[5],
                    name:Region[5]
                })}}><RegionTitle>{Tel[5]}</RegionTitle></RegionBtn>
            </TwoRegion>
            <TwoRegion>
                <RegionBtn onPress={()=>{navigation.navigate('RegionBook',{
                    num:Tel[6],
                    name:Region[6]
                })}}><RegionTitle>{Tel[6]}</RegionTitle></RegionBtn>
            </TwoRegion>
            <SelectText style={{marginTop: 50}}>방문을 원하시는 방을 선택해주세요.</SelectText>
            <SelectText style={{marginTop: 10}}>저택의 주인이 되기 위해서는</SelectText>
            <SelectText style={{marginTop: 10}}>모든 방을 클리어하셔야 합니다.</SelectText>
        </Container>}
        </ImageBackground>
    )
}

const RegionTitle = styled.Text`
    color:black;
    font-family:'Classic';
    font-size: ${({ theme }) => theme.fontSizes.title2};
    margin:auto;
`

const RegionBtn = styled.TouchableOpacity`
    background-color:'rgba(255, 255, 255, 0.2)';
    border-radius: 10px;
    margin:15px;
    flex:1;
`

const Container = styled.View`
    flex:1;
    /* padding-top:40px; */
    padding: 180px 35px 120px 35px;
    justify-content: center;
    align-items: center;
`

const TwoRegion = styled.View`
    flex:1;
    flex-direction: row;
    
`

const Test = styled.View`
    width: ${({ width }) => width}px;
    height: ${({ height }) => height}px;
`

const SelectText = styled.Text`
    color:white;
    font-size: 20px;
    font-family: 'SUIT-SemiBold';
`