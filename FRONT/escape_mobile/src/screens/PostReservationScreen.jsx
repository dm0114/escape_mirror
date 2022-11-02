import React from 'react'
import { Text, View } from "react-native";

function PostReservationScreen({route, navigation}) {
  const {themeName, leadtime, price, themeImg} = route.params
  return (
    <View>
      <Text>{themeImg}</Text>
      <Text>{themeName}</Text>
      <Text>{leadtime}</Text>
      <Text>{price}</Text>
      {/* 캘린더 추가 */}
      {/* 예약 버튼 추가 필요 */}
    </View>
  )
}

export default PostReservationScreen