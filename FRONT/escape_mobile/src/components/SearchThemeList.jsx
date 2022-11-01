import React from 'react'
import { TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';

export default function SearchThemeList({
  themeId,
  themeName,
  storeName,
  themeImg,
  likeCount,
  star,
}) {
  const navigation = useNavigation()
  
  return (
    <TouchableOpacity onPress={() => {navigation.navigate('ThemeDetailScreen')}}>
      <Container>
        {/* themeImg 넣기 */}
        <CafeImage />
        <TextContainer>
          <Title>{themeName}</Title>
          <SubTitle>{storeName}</SubTitle>
          <SubTitle>{likeCount}</SubTitle>
          <SubTitle>{star}</SubTitle>
        </TextContainer>
        {/* store LikeButton 추가 */}
      </Container>
    </TouchableOpacity>
  )
}

const Container = styled.View`
  flex-direction: row;
  margin-bottom: 16px;
  align-items: center;
`

const TextContainer = styled.View`
  margin-left: 16px;
`

// 추후 이미지 태그로 대체
const CafeImage = styled.View`
  width: 100px;
  height: 160px;
  background-color: gray;
`
const Title = styled.Text`
  font-family: "SUIT-SemiBold";
  font-size: ${({ theme }) => theme.fontSizes.body};
  color: #fff;
  margin-bottom: 8px;
`
const SubTitle = styled.Text`
  font-family: "SUIT-Regular";
  font-size: ${({ theme }) => theme.fontSizes.caption1};
  color: #fff;
`