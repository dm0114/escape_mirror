import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { ScrollView, Text, useWindowDimensions, View, TouchableOpacity } from "react-native";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useSetRecoilState } from 'recoil';

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { reservationApi } from "../../apis/api";

import LoadingScreen from "../../screens/LoadingScreen";
import { POSTReservationData } from "../../store/Atom";

function ReservationChips({ themeId, date }) {
  const [selectTime, setSelectTime] = useState();
  /**
   * 레이아웃
   */
  const layout = useWindowDimensions();
  const Width = layout.width;

  /**
   * API (예약 가능한 값)
   */
  const { isLoading, data, status } = useQuery(
    ["ReservedTime", themeId, date],
    reservationApi.getReservationDate
  );

  // 리코일로 themeTimeId 올리기
  const setReserveData = useSetRecoilState(POSTReservationData)
  
  /**
   * 캐싱된 값 접근
   */
  const queryClient = useQueryClient();
  const ReservationData = queryClient.getQueryData(["Reservation", themeId]);

  /**
   * TimeTable Setting (예약 / 미예약 테이블 렌더링)
   */
  const [timeTable, setTimeTable] = useState({});
  useEffect(() => {
    let tmp = {};
    data?.map((themeTimeId) => {
      tmp[themeTimeId] = false;
    });
    ReservationData.map((item) => {
      tmp[item.themeTimeId] = true;
    });
    setTimeTable(tmp);

    /**
     * POST용 리코일 데이터 셋팅
     */
    
  }, [data]);

  useEffect(() => {
    if (!!selectTime) {setReserveData({selectTime, themeId, date})}
  }, [selectTime])


  return isLoading ? (
    <LoadingScreen />
  ) : (
      <BottomSheetScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20 }}
        horizontal={true}
        style={{marginBottom: 4}}
      >
        {ReservationData.map((item, idx) => {
          if (timeTable[item.themeTimeId]) {
            return (
              <Reservable key={idx} onPress={()=>{
                setSelectTime(item.themeTimeId)
              }}
              style={selectTime === item.themeTimeId ? {backgroundColor:'#ddd'} : null}
              >
                <ReservableText>{item.time}</ReservableText>
              </Reservable>
            );
          } else {
            return (
              <ReservedChip key={idx}>
                <ReservedText>{item.time}</ReservedText>
              </ReservedChip>
            );
          }
        })}
      </BottomSheetScrollView>

  );
}

const Chip = styled.TouchableOpacity`
  width: 80px;
  height: 40px;
  margin: 0px 5px 0px 5px;

  justify-content: center;
  align-items: center;

  border-radius: 8px;
  border-style: solid;
  border-width: 1px;
  border-color: #00000020;
`;
const ReservedChip = styled(Chip)`
  background-color: #ddd;
`;

const Reservable = styled(Chip)``;

const ReservationText = styled.Text`
  font-family: "SUIT-SemiBold";
  font-size: ${({ theme }) => theme.fontSizes.caption0};
  line-height: ${({ theme }) => theme.fontHeight.caption0};
  letter-spacing: 1px;
  text-align: center;
`;
const ReservedText = styled(ReservationText)`
  color: #9b989b;
`;
const ReservableText = styled(ReservationText)``;

export default ReservationChips;

