import React, { useState } from "react";
import { Text, TouchableOpacity, View, Image, StyleSheet, Modal, Pressable } from "react-native";
import styled from 'styled-components/native';

import LoadingScreen from "./LoadingScreen";
import { useQuery } from "@tanstack/react-query";
import { reservationApi } from "../apis/api";
import ReservationTransfer from "./ReservationTransfer";

function ReservationDetailScreen({ route, navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [query, setQuery] = useState("");

  const { isLoading, data } = useQuery(
    ["reservationDetail", query], //토큰 추가
    reservationApi.getReservationDetail)
  
    const tmpData = {
    "storeAddress": "광주 어딘가",
    "themeImg": "S3 주소"
    }
  
  const {reservationId, themeName, storeName, date, reserveTime} = route.params
  return (
    isLoading ? <LoadingScreen/> :
    <Container>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            
            <ReservationTransfer 
              reservationId={reservationId}
              themeName={themeName}
              storeName={storeName}
              date={date}
              reserveTime={reserveTime}
              storeAddress={tmpData.storeAddress}
            />
            
            <ButtonWrapper>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>예</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>아니오</Text>
              </Pressable>
            </ButtonWrapper>
          </View>
        </View>
      </Modal>
      <BackgroundView />
      <MainView>
        <Image
          style={styles.stretch}
          source={require('../assets/mocks/image.png')}
        />
        {/* <Text>{reservationId}</Text> */}
        <TextWrapper>
          <SubTitle >{storeName}</SubTitle>
          <MainTitle>{themeName}</MainTitle>
          <Text>{tmpData.storeAddress}</Text>
        </TextWrapper>
        <ReservationView>
          <BodyText>{date}</BodyText>
          <MainTitle>{reserveTime}</MainTitle>
        </ReservationView>
        {/* <Text>{tmpData.themeImg}</Text> */}
        <ButtonView>
          <ButtonWrapper>
            <Button
              onPress={() => setModalVisible(true)}
              // onPress={() => {navigation.navigate('ReservationTransfer', {
              //   reservationId: reservationId,
              //   themeName: themeName,
              //   storeName: storeName,
              //   date: date,
              //   reserveTime: reserveTime,
              //   storeAddress: tmpData.storeAddress
              // })}}
            ><Text>양도하기</Text></Button>
            <Button><Text>예약 취소하기</Text></Button>
          </ButtonWrapper>
        </ButtonView>
      </MainView>
    </Container>
  )
}

export default ReservationDetailScreen

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  stretch: {
    position: "relative",
    top: -150,
    width: 150,
    height: 240,
    resizeMode: 'stretch',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    width: 80,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 10
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

// 뷰
const Container = styled.View `
  flex: 1;
  background-color: tomato;
  /* width:SCREEN_WIDTH, */
`
const BackgroundView = styled.View`
  flex: 1.2;
`
const MainView = styled.View`
  flex: 3;
  background-color: #fff;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  align-items: center;
`

const ReservationView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`
const ButtonView = styled.View`
  flex: 1;
`

const TextWrapper = styled.View`
  margin-top: -130px;
  align-items: center;
`
const ButtonWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

// 요소
const Button = styled.TouchableOpacity`
  width: 160px;
  height: 40px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: tomato;
  margin: 10px;
`

// 텍스트
const MainTitle = styled.Text`
  font-family: "SUIT-Bold";
  font-size: ${({ theme }) => theme.fontSizes.title2};
  line-height: ${({ theme }) => theme.fontHeight.title2};
`
const SubTitle = styled.Text`
  font-family: "SUIT-SemiBold";
  font-size: ${({ theme }) => theme.fontSizes.body};
  line-height: ${({ theme }) => theme.fontHeight.body};
  color: #ddd;
`
const BodyText = styled.Text`
  font-family: "SUIT-regular";
  font-size: ${({ theme }) => theme.fontSizes.body};
  line-height: ${({ theme }) => theme.fontHeight.body};

`
