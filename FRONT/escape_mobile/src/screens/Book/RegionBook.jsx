import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import {View, Text, FlatList, ImageBackground, Pressable,  StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient'
import theme from '../../../theme';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import RNPickerSelect from 'react-native-picker-select';
import {useInfiniteQuery, useQuery, useQueryClient} from '@tanstack/react-query'
import { Modal } from "native-base";
import {ProgressBar} from 'react-native-ui-lib';
import { getRegionCafeList } from '../../apis/BookApi';


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

const windowWidth = Dimensions.get('window').width;

const cafeWidth = (windowWidth-60) / 2;

export default function RegionBook({navigation, route}){
    const {num, name} = route.params;
    const [selectRegion, setSelectRegion] = useState();
    const [specificRegion, setSpecificRegion] = useState(null);
    const itemsList = RegionList[num].map((item) => {
        return {label:item, value:item}
    })
    const [page, setPage] = useState(0);
    const [isLast, setIsLast] = useState(false);
    // const {data} = useQuery(                                                         
    //     ['RegionCafe', specificRegion, name],
    //     getRegionCafeList,
    //     {
    //         enabled:!!specificRegion,
    // }
    // );

    const [piecedata, setPieceData] = useState();
    const [data, setData] = useState();

      useEffect(()=>{
        if(piecedata && (piecedata.length == 0 || piecedata.length < 6)){
            setIsLast(true)
        }
      }, [piecedata])
    
    const fetchData = () => {
        if(specificRegion && isLast == false){
            getRegionCafeList(specificRegion, name, page).then((res) => {
                setPieceData(res)
                if(!!data){
                    setData([...data, ...res])
                    setPage(page+1)
                }else{
                    setData(res)
                    setPage(page+1)
                }
                
                })
        }
    }

    useEffect(()=>{
        fetchData()
    }, [specificRegion])

    useEffect(()=>{
        itemsList.length ? setSelectRegion(`${name}/null`) : setSelectRegion(`${name}`)
        if(name == '강원' || name == '제주'){
            setSpecificRegion('전체')
        }
    }, [])
    // console.log("data", data)

    const renderItem = (obj) => {
        return(
            <>
            <TouchableOpacity style={{flex:0.5, height:180, marginBottom:20, position:'relative'}} onPress={()=>{navigation.navigate('CafeBook', {
                storeId:obj.item.storeId,
                storeImg:obj.item.storeImg,
                storeName:obj.item.storeName,
                clearCnt:obj.item.clearCnt,
                totalTheme:obj.item.totalTheme
            })}}>
                <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']}
                style={[obj.index !== data.length-1 ? obj.index % 2 == 0 ? {marginRight: 10} : {marginLeft: 10}
                    : {marginLeft:10}, {height:180, width:cafeWidth, position:'absolute', zIndex:3, elevation:3, borderRadius:10}]} />
                <CafeView
                    source={ obj.item.storeImg ? {uri:
                        `https://3blood-img-upload.s3.ap-northeast-1.amazonaws.com/${obj.item.storeImg}`} : {uri:'https://3blood-img-upload.s3.ap-northeast-1.amazonaws.com/NoImage.png'}}
                    resizeMode="cover"
                    imageStyle={{borderRadius:10}}
                    style={[obj.index !== data.length-1 ? obj.index % 2 == 0 ? {marginRight: 10} : {marginLeft: 10}
                        : {marginLeft:10}]}
                    >
                        {/* <Text style={{color:'red', fontSize:20}}>{obj.item.storeImg}</Text> */}
                        <ThemeTitleView style={{flex:1}}>
                            <ThemeTitle>진행도</ThemeTitle>
                            <ThemeTitle>{obj.item.clearCnt}/{obj.item.totalTheme}</ThemeTitle>
                        </ThemeTitleView>
                        <ProgressBar progress={(obj.item.clearCnt/obj.item.totalTheme)*100} progressColor={'red'} style={{zIndex:10, marginTop:130}}/>
                        {/* <ThemeTitle>{obj.item.storeName}</ThemeTitle> */}
                </CafeView>
            </TouchableOpacity>
            </>
        )
        
    }

    return(
        <ImageBackground source={{uri:'https://3blood-img-upload.s3.ap-northeast-1.amazonaws.com/book_room01.gif'}} style={{flex:1}}>
            <View style={{justifyContent:'flex-start', flex:1, flexDirection:'column', padding:20}}>
                <View style={{flex:1}}>
                    <RoomNumber>ROOM {num}</RoomNumber>
                </View>
                <View style={{flex:8}}
                >
                    {/* 세부지역이 있을 경우 select box를 보여주고, 없는 경우 보여주지 않음 */}
                    <View style={{flex:8}}>
                        {itemsList.length ?
                        <RNPickerSelect
                            style={{inputAndroid: styles.rnpicker}}
                            onValueChange={(value) => {
                                setSelectRegion(`${name}/${value}`)
                                setSpecificRegion(value)
                                setPage(0)
                                setData(undefined)
                                setIsLast(false)
                            }}
                            items={itemsList}
                            value={specificRegion}
                            useNativeAndroidPickerStyle={false}
                            placeholder={{label:'세부지역을 선택해주세요', value:null}}
                        />
                        :
                        null
                        }
                        {/* 세부지역 선택 시 해당 세부지역에 대한 카페 데이터를 보여줌 */}
                        {selectRegion !== `${name}/null` ? 
                        <FlatList
                            onEndReached={()=>{
                                if(!isLast){
                                    fetchData()
                                }
                            }}
                            onEndReachedThreshold={0.8}
                            disableVirtualization={false}
                            numColumns={2}
                            // data={data.pages.map(page => page.results).flat}
                            data={data}
                            initialNumToRender={6}
                            renderItem={renderItem}/>
                        
                        : null}
                            
                    </View>
                </View>
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

const CafeView = styled.ImageBackground`
    flex:0.5;
    height:180px;
    border-radius: 10px;
    padding:${({theme}) => theme.screenMargin.padding};
    /* background-color: white; */
    margin-bottom: 20px;
`




const ThemeTitle = styled.Text`
    font-size: ${({theme}) => theme.fontSizes.title3};
    font-family: 'SUIT-SemiBold';
    color:white;
`
const ThemeTitleView = styled.View`
    font-size: ${({theme}) => theme.fontSizes.title3};
    font-family: 'SUIT-SemiBold';
    z-index: 10;
    color:white;
    width:100%;
    position: absolute;
    top:110px;
    left:20px;
    flex-direction: row;
    justify-content: space-between;
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
