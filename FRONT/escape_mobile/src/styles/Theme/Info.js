import { StyleSheet } from "react-native";
import styled from "styled-components/native";

// 뷰
export const RowContainer = styled.View`
  flex-direction: row;
  justify-content: center;
`;

export const IconContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`

export const MainContainer = styled.ScrollView`
  flex: 1;
`;
export const RatingContainer = styled.View`
  margin-bottom: 20px;
`;
export const FloatContainer = styled.View`
  flex: 1;
  flex-direction: row;
`;
export const FloatLeftContainer = styled.View`
  flex: 5;
`;
export const FloatRightContainer = styled.View`
  flex: 1;
  padding-top: 80px;
  /* padding-right: 20px; */
  padding-bottom: 20px;
`;
export const ChartContainer = styled.View`
  height: 200px;
  border-width: 1px;
  border-color: rgba(228, 228, 228, 10);
`;
export const TitleTextContainer = styled.View`
  margin-top: 80px;
  margin-left: 40px;
`;

export const CafeImage = styled.View`
  position: relative;
  top: -80px;
  width: 100px;
  height: 160px;
  margin-bottom: -60px;
  margin-left: auto;
  margin-right: auto;
  background-color: gray;
  border-radius: 10px;
`;
export const RankingWrapper = styled.View`
  background-color: #fff;
  margin-top: 4px;
  margin-bottom: 4px;
  border-radius: 8px;
  padding-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
`;
export const RankingContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  width: 240px;
`
export const RankingInfoContainer = styled.View`
  width: 80px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`
export const InfoTextWrapper = styled.View`
  margin-bottom: 5px;
`;
export const RatingView = styled.View`
  position: absolute;
  margin-top: auto;
  margin-left: auto;
  top: -30px;
  right: -30px;
  width: 60px;
  height: 60px;

  border-width: 1px;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  align-items: center;
  justify-content: center;

  z-index: 9;
  background-color: #fff;
`;
export const ReviewRowContainer = styled.View`
  flex-direction: row;
  margin-top: 5px;
`
export const ReivewRowInfo = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`

// 요소
export const ReviewWrapper = styled.View`
  padding: 20px;
  border-bottom-width: 1px;
  border-style: solid;
  border-color: #00000010;
`;
export const ReviewProfileImg = styled.View`
  width: 50px;
  height: 50px;
  background-color: tomato;
  border-radius: 50px;
`;
export const RankingMain = styled.View`
  border-width: 4px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.point};
  width: 60px;
  height: 60px;
  border-radius: 60px;
  margin-bottom: 10px;
  background-color: #212121;
  justify-content: center;
  align-items: center;
`
export const RankingSub = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 40px;
  margin-bottom: 10px;
  background-color: #212121;
  justify-content: center;
  align-items: center;
`

// 텍스트
export const MainTitle = styled.Text`
  font-family: "SUIT-ExtraBold";
  font-size: ${({ theme }) => theme.fontSizes.title1};
  line-height: ${({ theme }) => theme.fontHeight.title1};
  letter-spacing: -1px;
  text-align: center;
`;
export const Title = styled.Text`
  font-family: "SUIT-Bold";
  font-size: ${({ theme }) => theme.fontSizes.title1};
  line-height: ${({ theme }) => theme.fontHeight.title1};
  margin-bottom: 10px;
  color: #000;
`;

export const SubTitle = styled.Text`
  font-family: "SUIT-Bold";
  font-size: ${({ theme }) => theme.fontSizes.body2};
  line-height: 36px;
  letter-spacing: -0.5px;
  text-align: center;
`;

export const GenreTitle = styled.Text`
  font-family: "SUIT-Bold";
  font-size: ${({ theme }) => theme.fontSizes.body2};
  line-height: 36px;
  letter-spacing: -0.5px;
  text-align: center;
  color: #9b989b;
`;

export const ReviewTitle = styled.Text`
  font-family: "SUIT-Bold";
  font-size: ${({ theme }) => theme.fontSizes.title3};
  letter-spacing: -0.7px;
  text-align: center;
  margin-bottom: 10px;
`;

export const ReviewSubTitle = styled.Text`
  font-family: "SUIT-Bold";
  font-size: ${({ theme }) => theme.fontSizes.body2};
`;

export const ReviewUser = styled.Text`
  font-family: "SUIT-Bold";
  font-size: ${({ theme }) => theme.fontSizes.caption1};
  letter-spacing: -0.3px;
`;
export const ReviewInfo = styled.Text`
  font-family: "SUIT-SemiBold";
  font-size: ${({ theme }) => theme.fontSizes.caption2};
  letter-spacing: -0.3px;
  color: #9b989b;
`;
export const ReviewContent = styled.Text`
  font-family: "SUIT-Medium";
  font-size: ${({ theme }) => theme.fontSizes.body2};
  margin-top: 5px;
  margin-bottom: 10px;
`;

export const Body = styled.Text`
  font-family: "SUIT-SemiBold";
  font-size: ${({ theme }) => theme.fontSizes.caption1};
  line-height: ${({ theme }) => theme.fontHeight.caption1};
  letter-spacing: 0.5px;
  color: #9b989b;
  text-align: center;
`;
export const RankingBody = styled.Text`
  font-family: "SUIT-SemiBold";
  font-size: ${({ theme }) => theme.fontSizes.caption1};
  line-height: ${({ theme }) => theme.fontHeight.caption1};
  letter-spacing: 0.5px;
  color: #fff;
  text-align: center;
`;
export const RankingName = styled.Text`
  font-family: "SUIT-SemiBold";
  font-size: ${({ theme }) => theme.fontSizes.caption1};
  line-height: ${({ theme }) => theme.fontHeight.caption1};
  letter-spacing: 0.5px;
  text-align: center;
  color: #000;
`;
export const RatingText = styled.Text`
  font-family: "SUIT-ExtraBold";
  font-size: ${({ theme }) => theme.fontSizes.title1};
  line-height: ${({ theme }) => theme.fontHeight.title1};
  letter-spacing: -1px;
`;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#212121",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    borderRadius: 15,
  },

  // tabItem: {
  //   flex: 1,
  //   alignItems: "center",
  //   padding: 16,
  // }
});