import React from 'react'

import styled from 'styled-components/native';
import theme from '../../theme';

import ReservationComponent from '../components/ReservationComponent';

export default function MainScreen() {
  return (
    <Container>
      <MainView flex={1}>
        <MainTextView flex={1}>
          <MainText>
            안녕하세요, {}님.{"\n"}
            오랜만에 저택으로 돌아오셨네요.{"\n"}
            받으신 초대장 목록을 보여드릴게요.
          </MainText>
        </MainTextView>
        <ReservationComponent />
      </MainView>
      <MainView flex={2} backgroundColor="blue">
        <MainText>
          안녕하세요, {}님.{"\n"}
          오랜만에 저택으로 돌아오셨네요.{"\n"}
          받으신 초대장 목록을 보여드릴게요.
        </MainText>
      </MainView>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
`
const MainView = styled.View`
  flex: ${props=> props.flex};
  background-color: ${props => props.backgroundColor};
`

const MainTextView = styled.View`
  flex: ${props=> props.flex};
  justify-content: center;
  align-items: center;
`

const MainText = styled.Text`
  font-family: "SUIT-Bold";
  font-size: ${({ theme }) => theme.fontSizes.title2};
  color: #fff;
`