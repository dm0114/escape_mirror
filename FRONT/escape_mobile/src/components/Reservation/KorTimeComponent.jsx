import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";
import ReservationChips from "./ReservationChips";
import moment from "moment-timezone";
const nowTime = moment().tz('Asia/Seoul').format("YYYY-MM-DDTHH:mm:ss")


// 이번 주를 반환하는 함수..하하..
const KoTIme = () => {
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const now = new Date(nowTime) // 현재 시간
  const Days = [
    [
      `${now.getFullYear()}-${
        now.getMonth() + 1
      }-${now.getDate()}`,
      now.getDate(),
      week[now.getDay()],
    ],
  ];
  for (let i = 0; i < 6; i++) {
    var tmp = new Date(now.setDate(now.getDate() + 1));
    var day = tmp.getDate();
    var date = week[now.getDay()];
    Days.push([`${tmp.getFullYear()}-${tmp.getMonth() + 1}-${day}`, day, date]);
  }
  return Days;
};

export const Timer = (date, reserveTime) => {
  // 시간 나면 캐싱
  // 한국 시간
  var now = new Date(nowTime);

  // 현재시간 
  var year = now.getFullYear();     // 연도
  var month = now.getMonth();     // 월                             
  var day = now.getDate();          // 일
  var hours = now.getHours();       // 현재 시간
  var minutes = now.getMinutes();   // 현재 분
  var seconds = now.getSeconds();   // 현재 초
  
  // 비교시간    
  var sttDt = date.split("-");
  var sttTime = reserveTime.split(":");
  var sttYear = sttDt[0];
  var sttMonth = sttDt[1] - 1;
  var sttDay = sttDt[2];
  var sttHours = sttTime[0] - 9;
  var sttMinutes = sttTime[1];

  var date1 = new Date(year, month, day, hours, minutes, seconds);                    // 현재 
  var date2 = new Date(sttYear, sttMonth, sttDay, sttHours, sttMinutes);              // 파라미터
  var elapsedSec = (date2.getTime() - date1.getTime()) / 1000; 
  
  const time = new Date(nowTime);
  time.setSeconds(time.getSeconds() + elapsedSec)
  return time
}

export const KorTime = ({themeId}) => {
  const [dayData, setDayData] = useState(["날짜를", "선택해주세요"]);
  const [toggleData, setToggleData] = useState([]);
  const Days = KoTIme();

  var tmp = [];
  const setTmp = (i, arr) => {
    tmp = [false, false, false, false, false, false, false];
    tmp[i] = !tmp[i];
    setToggleData(tmp);
    setDayData([arr[0], arr[2]]);
  };
  
  return (
    <View style={{flex: 3}}>
      <View style={{flex: 2, alignItems:"center"}}>
        <Title>{`${dayData[0]} ${dayData[1]}`}</Title>
        <RowContainer>
          {Days.map((item, i) => {
            return (
              <DayButton
                key={i}
                activeOpacity={1}
                onPress={() => {
                  setTmp(i, item);
                }}
              >
                {toggleData[i] ? (
                  <FocusedDayButton>
                    <FocusSubTitle>{item[1]}</FocusSubTitle>
                  </FocusedDayButton>
                ) : (
                  <SubTitle>{item[1]}</SubTitle>
                )}
                {toggleData[i] ? (
                  <FocusBody>{item[2]}</FocusBody>
                ) : (
                  <Body>{item[2]}</Body>
                )}
              </DayButton>
            );
          })}
        </RowContainer>
      </View>
      {/* 
        시간 Chip
      */}
      <View style={{flex:1}}>
        {dayData[0] != "날짜를" ? <ReservationChips date={dayData[0]} themeId={themeId}/> : null}
      </View>
    </View>
  );
};

const DayButton = styled.TouchableOpacity`
  margin: 10px 5px 20px 5px;
  width: 40px;
  height: 60px;
  align-items: center;
`;

const RowContainer = styled.View`
  flex-direction: row;
`;

const FocusedDayButton = styled.View`
  width: 40px;
  height: 40px;
  margin-bottom: 4px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.point};
`;

const Title = styled.Text`
  font-family: "SUIT-SemiBold";
  font-size: ${({ theme }) => theme.fontSizes.caption0};
  line-height: ${({ theme }) => theme.fontHeight.caption0};
  letter-spacing: 0.5px;
  text-align: center;
  margin-top: 20px;
`;

const SubTitle = styled.Text`
  font-family: "SUIT-Bold";
  font-size: ${({ theme }) => theme.fontSizes.body2};
  line-height: 36px;
  letter-spacing: -0.5px;
`;

const Body = styled.Text`
  font-family: "SUIT-SemiBold";
  font-size: ${({ theme }) => theme.fontSizes.caption1};
  line-height: ${({ theme }) => theme.fontHeight.caption1};
  letter-spacing: 0.5px;
  color: #9b989b;
  text-align: center;
`;

const FocusSubTitle = styled.Text`
  font-family: "SUIT-Bold";
  font-size: ${({ theme }) => theme.fontSizes.body2};
  line-height: 36px;
  letter-spacing: -0.5px;
  color: #fff;
`;

const FocusBody = styled.Text`
  font-family: "SUIT-Bold";
  font-size: ${({ theme }) => theme.fontSizes.caption1};
  line-height: ${({ theme }) => theme.fontHeight.caption1};
  color: ${({ theme }) => theme.colors.point};
  text-align: center;
`;
