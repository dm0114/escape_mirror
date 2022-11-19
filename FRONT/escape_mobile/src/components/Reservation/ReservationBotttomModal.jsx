import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import {
  Button,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import styled from "styled-components/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MainContentWrapper } from "../../styles/Search/CafeList";

import { useQuery } from "@tanstack/react-query";
import { reservationApi } from "../../apis/api";
import { useRecoilValue } from "recoil";
import { POSTReservationData } from "../../store/Atom";

import { KorTime } from "./KorTimeComponent";
import ReservationChips from "./ReservationChips";
import LoadingScreen from "../../screens/LoadingScreen";
import { useNavigation } from "@react-navigation/native";
import theme from "../../../theme";
import { ButtonWrapper } from "../../screens/ReservationDetailScreen";


// 예약 가능 시간이 모든 예약 가능 시간
// 예약
function ReservationBotttomModal({ themeId, Price, Width }) {
  const navigation = useNavigation()
  const [modalVisible, setModalVisible] = useState(false)
  // 

  const priceInfo = [0, ...Price.split('/')]
  
  /**
   * 레이아웃
   */
  const ButtonWidth = (Width - 256) / 2;

  /**
   * 모달
   */
  // ref
  const bottomSheetModalRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  /**
   * API
   */
  const { isLoading, data, status } = useQuery(
    ["Reservation", themeId],
    reservationApi.getReservationTime
  );

  const reserveParams = useRecoilValue(POSTReservationData);
  console.log(reserveParams);
  const { data: postReservationData, refetch } = useQuery(
    ["ReservationResult", reserveParams],
    reservationApi.postReservation,
    { enabled: false }
  );

  useEffect(() => {
    console.log(postReservationData);
    // setModalVisible(!modalVisible)
    // navigation.navigate('TabViewExample')
  }, [postReservationData])

  /**
   * 카운터
   */
  const [number, setNumber] = useState(1);
  const onIncrease = () => {
    setNumber((prevNumber) => prevNumber + 1);
  };
  const onDecrease = () => {
    setNumber((prevNumber) => prevNumber - 1);
  };

  /**
   * 토글러
   */
  const [toggler, setToggler] = useState(false);
  const handleSheetChanges = useCallback((index) => {
    if (index === -1) {
      setToggler(false);
    } else if (index === 1) {
      setToggler(true);
    }
  }, []);

  /**
   * 예약 유효성 검사 및 예약 완료 모달 API POST
   */
  return status === "success" ? (
    <BottomSheetModalProvider>
            {/* 
        모달
      */}
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
            <Container>
              <Title>예약이 완료되었습니다!</Title>
            </Container>

            <ButtonWrapper>
              <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => {
                    setModalVisible(!modalVisible)
                    navigation.replace('TabViewExample')
                  }
                }
              >
                <Text style={[styles.textStyle, styles.openTextStyle]}>확인</Text>
              </Pressable>
            </ButtonWrapper>
          </View>
        </View>
      </Modal>

      <View style={{ position: "absolute", bottom: 0, backgroundColor: "red" }}>
        {toggler ? null : (
          <ButtonContainer left={ButtonWidth} onPress={handlePresentModalPress}>
            <SubTitle>예약하기</SubTitle>
          </ButtonContainer>
        )}

        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          <View style={styles.contentContainer}>

            <KorTime themeId={themeId} />

            <InfoTextWrapper>
              <RowContainer>
                <RowContainer>
                  <Circle onPress={number <= 4 ? onIncrease : null}>
                    <MaterialCommunityIcons
                      name="plus-thick"
                      size={14}
                      color="black"
                    />
                  </Circle>

                  <PriceContainer>
                    <SubTitle>
                      {number}인 {!!priceInfo[number] ? priceInfo[number] : 0}원
                    </SubTitle>
                  </PriceContainer>

                  <Circle onPress={number >= 2 ? onDecrease : null}>
                    <MaterialCommunityIcons
                      name="minus-thick"
                      size={14}
                      color="black"
                    />
                  </Circle>
                </RowContainer>
              </RowContainer>
            </InfoTextWrapper>

            {reserveParams ? (
              <ButtonContainer
                left={ButtonWidth}
                onPress={()=>{refetch().then(setModalVisible(!modalVisible))}}
              >
                <SubTitle>선택 완료</SubTitle>
              </ButtonContainer>
            ) : null}
          </View>
        </BottomSheetModal>
        
      </View>
    </BottomSheetModalProvider>
  ) : (
    <LoadingScreen />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,

    zIndex: 100,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: '#00000090'
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 40,
    paddingTop: 30,
    paddingBottom: 10,
    alignItems: "center",
  },
  button: {
    width: 80,
    borderRadius: 20,
    padding: 10,
    elevation: 3,
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

const InfoTextWrapper = styled.View`
  flex: 2;
  margin-bottom: 10px;
`;

const ButtonContainer = styled.TouchableOpacity`
  position: absolute;

  bottom: 20px;
  left: ${(props) => props.left}px;
  right: 0;

  margin: auto;
  /* margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px; */

  width: 256px;
  padding: 10px;
  border-radius: 40px;
  background-color: #f6f5e9;

  z-index: 5;
  justify-content: center;
  align-items: center;
`;
const RowContainer = styled.View`
  flex-direction: row;
  justify-content: center;
`;

const Circle = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
  border-radius: 40px;
  align-items: center;
  justify-content: center;
  background-color: #f6f5e9;
`;
const PriceContainer = styled.View`
  width: 128px;
  align-items: center;
`;

const SubTitle = styled.Text`
  font-family: "SUIT-Bold";
  font-size: ${({ theme }) => theme.fontSizes.body2};
  line-height: 36px;
  letter-spacing: -0.5px;
`;

const Body = styled.Text`
  font-family: "SUIT-SemiBold";
  font-size: ${({ theme }) => theme.fontSizes.caption1};
  line-height: ${({ theme }) => theme.fontHeight.caption1};
  letter-spacing: 0.5px;
  color: #9b989b;
  text-align: center;
`;

const Container = styled.View`
  align-items: center;
`

const Title = styled.Text`
  font-family: "SUIT-Bold";
  font-size: ${({ theme }) => theme.fontSizes.body};
  line-height: ${({ theme }) => theme.fontHeight.body};
  margin-bottom: 20px;
  color: #000;
`;
export default ReservationBotttomModal;
