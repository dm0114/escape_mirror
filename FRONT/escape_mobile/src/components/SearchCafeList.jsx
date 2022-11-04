import React from 'react'
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styled from 'styled-components/native';

export default function SearchCafeList({
  storeId,
  storeName,
  storeImg,
  storeAddress,
  likeCount
}) {
  const navigation = useNavigation()
  return (
    <TouchableOpacity onPress={() => {navigation.navigate('CafeDetailScreen')}}>
      <Container>
        {/* storeImg 넣기 */}
        <CafeImage />
        <TextContainer>
          <Title>{storeName}</Title>
          <SubTitle>{storeAddress}</SubTitle>
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
  width: 64px;
  height: 64px;
  border-radius: 50px;
  background-color: gray;
`
const Title = styled.Text`
  font-family: "SUIT-SemiBold";
  font-size: ${({ theme }) => theme.fontSizes.title3};
  color: #fff;
  margin-bottom: 8px;
`
const SubTitle = styled.Text`
  font-family: "SUIT-Regular";
  font-size: ${({ theme }) => theme.fontSizes.caption1};
  color: #fff;
`