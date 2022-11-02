import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

const Region = ['서울', '경기', '충청', '경상', '전라', '강원', '제주']
const Tel = ['02', '031', '04*', '05*', '06*', '033', '064']

export default function Book({navigation}){
    return(
        <>
        {
            Region.map((item, index) => <RegionBtn key={index} onPress={()=>{navigation.navigate('RegionBook', {
                num:Tel[index]
            })}}>
                <RegionTitle>{Tel[index]}</RegionTitle></RegionBtn>)
        }
        </>
    )
}

const RegionTitle = styled.Text`
    color:black;
    font-family:'SUIT-Light';
    font-size: 20px;
`

const RegionBtn = styled.TouchableOpacity`
    background-color:white;
    margin-bottom: 20px;
`