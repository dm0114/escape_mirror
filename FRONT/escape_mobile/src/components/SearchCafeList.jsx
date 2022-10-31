import React from 'react'
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

export default function SearchCafeList({
  storeId,
  storeName,
  storeImg,
  storeAddress,
  likeCount
}) {
  // const navigation = useNavigation();
  // const goToDetail = () => {
  //    navigation.navigate('Stack', {screen: "CafeDetailScreen"})
  // }
  return (
    <TouchableOpacity>
    {/* <TouchableOpacity onPress={goToDetail}> */}
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
  width: 52px;
  height: 52px;
  border-radius: 50px;
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