import React, { useState } from "react";
import styled from "styled-components/native";
import { useTimer } from "react-timer-hook";
import { View } from "react-native";

export default function MyTimer({ expiryTimestamp }) {
  const [timeStatus, setTimeStatus] = useState(false)
  const { seconds, minutes, hours, days } = useTimer({
    expiryTimestamp,
    onExpire: () => setTimeStatus(true),
  });

  return (
    <View style={{ textAlign: "center" }}>
              {timeStatus 
          ?  <TimeText>입장해주세요</TimeText>
          :  <TimeText>{days} : {hours} : {minutes} : {seconds}</TimeText>
        }
    </View>
  );
}

const TimeText = styled.Text`
  font-family: "SUIT-Bold";
  font-size: ${({ theme }) => theme.fontSizes.title2};
  letter-spacing: -1px;
`;
