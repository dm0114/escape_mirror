import React from 'react'
import styled from 'styled-components/native';

export default function SearchComponent() {
  return (
    <Container>
      {/* 초기 키보드 한국어로 설정 */}
      <SearchTextInput 
        placeholder='카페 또는 테마를 입력하세요.'
      />
      {/* <ButtonContainer>
        <ButtonText>ff</ButtonText>
      </ButtonContainer> */}
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
`

const SearchTextInput = styled.TextInput`
  background-color: #fff;
  padding: 8px 16px;
  margin: 16px;
  border-color: #fff;
  border-radius: 20px;
`

// const ButtonContainer = styled.TouchableOpacity`
//   position : absolute;
//   top: 8px;
//   right: 16px;
//   width: 64px;
//   height: 64px;
//   border-radius: 50px;
//   background-color: #F9DC87;
// `

// const ButtonText = styled.Text`
//   margin: auto;
// `