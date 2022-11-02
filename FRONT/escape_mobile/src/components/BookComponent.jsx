import React from 'react';

import styled from 'styled-components/native';
import theme from '../../theme';

export default function BookComponent({
  bookId,
  themeName,
  storeName,
  isClear,
  isReview,
  doneDate,
  usedHint,
  clearTime
}) {
  return (
    <>
      <CafeTitle>{doneDate}</CafeTitle>
      <BookContainer>
        <CafeImage />
        <TextContainer>
          <ThemeTitle>{themeName}</ThemeTitle>
          <CafeTitle>{storeName}</CafeTitle>
          <CafeTitle>클리어 타임 : {clearTime}</CafeTitle>
          <CafeTitle>사용한 힌트 : {usedHint}</CafeTitle>
        </TextContainer>
        <TimeContainer>
          <TimeText>{isClear ? 'Clear' : 'Fail'}</TimeText>
          {isReview ? null : <CafeTitle>후기쓰러가기</CafeTitle>}
        </TimeContainer>
      </BookContainer>
    </>
  )
}

const BookContainer = styled.View`
  ${({ theme }) => theme.common.flexCenterRow}
  
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 12px;
  padding: 20px;
`


const TextContainer = styled.View`
`

const TimeContainer = styled.View`

`

// 추후 이미지 태그로 대체
const CafeImage = styled.View`
  width: 100px;
  height: 160px;
  background-color: gray;
`

const ThemeTitle = styled.Text`
  font-family: "SUIT-SemiBold";
  font-size: ${({ theme }) => theme.fontSizes.body};
  margin-bottom: 4px;
`
const CafeTitle = styled.Text`
  font-family: "SUIT-Medium";
  font-size: ${({ theme }) => theme.fontSizes.caption1};
`
const TimeText = styled.Text`
  font-family: "SUIT-Bold";
  font-size: ${({ theme }) => theme.fontSizes.title2};
`