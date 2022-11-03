import React from 'react'
import { Text, View } from "react-native";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { StyleSheet } from "react-native";

function PostReservationScreen({route, navigation}) {
  const {themeName, leadtime, price, themeImg} = route.params

  return (
    <View>
      <Text>{themeImg}</Text>
      <Text>{themeName}</Text>
      <Text>{leadtime}</Text>
      <Text>{price}</Text>
      {/* 캘린더 추가 */}
      <Calendar style={styles.calendar} />
      {/* 예약 버튼 추가 필요 */}
    </View>
  )
}

const styles = StyleSheet.create({
  calendar: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  }
});

export default PostReservationScreen