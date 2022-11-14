import React, {useEffect, useState} from 'react';
import {Text, TextInput, View, StyleSheet, Dimensions, FlatList, ScrollView, ImageBackground, TouchableOpacity, Button} from 'react-native';
import styled from 'styled-components/native';
import theme from "../../theme";
import { Select, Box, Center } from "native-base";
import { Modal } from 'native-base';
import { Feather } from '@expo/vector-icons';

// 화면 너비, 높이 구하는 방법
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const halfSelectWidth = (windowWidth-80)/2;
const halfViewWidth = (windowWidth-60)/2;

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
    const [text, onChangeText] = React.useState();
    const [selectRegion, setSelectRegion] = useState();
    const [selectLittleRegion, setSelectLittleRegion] = useState();
    const [resultRegion, setResultRegion] = useState();
    const [selectItem, setSelectItem] = useState();
    const [isModal, setIsModal] = useState(false);

    useEffect(()=>{
        setResultRegion(`${selectRegion}/${selectLittleRegion}`)
    }, [selectLittleRegion])

    // const SelectItem = (data) => {
    //     return(
    //         {
    //             data.map((item) => <Select.item key={item} label={item} value={item}/>)
    //         }
    //     )
    // }
    
    const AssignItem = ({item}) => {
        return(
            <AssignItemView style={{backgroundColor:'white', width:halfViewWidth, marginBottom:20, alignItems:'center'}}
            onPress={()=>{setSelectItem(item)
            setIsModal(true)}}>
                <SUIT style={{fontSize:15}}>{item.storeName}</SUIT>
                <SUIT style={{fontSize:25}}>{item.themeName}</SUIT>
                <SUIT style={{fontSize:18}}>{item.date}</SUIT>
                <SUIT style={{fontSize:25}}>{item.time}</SUIT>
            </AssignItemView>
        )
    }

    return(
        <ImageBackground style={{flex:1}} source={{uri:'https://3blood-img-upload.s3.ap-northeast-1.amazonaws.com/main_search.gif'}}>
        {selectItem !== undefined && <Modal isOpen={isModal} onClose={()=>setIsModal(false)}>
            <Modal.Content>
                <Modal.CloseButton />
                {/* <Modal.Header>테마이름</Modal.Header> */}
                <Modal.Body style={{justifyContent:'center', alignItems:'center'}}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <SUIT style={{fontSize:20}}>{selectItem.user}</SUIT>
                        <Text style={{fontFamily:'SUIT-SemiBold', fontSize:20, marginTop:5, marginBottom:5}}>님의 예약</Text>
                    </View>
                    <TouchableOpacity style={{flexDirection:'row', alignItems:'center', marginTop:10, marginBottom:10}}
                    onPress={()=>{}}>
                        {/* <Feather name="link" size={24} color="black" /> */}
                        <Text style={{marginLeft:10, fontSize:18}}>{selectItem.storeName}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flexDirection:'row', alignItems:'center'}}
                    onPress={()=>{}}>
                        {/* <Feather name="link" size={24} color="black" /> */}
                        <Text style={{fontSize:35, marginLeft:10}}>{selectItem.themeName}</Text>
                    </TouchableOpacity>
                    <Text style={{fontSize:25, marginTop:10, marginBottom:0}}>{selectItem.date}</Text>
                    <Text style={{fontSize:35, marginTop:10, marginBottom:10}}>{selectItem.time}</Text>
                    <Button title='양도 받기' color="black"/>
                </Modal.Body>
            </Modal.Content>
        </Modal>}
        <Container>
            <Title>새로운 초대장이 도착했어요.</Title>
            <SearchInput
                onChangeText={onChangeText}
                value={text}
            />
            <SubTitle>지역을 선택해주세요</SubTitle>
            <View style={{flexDirection:'row', justifyContent:'space-between', marginRight:10}}>
                <Box style={{ marginLeft:10, backgroundColor:'white', borderRadius:30, width:halfSelectWidth}}>
                    <Select selectedValue={selectRegion} placeholder="대분류"
                    variant='rounded'
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
                style={{marginTop:20}}
                columnWrapperStyle={{ flex: 1, justifyContent: "space-between" }}
                numColumns={2}
                key={3}
                data={obj}
                renderItem={AssignItem} />
            }
            {/* <ScrollViewStyle horizontal={true} style={{color:'white', flexDirection:'row'}}>
                {
                    RegionList.map((item) => {
                        return(
                            <RegionTab style={selectRegion === item ? {backgroundColor:'black', color:'white'} : null}
                            onPress={()=>{setSelectRegion(item)}}>
                                <RegionTabText style={selectRegion === item ? {color:'white'} : null}>{item}</RegionTabText>
                            </RegionTab>
                        )
                    })
                }
            </ScrollViewStyle> */}
        </Container>
        </ImageBackground>
    )
}

const SUIT = styled.Text`
    font-family: 'SUIT-Bold';
    margin: 5px 0;
`

const Title = styled.Text`
    font-size: ${({theme}) => theme.fontSizes.title2};
    font-family: 'SUIT-SemiBold';
    color:white;
    margin-left: ${({theme}) => theme.screenMargin.titleLeftMargin};
`
const SubTitle = styled.Text`
    font-size: ${({theme}) => theme.fontSizes.title3};
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