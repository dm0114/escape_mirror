import React, {useEffect, useState} from 'react';
import {Text, TextInput, View, StyleSheet, Dimensions, FlatList, ScrollView, ImageBackground, TouchableOpacity, Button} from 'react-native';
import styled from 'styled-components/native';
import theme from "../../theme";
import { Select, Box, Center } from "native-base";
import { Modal } from 'native-base';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { getRegionAssign, getSearchAssign } from '../apis/Assignment';
import { useNavigation } from '@react-navigation/native';


// 화면 너비, 높이 구하는 방법
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const halfSelectWidth = (windowWidth-80)/2;
const halfViewWidth = (windowWidth-70)/2;

const RegionLittleList = {
    // 서울
    '서울':[
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
    '경기':[
        '부천', 
        '일산',
        '수원',
        '안양',
        '인천',
        '기타'
    ],
    // 충청 
    '충청':[
        '대전',
        '천안',
        '청주',
        '기타'
    ],
    // 경상 
    '경상':[
        '대구',
        '부산',
        '기타'
    ],
    // 전라 
    '전라':[
        '전주',
        '광주',
        '기타'
    ],
    // 강원 
    '강원':['전체'],
    // 제주 
    '제주':['전체']
}
const RegionList = ['서울', '경기', '충청', '경상', '전라', '강원', '제주']
const obj = [
    {
    'user':'니츠',
    'date':'10-14',
    'time':'09:30',
    'storeName':'비밀의화원 광주1호점',
    'themeName':'명당'
    },
    {
        'user':'니츠',
        'date':'10-14',
        'time':'09:30',
        'storeName':'비밀의화원 광주1호점',
        'themeName':'명당'
        },
        {
            'user':'니츠',
            'date':'10-14',
            'time':'09:30',
            'storeName':'비밀의화원 광주1호점',
            'themeName':'명당'
            },
            {
                'user':'니츠',
                'date':'10-14',
                'time':'09:30',
                'storeName':'비밀의화원 광주1호점',
                'themeName':'명당'
                },
                {
                    'user':'니츠',
                    'date':'10-14',
                    'time':'09:30',
                    'storeName':'비밀의화원 광주1호점',
                    'themeName':'명당'
                    },
]

const Assignment = () => {
    const navigation = useNavigation(); 
    const [text, onChangeText] = React.useState();
    const [selectRegion, setSelectRegion] = useState();
    const [selectLittleRegion, setSelectLittleRegion] = useState();
    const [resultRegion, setResultRegion] = useState();
    const [selectItem, setSelectItem] = useState();
    const [isModal, setIsModal] = useState(false);
    const {data:SelectData} = useQuery(['AssignmentSelect', selectRegion, selectLittleRegion], getRegionAssign, {
        enabled:!!(selectRegion&&selectLittleRegion)
    })
    useEffect(()=>{
        setResultRegion(`${selectRegion}/${selectLittleRegion}`)
    }, [selectLittleRegion])

    
    const AssignItem = ({item}) => {
        const [year, month, day] = item.reservedDate.split("-");
        return(
            <AssignItemView style={{backgroundColor:'white', width:halfViewWidth, marginBottom:20}}
            onPress={()=>{setSelectItem(item)
            setIsModal(true)}}>
                {/* <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Ionicons name="person" size={25} color="red" />
                    <SUIT style={{fontSize:20, marginLeft:5}}>{item.user}</SUIT>
                </View>
                <View style={{borderBottomColor: 'grey', borderBottomWidth:1, marginTop:10, marginBottom:10}} /> */}
                <View style={{alignItems:'center'}}>
                    <SUITSemiBold style={{fontSize:13}}>{item.storeName}</SUITSemiBold>
                    <SUIT style={{fontSize:25}}>{item.themeName}</SUIT>
                </View>
                <View style={{borderBottomColor: 'grey', borderBottomWidth:1, marginTop:10, marginBottom:10}} />
                <View style={{flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                    <SUIT style={{fontSize:18}}>{month}월 {day}일</SUIT>
                    <SUIT style={{fontSize:30}}>{item.reservedTime}</SUIT>
                </View>
            </AssignItemView>
        )
    }

    return(
        <ImageBackground style={{flex:1}} source={{uri:'https://3blood-img-upload.s3.ap-northeast-1.amazonaws.com/main_search.gif'}}>
        {selectItem !== undefined && <Modal isOpen={isModal} onClose={()=>setIsModal(false)}>
            <Modal.Content>
                <Modal.CloseButton />
                {/* <Modal.Header>테마이름</Modal.Header> */}
                <Modal.Body style={{justifyContent:'center', paddingLeft:40, paddingRight:40, paddingBottom:30}}>
                    <View style={{flexDirection:'row', alignItems:'center', marginTop:15}}>
                        <Ionicons name="person" size={25} color="red" />
                        <SUIT style={{fontSize:20, marginLeft:5}}>{selectItem.reservedName}</SUIT>
                        <SUITSemiBold style={{fontSize:20}}>님의 예약</SUITSemiBold>
                    </View>
                    <View style={{flexDirection:'column', alignItems:'center', marginTop:20, marginBottom:20}}>
                        <TouchableOpacity style={{flexDirection:'row', alignItems:'center', marginTop:10, marginBottom:10}}
                        // onPress={()=>{console.log(selectItem.storeId)}}
                        onPress={()=>{
                            navigation.navigate('CafeDetailScreen', {
                            storeId:selectItem.storeId
                            })}}
                            >
                            <SUITSemiBold style={{marginLeft:10, fontSize:18}}>{selectItem.storeName}</SUITSemiBold>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flexDirection:'row', alignItems:'center'}}
                        onPress={()=>{
                            navigation.navigate('ThemeDetailScreen', {
                            themeId:selectItem.themeId
                            })}}
                            >
                            <SUIT style={{fontSize:35, marginLeft:10}}>{selectItem.themeName}</SUIT>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection:'column', alignItems:'center', marginBottom:20}}>
                        <SUIT style={{fontSize:25, marginTop:10, marginBottom:0}}>{selectItem.reservedDate}</SUIT>
                        <SUIT style={{fontSize:35, marginTop:10, marginBottom:10}}>{selectItem.reservedTime}</SUIT>
                    </View>
                    <Button title='양도 받기' color="black"/>
                </Modal.Body>
            </Modal.Content>
        </Modal>}
        <Container style={{flex:1}}>
            <Title>새로운 초대장이 도착했어요.</Title>
            {/* <SearchInput
                onPress={()=>{setIsSearchClick(true)}}
                onChangeText={(value)=>{setSearchKeyword(value)}}
                value={text}
            /> */}
            <SubTitle>지역을 선택해서 초대장을 확인해보세요!</SubTitle>
            <View style={{flexDirection:'row', justifyContent:'space-between', marginRight:10}}>
                <Box style={{ marginLeft:10, backgroundColor:'white', borderRadius:30, width:halfSelectWidth}}>
                    <Select selectedValue={selectRegion} placeholder="대분류"
                    variant='rounded'
                    style={{fontSize:15, fontFamily:'SUIT-Regular'}}
                    onValueChange={(item)=>{setSelectRegion(item)}}>
                        {
                            RegionList.map((item) => 
                                    <Select.Item key={item} label={item} value={item}/>
                                )
                        }
                    </Select>
                </Box>
                {selectRegion && <Box style={{ marginLeft:10, backgroundColor:'white', borderRadius:30, width:halfSelectWidth}}>
                    <Select selectedValue={selectLittleRegion} placeholder="소분류"
                    style={{fontSize:15, fontFamily:'SUIT-Regular'}}
                    variant='rounded'
                    onValueChange={(item)=>{setSelectLittleRegion(item)}}>
                        {
                            RegionLittleList[selectRegion].map((item) => {
                                return(
                                    <Select.Item key={item} label={item} value={item}/>
                                )
                            })
                        }
                    </Select>
                </Box>}
            </View>
            {
                
                (selectRegion !== undefined && selectLittleRegion !== undefined) && 
                <FlatList
                style={{marginTop:20, padding:5, marginBottom:20}}
                columnWrapperStyle={{ flex: 1, justifyContent: "space-between" }}
                numColumns={2}
                key={3}
                data={SelectData}
                renderItem={AssignItem} />
            }
            {/* {
                (searchKeyword !== undefined && <FlatList 
                    style={{marginTop:20, padding:5, marginBottom:20}}
                    columnWrapperStyle={{ flex: 1, justifyContent: "space-between" }}
                    numColumns={2}
                    key={3}
                    data={SearchData.themeList}
                    renderItem={AssignItem}
                />)
            } */}
        </Container>
        </ImageBackground>
    )
}

const SUIT = styled.Text`
    font-family: 'SUIT-Bold';
    margin: 5px 0;
`
const SUITSemiBold = styled.Text`
    font-family: 'SUIT-SemiBold';
    margin: 5px 0;
`
const Title = styled.Text`
    font-size: ${({theme}) => theme.fontSizes.title2};
    font-family: 'SUIT-SemiBold';
    color:white;
    margin-left: ${({theme}) => theme.screenMargin.titleLeftMargin};
`
const SubTitle = styled.Text`
    font-size: ${({theme}) => theme.fontSizes.body};
    font-family: 'SUIT-SemiBold';
    color:white;
    margin: 20px 0 20px ${({theme}) => theme.screenMargin.titleLeftMargin};
`
const Container = styled.ImageBackground`
    padding:  ${({theme}) => theme.screenMargin.gloablPadding};
`
const AssignItemView = styled.TouchableOpacity`
    border-radius: 10px;
    padding:20px;
`

const AssignDate = styled.Text`
    font-size: ${({theme}) => theme.fontSizes.title2};
`
const SearchInput = styled.TextInput`
    background-color: white;
    height:50px;
    margin: 20px 10px 0px 10px;
    border-radius: 10px;
    padding:5px 20px;
    font-size: ${({theme}) => theme.fontSizes.body2};
`

const ScrollViewStyle = styled.ScrollView`
    /* padding:0 20px; */
    margin-top: 15px;
`

const RegionTab = styled.TouchableOpacity`
    border-radius: 20px;
    background-color: white;
    padding:10px;
    margin-left: 10px;
`
const RegionTabText = styled.Text`
    color:black;
    font-size: ${({theme}) => theme.fontSizes.body};
`
export default Assignment;