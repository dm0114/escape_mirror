import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { useTimer } from "react-timer-hook";
import { ActivityIndicator, View } from "react-native";

export default function MyTimer({ expiryTimestamp }) {
  const [isLoading, setIsLoading] = useState(true)
  const [timeStatus, setTimeStatus] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)  
      }, 1100);
  }, []);

  const { seconds, minutes, hours, days } = useTimer({
    expiryTimestamp,
    onExpire: () => setTimeStatus(true),
  });

  return (
    <View style={{ textAlign: "center" }}>
      {isLoading ? <LoadingView><ActivityIndicator color="#ff5f3f"/></LoadingView> : timeStatus ? (
        <TimeText>입장해주세요</TimeText>
      ) : (
        <TimeText>
          {days} : {hours} : {minutes} : {seconds}
        </TimeText>
      ) }
    </View>
  );
}

const LoadingView = styled.View`
  height: 31px;
  justify-content: center;
  align-items: center;
`

const TimeText = styled.Text`
  font-family: "SUIT-Bold";
  font-size: ${({ theme }) => theme.fontSizes.title2};
  letter-spacing: -1px;
`;
