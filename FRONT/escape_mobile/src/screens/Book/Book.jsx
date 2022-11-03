import React from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import styled from 'styled-components/native';
import theme from '../../../theme';
import { Dimensions } from 'react-native';
 
// 화면 너비, 높이 구하는 방법
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// const Region = ['서울', '경기', '충청', '경상', '전라', '강원', '제주']
const Tel = ['02', '031', '04?', '05!', '06$', '033', '064']

export default function Book({navigation}){
    return(
        <>
        {/* <Test 
        width={windowWidth}
        height={windowHeight}
        style={{position: 'absolute', top:0 , left: 0, elevation: 3, zIndex: 4, backgroundColor: 'red'}}></Test> */}
        <Container>
            <TwoRegion>
                <RegionBtn onPress={()=>{navigation.navigate('RegionBook',{
                    num:Tel[0]
                })}}><RegionTitle>{Tel[0]}</RegionTitle></RegionBtn>
                <RegionBtn onPress={()=>{navigation.navigate('RegionBook',{
                    num:Tel[1]
                })}}><RegionTitle>{Tel[1]}</RegionTitle></RegionBtn>
            </TwoRegion>
            <TwoRegion>
                <RegionBtn onPress={()=>{navigation.navigate('RegionBook',{
                    num:Tel[2]
                })}}><RegionTitle>{Tel[2]}</RegionTitle></RegionBtn>
                <RegionBtn onPress={()=>{navigation.navigate('RegionBook',{
                    num:Tel[3]
                })}}><RegionTitle>{Tel[3]}</RegionTitle></RegionBtn>
            </TwoRegion>
            <TwoRegion>
                <RegionBtn onPress={()=>{navigation.navigate('RegionBook',{
                    num:Tel[4]
                })}}><RegionTitle>{Tel[4]}</RegionTitle></RegionBtn>
                <RegionBtn onPress={()=>{navigation.navigate('RegionBook',{
                    num:Tel[5]
                })}}><RegionTitle>{Tel[5]}</RegionTitle></RegionBtn>
            </TwoRegion>
            <TwoRegion>
                <RegionBtn onPress={()=>{navigation.navigate('RegionBook',{
                    num:Tel[6]
                })}}><RegionTitle>{Tel[6]}</RegionTitle></RegionBtn>
            </TwoRegion>
        </Container>
        </>
    )
}

const RegionTitle = styled.Text`
    color:black;
    font-family:'Classic';
    font-size: ${({ theme }) => theme.fontSizes.title2};
    margin:auto;
`

const RegionBtn = styled.TouchableOpacity`
    background-color:white;
    border-radius: 10px;
    margin:15px;
    flex:1;
`

const Container = styled.View`
    flex:1;
`

const TwoRegion = styled.View`
    flex:1;
    flex-direction: row;
`

const Test = styled.View`
    width: ${({ width }) => width}px;
    height: ${({ height }) => height}px;
`