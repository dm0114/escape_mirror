import React from "react";
import styled from "styled-components/native";
import { useTimer } from "react-timer-hook";
import { View } from "react-native";

export default function MyTimer({ expiryTimestamp }) {
  const { seconds, minutes, hours, days } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
  });

  return (
    <View style={{ textAlign: "center" }}>
      <TimeText>{days} : {hours} : {minutes} : {seconds}</TimeText>
    </View>
  );
}

// export default function App() {
//   const time = new Date();
//   time.setSeconds(time.getSeconds() + 600); // 10 minutes timer
//   return (
//     <div>

//     </div>
//   );
// }
const TimeText = styled.Text`
  font-family: "SUIT-Bold";
  font-size: ${({ theme }) => theme.fontSizes.title2};
  letter-spacing: -1px;
`;
