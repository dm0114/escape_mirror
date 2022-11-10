import React, { useCallback, useEffect, useMemo, useRef } from "react";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { useQuery } from "@tanstack/react-query";
import { reservationApi } from "../../apis/api";
import { Button, StyleSheet, Text, View } from "react-native";
import { MainContentWrapper } from "../../styles/Search/CafeList";
import { KorTime } from "./KorTimeComponent";
import ReservationChips from "./ReservationChips";
import LoadingScreen from "../../screens/LoadingScreen";


// 예약 가능 시간이 모든 예약 가능 시간
// 예약
function ReservationBotttomModal({
  themeId
}) {
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
  const handleSheetChanges = useCallback((index) => {
    // console.log("handleSheetChanges", index);
  }, []);

  /**
   * API
   */
  const { isLoading, data, status } = useQuery(
    ["Reservation", themeId],
    reservationApi.getReservationTime
  );


  useEffect(() => {
    console.log(data);
    console.log(2);
  }, [data]);

  return (
    status === 'success' ?
    <BottomSheetModalProvider>
      <View>
        <Button
          onPress={handlePresentModalPress}
          title="Present Modal"
          color="black"
        />
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
          </View>

          
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
    : <LoadingScreen />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 20,

    borderWidth: 1,
    borderStyle: "solid",
    borderColor: '#00000010'
  },
});

export default ReservationBotttomModal;
