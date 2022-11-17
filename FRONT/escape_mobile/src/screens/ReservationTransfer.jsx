import React, { useState } from "react";
import { Text, TouchableOpacity, View, TextInput } from "react-native";
import styled from 'styled-components/native';

import LoadingScreen from "./LoadingScreen";
import { useQuery } from "@tanstack/react-query";
import { reservationApi } from "../apis/api";

function ReservationTransfer() {
  return (
    <Container>
      <Title>정말 양도하시겠습니까?</Title>
    </Container>
  )
}

export default ReservationTransfer

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