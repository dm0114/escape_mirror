import React from 'react';
import {View, Text, FlatList, ImageBackground, Pressable} from 'react-native';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient'
import theme from '../../../theme';

const test = [
    {
        'storeId': 1,
        'storeImg': 'https://user-images.githubusercontent.com/97578425/199631491-2520584b-510d-4baf-8535-748c8cda2196.png',
        'storeName': '카페 이름',
        'isClear':false,
    },
    {
        'storeId': 2,
        'storeImg': 'https://user-images.githubusercontent.com/97578425/199631491-2520584b-510d-4baf-8535-748c8cda2196.png',
        'storeName': '카페 이름',
        'isClear':false,
    },
    {
        'storeId': 3,
        'storeImg': 'https://user-images.githubusercontent.com/97578425/199631491-2520584b-510d-4baf-8535-748c8cda2196.png',
        'storeName': '카페 이름',
        'isClear':false,
    },
    {
        'storeId': 4,
        'storeImg': 'https://user-images.githubusercontent.com/97578425/199631491-2520584b-510d-4baf-8535-748c8cda2196.png',
        'storeName': '카페 이름',
        'isClear':false,
    },
    {
        'storeId': 5,
        'storeImg': 'https://user-images.githubusercontent.com/97578425/199631491-2520584b-510d-4baf-8535-748c8cda2196.png',
        'storeName': '카페 이름',
        'isClear':false,
    }
]

const testImg = 'https://media.4-paws.org/1/e/d/6/1ed6da75afe37d82757142dc7c6633a532f53a7d/VIER%20PFOTEN_2019-03-15_001-2886x1999-1920x1330.jpg';

export default function RegionBook({navigation, route}){
    const {num} = route.params
    return(
        <>
            <View stlye={{justifyContent:'space-around'}}>
                <RoomNumber>ROOM {num}</RoomNumber>
                <ThemeList
                numColumns={2}
                data={test}
                renderItem={(obj) => 
                    <Pressable style={{flex:0.5, position:'relative'}}>
                        <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']}
                        style={[obj.index !== test.length-1 ? obj.index % 2 == 0 ? {marginRight: 10} : {marginLeft: 10}
                            : {marginRight:10}, {height:150, width:166, position:'absolute', zIndex:3, elevation:3, borderRadius:10}]} />
                        <ThemeView
                            source={{uri:obj.item.storeImg}}
                            resizeMode="cover"
                            imageStyle={{borderRadius:10}}
                            style={
                                obj.index !== test.length-1 ? obj.index % 2 == 0 ? {marginRight: 10} : {marginLeft: 10}
                            : {marginRight:10}}><ThemeTitle>{obj.item.storeName}</ThemeTitle>
                        </ThemeView>
                    </Pressable>
            }
                />
            </View>
        </>
    )
}

const RoomNumber = styled.Text`
    color:white;
    font-family: 'Classic';
    font-size: ${({theme}) => theme.fontSizes.title1};
    margin: auto auto 50px auto;
`

const ThemeList = styled.FlatList`
    background-color: red;
    padding:${({theme}) => theme.screenMargin.padding};
`

const ThemeView = styled.ImageBackground`
    flex:0.5;
    height:150px;
    border-radius: 10px;
    padding:${({theme}) => theme.screenMargin.padding};
    /* background-color: white; */
    margin-bottom: 20px;
`

const ThemeTitle = styled.Text`
    font-size: ${({theme}) => theme.fontSizes.title3};
    font-family: 'SUIT-SemiBold';
    flex:1;
    z-index: 10;
    color:white;
    position: absolute;
    top:110px;
    left:20px;
`

const Overlay = styled.View`
    height:150px;
    width:185px;
    border-radius: 10px;
    position: absolute;
    z-index: 5;
`

