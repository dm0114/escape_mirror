import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import {View, Text, FlatList, ImageBackground, Pressable,  StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Modal } from 'native-base';
import styled from 'styled-components/native';
import {ProgressBar} from 'react-native-ui-lib';

const data = [
    {
    'themeId':1,
    'themeImg':'https://pbs.twimg.com/media/E80HdMrUcAQv4hi.jpg',
    'themeName':'새벽 베이커리',
    'isClear':0
    },
    {
    'themeId':2,
    'themeImg':'https://pbs.twimg.com/media/E80HdMrUcAQv4hi.jpg',
    'themeName':'새벽 베이커리',
    'isClear':2
    },
    {
    'themeId':3,
    'themeImg':'https://pbs.twimg.com/media/E80HdMrUcAQv4hi.jpg',
    'themeName':'새벽 베이커리',
    'isClear':1
    },
    {
    'themeId':4,
    'themeImg':'https://pbs.twimg.com/media/E80HdMrUcAQv4hi.jpg',
    'themeName':'새벽 베이커리',
    'isClear':2
    },
    {
    'themeId':5,
    'themeImg':'https://pbs.twimg.com/media/E80HdMrUcAQv4hi.jpg',
    'themeName':'새벽 베이커리',
    'isClear':1
    }
]

const testUnity = 'https://user-images.githubusercontent.com/97578425/199651092-ce04c889-71c8-431f-bfae-1732e4c72f8c.png'

export default function CafeBook({navigation, route}){
    const {storeId, storeImg, storeName} = route.params;
    const [isModal, setIsModal] = useState(false);
    const opacity_list = [0.8, 0.5, 0];
    console.log(isModal);
    return(
        <ImageBackground source={{uri:testUnity}} style={{flex:1}}>
        <View style={{justifyContent:'flex-start', flex:1, flexDirection:'column', padding:20}}>
        <Modal isOpen={isModal} onClose={()=>setIsModal(false)}>
            <Modal.Content>
                <Modal.CloseButton />
                <Modal.Header>테마이름</Modal.Header>
                <Modal.Body>
                    리뷰 내용이 들어가야 함
                </Modal.Body>
            </Modal.Content>
        </Modal>
        <CafeNavBtn style={{flexDirection:'row', marginTop:20, marginBottom:20}}
            onPress={()=>{
                navigation.navigate('CafeDetailScreen', {
                storeId:storeId
            })
            }}>
            <CafeImg source={{uri:storeImg}} resizeMode="cover" imageStyle={{borderRadius:10}} />
            <View style={{flexDirection:'column', marginLeft:20, flex:1, marginTop:'auto', marginBottom:'auto'}}>
                <CafeName>{storeName}</CafeName>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <ProgressTitle>진행도</ProgressTitle>
                    <ProgressTitle style={{marginRight:10}}>10/15</ProgressTitle>
                </View>
                <ProgressBar progress={55} progressColor={'red'} style={{height:20}} />
            </View>
        </CafeNavBtn>
        <View style={{marginTop:10}}>
        <FlatList
            style={{marginTop:20}}
            data={data}
            numColumns={3}
            key={3}
            renderItem={(obj) => 
                <>
                <TouchableOpacity style={[{width:117, position:'relative'}, 
                    obj.index % 3 == 2 ? {marginRight:0} : {marginRight:20}]}
                onPress={()=>{
                    if(obj.item.isClear < 2){navigation.navigate('ThemeDetailScreen', {
                    storeId:obj.item.themeId
                    })}else{
                        setIsModal(true)
                    }
                    }}
                >
                    <View style={{backgroundColor:'black', height:180, width:117, position:'absolute', zIndex:3, elevation:3, borderRadius:10, opacity:opacity_list[obj.item.isClear]}} />
                    <ThemeView
                        source={{uri:obj.item.themeImg}}
                        resizeMode="cover"
                        imageStyle={{borderRadius:10}}
                        />
                </TouchableOpacity>
                </>
            }
            />
        </View>
    </View>
    </ImageBackground>
    )
}

const CafeThemeTItle = styled.Text`
    font-family:'SUIT-SemiBold';
    font-size:${({theme}) => theme.fontSizes.body};
    margin: auto 20px auto 20px;
`

const CafeImg = styled.ImageBackground`
    width:100px;
    height:100px;
    margin: auto 0;
`
const CafeNavBtn = styled.TouchableOpacity`
    margin-top: auto;
    margin-bottom: auto;
`

const CafeName = styled.Text`
    font-family: 'SUIT-Bold';
    font-size: ${({theme}) => theme.fontSizes.title2};
    color:white;
    margin-bottom: 10px;
    /* margin: auto 20px auto 20px; */
`

const ProgressTitle = styled.Text`
    font-size: ${({theme}) => theme.fontSizes.body};
    font-family: 'SUIT-SemiBold';
    color:white;
    margin-bottom: 10px;
`

const ThemeView = styled.ImageBackground`
    height:180px;
    margin-bottom: 20px;
`