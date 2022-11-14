import React, { useContext, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  Modal,
  Pressable,
  ImageBackground,
} from "react-native";
import styled from "styled-components/native";

import LoadingScreen from "./LoadingScreen";
import { useQuery } from "@tanstack/react-query";
import { reservationApi } from "../apis/api";
import ReservationTransfer from "./ReservationTransfer";
import { LayoutContext } from "../../App";
import { IconContainer } from "../styles/Theme/Info";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useTimer } from "react-timer-hook";
import { Timer } from "../components/Reservation/KorTimeComponent";
import ReservationHeaderPosterImage from "../components/ReservationHeaderPosterImage";
import theme from "../../theme";
const cardImage = require("../assets/mocks/image.png");

function ReservationDetailScreen({ route, navigation }) {
  const { Width, Height } = useContext(LayoutContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [query, setQuery] = useState("");

  const { isLoading, data } = useQuery(
    ["reservationDetail", query], //토큰 추가
    reservationApi.getReservationDetail
  );

  const tmpData = {
    storeAddress: "광주 어딘가",
    themeImg: "S3 주소",
  };

  function MyTimer({ expiryTimestamp }) {
    const { seconds, minutes, hours, days } = useTimer({
      expiryTimestamp,
      onExpire: () => console.warn("onExpire called"),
    });

    return (
      <View style={{ textAlign: "center" }}>
        <TimeText>
          {days} : {hours} : {minutes} : {seconds}
        </TimeText>
      </View>
    );
  }

  const { reservationId, themeName, storeName, date, reserveTime } =
    route.params;
  return isLoading ? (
    <LoadingScreen />
  ) : (
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
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={[styles.textStyle, styles.openTextStyle]}>예</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={[styles.textStyle, styles.closeTextStyle]}>아니오</Text>
              </Pressable>
            </ButtonWrapper>
          </View>
        </View>
      </Modal>

      {/* 
        애니메이션 헤더 포스터 이미지, Absolute라 마진 또는 패딩 탑 FullHeight / 4 필요
      */}
      <ReservationHeaderPosterImage />

      <BlurView
        source={cardImage}
        resizeMode="cover"
        style={{
          flex: 1,
          marginTop: Height / 6,
          paddingTop: Height / 4,
          paddingLeft: 40,
          paddingRight: 40,
          width: Width - 40,
          marginHorizontal: 20,
          elevation: 50,
        }}
      >
        <TextWrapper>
          <RowContainer>
            <MainTitle>{themeName}</MainTitle>
            <IconContainer>
              <Ionicons
                name="md-call"
                size={21}
                color="black"
                style={{ marginRight: 4 }}
              />
              <Ionicons
                name="md-logo-instagram"
                size={22}
                color="black"
                style={{ marginHorizontal: 8 }}
              />
              <Ionicons
                name="md-location-sharp"
                size={22}
                color="black"
                style={{ marginLeft: 4}}
              />
            </IconContainer>
          </RowContainer>

          <GenreTitle>{storeName}</GenreTitle>
        </TextWrapper>

        <ReservationView>
          <GenreTitle>일정</GenreTitle>
          <RowContainer>
              <Title>{date}</Title>  
              <Title>{reserveTime}</Title>
          </RowContainer>
        </ReservationView>

        {/* <Text>{reservationId}</Text> */}

        {/* <Text>{tmpData.themeImg}</Text> */}

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
          >
            
            <MaterialCommunityIcons name="send-circle-outline" size={36} color={theme.colors.point}/>
            <InfoTitle>예약 양도</InfoTitle>
          </Button>
          <Button>
            <MaterialCommunityIcons name="delete-circle-outline" size={36} color={theme.colors.point}/>
            <InfoTitle>예약 취소</InfoTitle>
          </Button>
        </ButtonWrapper>
      </BlurView>

      <ButtonView>
        <CircleLeft />
        <CircleRight />
        <GenreTitle style={{textAlign: 'center', marginBottom: 8}}>남은 시간</GenreTitle>
        <TimerView>
          <MyTimer expiryTimestamp={Timer(date, reserveTime)} />
        </TimerView>
      </ButtonView>
    </Container>
  );
}

export default ReservationDetailScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  stretch: {
    position: "relative",
    top: -150,
    width: 150,
    height: 240,
    resizeMode: "stretch",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: '#21212180'
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 40,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    width: 80,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 10,
  },
  buttonOpen: {
    backgroundColor: theme.colors.point 
  },
  buttonClose: {
    borderWidth: 1,
    borderStyle: "solid",
    backgroundColor: '#fff',
    borderColor: '#aaa' 
  },
  textStyle: {
    fontFamily: "SUIT-SemiBold",
    fontSize: 15,
    textAlign: "center",
  },
  openTextStyle: {
    color: '#fff',
  },
  closeTextStyle: {
    color: '#aaa',
  }
});

// 뷰
const Container = styled.View`
  flex: 1;
`;

const RowContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  
`

const BlurView = styled.View`
  flex: 1;
  background-color: #fff;
  justify-content: space-between;
  padding-top: 40px;
  padding-bottom: 20px;
`;

const ReservationView = styled.View`
  padding-top: 20px;
  padding-bottom: 20px;
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-style: solid;
  border-color: #00000020;
`;

const TimerView = styled.View`
  align-items: center;
`;
const ButtonView = styled.View`
  background-color: #fff;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  margin-top: 4px;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 80px;
  padding: 20px 40px 20px 40px;
`;

const TextWrapper = styled.View`
`;

const ButtonWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const SeperateView = styled.View`
  width: 2px;
  height: 20px;
  background-color: #000;
`;

// 요소
const Button = styled.TouchableOpacity`
  width: 100px;
  height: 40px;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  margin: 10px;
`;

const CircleLeft = styled.View`
  position: absolute;
  top: -12px;
  left: -10px;
  width: 20px;
  height: 20px;
  border-radius: 20px;
  background-color: #212121;
`;

const CircleRight = styled.View`
  position: absolute;
  top: -12px;
  right: -10px;
  width: 20px;
  height: 20px;
  border-radius: 20px;
  background-color: #212121;
`;

// 텍스트
const TimeTitleText = styled.Text`
  font-family: "SUIT-Bold";
  font-size: ${({ theme }) => theme.fontSizes.title1};
  letter-spacing: -1px;
  color: #000;
`;
const TimeText = styled.Text`
  font-family: "SUIT-Bold";
  font-size: ${({ theme }) => theme.fontSizes.title1};
  letter-spacing: -1px;
  color: #000;
`;

const MainTitle = styled.Text`
  font-family: "SUIT-ExtraBold";
  font-size: ${({ theme }) => theme.fontSizes.title1};
  letter-spacing: -1px;
  color: #000;
`;
const Title = styled.Text`
  font-family: "SUIT-Bold";
  font-size: ${({ theme }) => theme.fontSizes.title3};
  line-height: ${({ theme }) => theme.fontHeight.title3};
  color: #000;
`;

const SubTitle = styled.Text`
  font-family: "SUIT-ExtraBold";
  font-size: ${({ theme }) => theme.fontSizes.title2};
  line-height: ${({ theme }) => theme.fontHeight.title2};
  letter-spacing: -1px;
  color: #000;
`;

const GenreTitle = styled.Text`
  font-family: "SUIT-SemiBold";
  font-size: ${({ theme }) => theme.fontSizes.body2};
  letter-spacing: -0.5px;
  margin-bottom: 4px;
  color: #aaa;
`;

const InfoTitle = styled.Text`
  font-family: "SUIT-SemiBold";
  font-size: ${({ theme }) => theme.fontSizes.body2};
  margin-top: 6px;
  letter-spacing: -0.5px;
  color: #aaa;
`;
