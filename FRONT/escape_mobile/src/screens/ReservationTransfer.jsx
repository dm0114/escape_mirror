import React, { useState } from "react";
import { Text, TouchableOpacity, View, TextInput } from "react-native";
import styled from 'styled-components/native';

import LoadingScreen from "./LoadingScreen";
import { useQuery } from "@tanstack/react-query";
import { reservationApi } from "../apis/api";

function ReservationTransfer({
  reservationId, themeName, storeName, date, reserveTime, storeAddress
}) {
  const [query, setQuery] = useState("");

  const { isLoading, data } = useQuery(
    ["reservationDetail", query], //토큰 추가
    reservationApi.putReservationTransfer)
  console.log(reservationId, themeName, storeName, date, reserveTime, date, reserveTime, storeAddress);
  return (
    isLoading ? <LoadingScreen/> :
    <Container>
      {/* <Text>{reservationId}</Text> */}
      <Text>{themeName}</Text>
      <Text>{storeName}</Text>
      <Text>{date}</Text>
      <Text>{reserveTime}</Text>
      <Text>{storeAddress}</Text>
      <Text>양도하실 분의 닉네임을 검색해주세요</Text>
      <TextInput 
        style={{ width: 180, borderWidth: 1}}
      />
      <Text>님에게 예약을 양도하시겠습니까?</Text>
    </Container>
  )
}

export default ReservationTransfer

const Container = styled.View`
  align-items: center;
`