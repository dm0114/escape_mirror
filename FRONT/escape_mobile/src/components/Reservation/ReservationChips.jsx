import React, { useEffect } from "react";
import styled from "styled-components/native";
import { Text, View } from "react-native";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { reservationApi } from "../../apis/api";

function ReservationChips(
  {
    themeId,
    date
  }
) {
  /**
   * API
   */
  const { isLoading, data, status } = useQuery(
    ["ReservedTime", themeId, date],
    reservationApi.getReservationDate
  );

  useEffect(() => {
    console.log(data);
    console.log(1);
    console.log(ReservationData);
  }, [data])
  /**
   * 캐싱된 값 접근
   */
  const queryClient = useQueryClient();
  const ReservationData = queryClient.getQueryData(["Reservation",themeId]);
  return (
    <View>
      <Text>1</Text>
    </View>
  );
}

const asd = styled.View`

`;
export default ReservationChips;
