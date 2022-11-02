import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import LoadingScreen from "./LoadingScreen";
import { useQuery } from "@tanstack/react-query";
import { reservationApi } from "../apis/api";

function ReservationDetailScreen({ route, navigation }) {
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
    <View>
      <Text>{reservationId}</Text>
      <Text>{themeName}</Text>
      <Text>{storeName}</Text>
      <Text>{date}</Text>
      <Text>{reserveTime}</Text>
      <Text>{tmpData.storeAddress}</Text>
      <Text>{tmpData.themeImg}</Text>
      <TouchableOpacity
        onPress={() => {navigation.navigate('ReservationTransfer', {
          reservationId: reservationId,
          themeName: themeName,
          storeName: storeName,
          date: date,
          reserveTime: reserveTime,
          storeAddress: tmpData.storeAddress
        })}}
      ><Text>양도하기</Text></TouchableOpacity>
      <TouchableOpacity><Text>취소하기</Text></TouchableOpacity>
    </View>
  )
}

export default ReservationDetailScreen