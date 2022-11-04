import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import {View, Text, FlatList, ImageBackground, Pressable,  StyleSheet, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient'
import theme from '../../../theme';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import RNPickerSelect from 'react-native-picker-select';

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

export default function RegionBook({navigation, route}){
    const {num, name} = route.params;
    const [isCafeOn, setIsCafeOn] = useState(null);
    const [selectRegion, setSelectRegion] = useState(`${name}/null`);
    const [cafeSet, setCafeSet] = useState(null);
    const itemsList = RegionList[num].map((item) => {
        return {label:item, value:item}
    })

    const bottomSheetRef = useRef(null);
    // variables
    const snapPoints = useMemo(() => ['3%', '85%'], []);

    useEffect(()=>{console.log(selectRegion)}, [selectRegion])

    return(
        <ImageBackground source={{uri:testUnity}} style={{flex:1}}>
            <View style={{justifyContent:'flex-start', flex:1, flexDirection:'column'}}>
                <View>
                    <RoomNumber>ROOM {num}</RoomNumber>
                </View>
                <BottomSheet
                    ref={bottomSheetRef}
                    index={0}
                    snapPoints={snapPoints}
                    backgroundStyle={styles.bottomSheet}
                >
                    <View>
                        <RNPickerSelect
                            style={{inputAndroid: styles.rnpicker}}
                            onValueChange={(value) => setSelectRegion(`${name}/${value}`)}
                            items={itemsList}
                            useNativeAndroidPickerStyle={false}
                            placeholder={{label:'세부지역을 선택해주세요', 'value':null}}
                        />
                    </View>
                    { selectRegion !== `${name}/null` ? 
                        <BottomSheetFlatList
                        numColumns={2}
                        data={test}
                        contentContainerStyle={styles.flatListStyle}
                        renderItem={(obj) => 
                            <Pressable style={{flex:0.5, position:'relative'}}>
                                <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']}
                                style={[obj.index !== test.length-1 ? obj.index % 2 == 0 ? {marginRight: 10} : {marginLeft: 10}
                                    : {marginRight:10}, {height:150, width:186, position:'absolute', zIndex:3, elevation:3, borderRadius:10}]} />
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
                        : <Text>문구</Text>
                    }
                    
                    {/* </BlurView> */}
                </BottomSheet>
            </View>
        </ImageBackground>
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
        width:'90%',
        height:50,
        marginLeft:'auto',
        marginRight:'auto',
        marginTop:20,
        marginBottom:20,
        backgroundColor:'white',
        borderRadius:10,
        paddingLeft:20,
        paddingRight:20
    }
})