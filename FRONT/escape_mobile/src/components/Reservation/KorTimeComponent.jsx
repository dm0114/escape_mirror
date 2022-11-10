import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";
import ReservationChips from "./ReservationChips";

// 이번 주를 반환하는 함수..하하..
const KoTIme = () => {
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const now = new Date(); // 현재 시간
  const utcNow = now.getTime() + now.getTimezoneOffset() * 60 * 1000; // 현재 시간을 utc로 변환한 밀리세컨드값
  const koreaTimeDiff = 15 * 60 * 60 * 1000 + 510000; // 한국 시간은 UTC보다 9시간 빠름(9시간의 밀리세컨드 표현)
  const koreaNow = new Date(utcNow - koreaTimeDiff);

  const Days = [
    [
      `${koreaNow.getFullYear()}-${
        koreaNow.getMonth() + 1
      }-${koreaNow.getDate()}`,
      koreaNow.getDate(),
      week[koreaNow.getDay()],
    ],
  ];
  for (let i = 0; i < 6; i++) {
    var tmp = new Date(koreaNow.setDate(koreaNow.getDate() + 1));
    var day = tmp.getDate();
    var date = week[koreaNow.getDay()];
    Days.push([`${tmp.getFullYear()}-${tmp.getMonth() + 1}-${day}`, day, date]);
  }
  return Days;
};

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
  // useEffect(() => {}, [dayData]);
  return (
    <>
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
      {/* 
        시간 Chip
      */}
      {dayData[0] != "날짜를" ? <ReservationChips date={dayData[0]} themeId={themeId}/> : null}
    </>
  );
};

const DayButton = styled.TouchableOpacity`
  margin: 10px 5px 20px 5px;
  width: 40px;
  height: 80px;
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
