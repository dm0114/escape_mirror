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
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import styled from "styled-components/native";

import { useQuery } from "@tanstack/react-query";
import { reservationApi } from "../../apis/api";
import { MainContentWrapper } from "../../styles/Search/CafeList";
import { KorTime } from "./KorTimeComponent";
import ReservationChips from "./ReservationChips";
import LoadingScreen from "../../screens/LoadingScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// 예약 가능 시간이 모든 예약 가능 시간
// 예약
function ReservationBotttomModal({ themeId, PriceData }) {
  /**
   * 레이아웃
   */
  const dimensions = useWindowDimensions();
  const Width = (dimensions.width - 256) / 2;

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
      <View style={{ position: "absolute", bottom: 0 }}>
        {
          toggler ? null :
          <ButtonContainer left={Width} onPress={handlePresentModalPress}>
            <SubTitle>예약하기</SubTitle>
          </ButtonContainer>
        }

        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          {/* 
            달력, 타임 테이블
           */}
          <View style={styles.contentContainer}>
            <KorTime themeId={themeId} />
            <InfoTextWrapper>
              <RowContainer>
                <RowContainer>
                  <Circle onPress={number <= 4 ? onIncrease : null}>
                    <MaterialCommunityIcons name="plus-thick" size={14} color="black" />
                  </Circle>

                  <PriceContainer>
                    <SubTitle>{number}인  {!!PriceData[number] ? PriceData[number] : 0}원</SubTitle>
                  </PriceContainer>
                  
                  <Circle onPress={number >= 2 ? onDecrease : null}>
                    <MaterialCommunityIcons name="minus-thick" size={14} color="black" />
                  </Circle>
                </RowContainer>
              </RowContainer>
            </InfoTextWrapper>
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

    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#00000020",

    zIndex: 100,
  },
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
`
const PriceContainer = styled.View`
  width: 128px;
  align-items: center;
`

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
export default ReservationBotttomModal;
