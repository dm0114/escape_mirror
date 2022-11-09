import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import {View, Text, FlatList, ImageBackground, Pressable,  StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient'
import theme from '../../../theme';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import RNPickerSelect from 'react-native-picker-select';

import { Modal } from "native-base";
import {ProgressBar} from 'react-native-ui-lib';

import { WebView } from 'react-native-webview';

const RegionList = {
    // 서울
    '02':[
        '강남',
        '홍대',
        '신촌',
        '건대',
        '대학로',
        '강북',
        '신림', 
        '기타'
    ],
    // 경기
    '031':[
        '부천', 
        '일산',
        '수원',
        '안양',
        '인천',
        '기타'
    ],
    // 충청 
    '04?':[
        '대전',
        '천안',
        '청주',
        '기타'
    ],
    // 경상 
    '05!':[
        '대구',
        '부산',
        '기타'
    ],
    // 전라 
    '06$':[
        '전주',
        '광주',
        '기타'
    ],
    // 강원 
    '033':[],
    // 제주 
    '064':[]
}

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
        'storeImg': 'https://user-images.githubusercontent.com/97578425/199650505-b0a49a60-800f-4e0e-95b5-301fb88a726e.png',
        'storeName': '카페 이름',
        'isClear':false,
    },
    {
        'storeId': 4,
        'storeImg': 'https://user-images.githubusercontent.com/97578425/199650505-b0a49a60-800f-4e0e-95b5-301fb88a726e.png',
        'storeName': '카페 이름',
        'isClear':false,
    },
    {
        'storeId': 5,
        'storeImg': 'https://user-images.githubusercontent.com/97578425/199631491-2520584b-510d-4baf-8535-748c8cda2196.png',
        'storeName': '카페 이름',
        'isClear':false,
    },
    {
        'storeId': 6,
        'storeImg': 'https://user-images.githubusercontent.com/97578425/199631491-2520584b-510d-4baf-8535-748c8cda2196.png',
        'storeName': '카페 이름',
        'isClear':false,
    },
    {
        'storeId': 7,
        'storeImg': 'https://user-images.githubusercontent.com/97578425/199631491-2520584b-510d-4baf-8535-748c8cda2196.png',
        'storeName': '카페 이름',
        'isClear':false,
    },
]

const testImg = 'https://media.4-paws.org/1/e/d/6/1ed6da75afe37d82757142dc7c6633a532f53a7d/VIER%20PFOTEN_2019-03-15_001-2886x1999-1920x1330.jpg';
const testUnity = 'https://user-images.githubusercontent.com/97578425/199651092-ce04c889-71c8-431f-bfae-1732e4c72f8c.png'

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

export default function RegionBook({navigation, route}){
    const {num, name} = route.params;
    const [selectRegion, setSelectRegion] = useState();
    const [specificRegion, setSpecificRegion] = useState(null);
    const [cafeSet, setCafeSet] = useState(null);
    const opacity_list = [0.8, 0.5, 0]
    const itemsList = RegionList[num].map((item) => {
        return {label:item, value:item}
    })
    const [reviewModal, setReviewModal] = useState(false);

    useEffect(()=>{
        itemsList.length ? setSelectRegion(`${name}/null`) : setSelectRegion(`${name}`)
    }, [])

    return(
        <>
        <View style={{flex:1}}>
        <WebView source={{uri:'https://k7c104.p.ssafy.io/unity/test'}} />
        </View>
        </>
        // <ImageBackground source={{uri:testUnity}} style={{flex:1}}>
        //     <View style={{justifyContent:'flex-start', flex:1, flexDirection:'column', padding:20}}>
        //         <Modal isOpen={reviewModal} onClose={()=>setReviewModal(false)}>
        //             <Modal.Content>
        //                 <Modal.CloseButton />
        //                 <Modal.Header>테마이름</Modal.Header>
        //                 <Modal.Body>
        //                     리뷰 내용이 들어가야 함
        //                 </Modal.Body>
        //             </Modal.Content>
        //         </Modal>
        //         <View style={{flex:1}}>
        //             <RoomNumber>ROOM {num}</RoomNumber>
        //         </View>
        //         <View style={{flex:8}}
        //         >
        //             {cafeSet !== null ? 
        //             <>
        //                 <View style={{marginTop:10}}>
        //                 <CafeNavBtn style={{flexDirection:'row', marginTop:20, marginBottom:20}}
        //                 onPress={()=>{
        //                     // setCafeSet(null)
        //                     navigation.navigate('CafeDetailScreen', {
        //                     storeId:cafeSet.storeId
        //                 })
        //                 }}>
        //                     <CafeImg source={{uri:cafeSet.storeImg}} resizeMode="cover" imageStyle={{borderRadius:10}} />
        //                     <View style={{flexDirection:'column', marginLeft:20, flex:1, marginTop:'auto', marginBottom:'auto'}}>
        //                         <CafeName>{cafeSet.storeName}</CafeName>
        //                         <View style={{flexDirection:'row', justifyContent:'space-between'}}>
        //                             <ProgressTitle>진행도</ProgressTitle>
        //                             <ProgressTitle style={{marginRight:10}}>10/15</ProgressTitle>
        //                         </View>
        //                         <ProgressBar progress={55} progressColor={'red'} style={{height:20}} />
        //                     </View>
        //                 </CafeNavBtn>
        //                 <FlatList
        //                     style={{marginTop:20}}
        //                     // columnWrapperStyle={{ justifyContent:"space-between" }}
        //                     keyExtractor={(item) => item.themeId}
        //                     data={data}
        //                     numColumns={3}
        //                     key={3}
        //                     // columnWrapperStyle={{justifyContent: 'space-between'}}
        //                     renderItem={(obj) => 
        //                         <>
        //                         <TouchableOpacity style={[{width:117, position:'relative'}, 
        //                             obj.index % 3 == 2 ? {marginRight:0} : {marginRight:20}]}
        //                         onPress={()=>{
        //                             if(obj.item.isClear < 2){navigation.navigate('ThemeDetailScreen', {
        //                             storeId:obj.item.themeId
        //                         })}else{
        //                             setReviewModal(true)
        //                         }
        //                         }}>
        //                             <View style={{backgroundColor:'black', height:180, width:117, position:'absolute', zIndex:3, elevation:3, borderRadius:10, opacity:opacity_list[obj.item.isClear]}} />
        //                             <ThemeView
        //                                 source={{uri:obj.item.themeImg}}
        //                                 resizeMode="cover"
        //                                 imageStyle={{borderRadius:10}}
        //                                 />
        //                         </TouchableOpacity>
        //                         </>
        //             }
                    
        //             />
        //                 </View>
        //             </>
        //             :   
        //             <>
        //                 {/* 세부지역이 있을 경우 select box를 보여주고, 없는 경우 보여주지 않음 */}
        //                 <View style={{flex:8}}>
        //                     {itemsList.length ?
        //                     <RNPickerSelect
        //                         style={{inputAndroid: styles.rnpicker}}
        //                         onValueChange={(value) => {
        //                             setSelectRegion(`${name}/${value}`)
        //                             setSpecificRegion(value)}}
        //                         items={itemsList}
        //                         value={specificRegion}
        //                         useNativeAndroidPickerStyle={false}
        //                         placeholder={{label:'세부지역을 선택해주세요', value:null}}
        //                     />
        //                     :
        //                     null
        //                     }
        //                     {/* 세부지역 선택 시 해당 세부지역에 대한 카페 데이터를 보여줌 */}
        //                     {selectRegion !== `${name}/null` ? 
        //                     <FlatList
        //                         numColumns={2}
        //                         data={test}
        //                         renderItem={(obj) => 
        //                             <TouchableOpacity style={{flex:0.5, position:'relative'}} onPress={()=>{setCafeSet(obj.item)}}>
        //                                 <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']}
        //                                 style={[obj.index !== test.length-1 ? obj.index % 2 == 0 ? {marginRight: 10} : {marginLeft: 10}
        //                                     : {marginRight:10}, {height:180, width:186, position:'absolute', zIndex:3, elevation:3, borderRadius:10}]} />
        //                                 <CafeView
        //                                     source={{uri:obj.item.storeImg}}
        //                                     resizeMode="cover"
        //                                     imageStyle={{borderRadius:10}}
        //                                     style={
        //                                         obj.index !== test.length-1 ? obj.index % 2 == 0 ? {marginRight: 10} : {marginLeft: 10}
        //                                     : {marginRight:10}}>
        //                                         <ThemeTitle>진행도</ThemeTitle>
        //                                         <ProgressBar progress={55} progressColor={'red'} style={{zIndex:10, marginTop:130}}/>
        //                                         {/* <ThemeTitle>{obj.item.storeName}</ThemeTitle> */}
        //                                 </CafeView>
        //                             </TouchableOpacity>
        //                 }/>
                            
        //                     : null}
                                
        //                 </View>
        //             </>
        //             }
        //             {/* </BlurView> */}
        //         </View>
        //     </View>
        // </ImageBackground>
    )
}

const RoomNumber = styled.Text`
    color:white;
    font-family: 'Classic';
    font-size: ${({theme}) => theme.fontSizes.title1};
    margin: 45px auto auto auto;
`

// const ThemeList = styled.BottomSheetFlatList`
//     padding: ${({theme}) => theme.screenMargin.padding};
// `

const CafeView = styled.ImageBackground`
    flex:0.5;
    height:180px;
    border-radius: 10px;
    padding:${({theme}) => theme.screenMargin.padding};
    /* background-color: white; */
    margin-bottom: 20px;
`
const ThemeView = styled.ImageBackground`
    height:180px;
    margin-bottom: 20px;
`

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

const ProgressTitle = styled.Text`
    font-size: ${({theme}) => theme.fontSizes.body};
    font-family: 'SUIT-SemiBold';
    color:white;
    margin-bottom: 10px;
`

const styles = StyleSheet.create({
    flatListStyle : {
        paddingLeft:20,
        paddingRight:20,
        paddingTop:10,
        paddingBottom:10,
    },
    // blur : {
    //     width:'100%', 
    //     height:'100%'
    // },
    bottomSheet : {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    rnpicker:{
        width:'100%',
        height:50,
        marginLeft:'auto',
        marginRight:'auto',
        marginTop:30,
        marginBottom:30,
        backgroundColor:'white',
        borderRadius:10,
        paddingLeft:20,
        paddingRight:20
    }
})