import React, { useState } from "react";
import { Text, TouchableOpacity, View, TextInput } from "react-native";

import LoadingScreen from "./LoadingScreen";
import { useQuery } from "@tanstack/react-query";
import { reservationApi } from "../apis/api";

function ReservationTransfer({ route, navigation }) {
  const [query, setQuery] = useState("");

  const { isLoading, data } = useQuery(
    ["reservationDetail", query], //토큰 추가
    reservationApi.putReservationTransfer)
  
  const {reservationId, themeName, storeName, date, reserveTime, storeAddress} = route.params
  return (
    isLoading ? <LoadingScreen/> :
    <View>
      <Text>{reservationId}</Text>
      <Text>{themeName}</Text>
      <Text>{storeName}</Text>
      <Text>{date}</Text>
      <Text>{reserveTime}</Text>
      <Text>{storeAddress}</Text>
      <Text>양도하실 분의 닉네임을 검색해주세요</Text>
      <TextInput />
      <Text>님에게 예약을 양도하시겠습니까?</Text>
      <TouchableOpacity><Text>예</Text></TouchableOpacity>
      <TouchableOpacity><Text>아니오</Text></TouchableOpacity>
    </View>
  )
}

export default ReservationTransfer