import { StyleSheet } from "react-native";
import styled from "styled-components/native";


// 뷰
export const Container = styled.View`
  margin-bottom: ${(props) => props.mb};
  background-color: #fff;
  border-radius: 8px;
`;
export const MainContentWrapper = styled.View`
  height: 60px;
`;
export const SubContentWrapper = styled.View`
  flex-direction: row;
  height: 140px;
  padding: 20px; 
`;

export const StoreImgContainer = styled.View`
  overflow: hidden;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

export const MainTextContainer = styled.View`
  flex: 4;
  justify-content: space-between;
`;
export const IconContainer = styled.View`
  flex-direction: row;  
  margin-top: auto;
`;
export const RepThemeContainer = styled.View`
  flex: 1.5;
  justify-content: center;
  align-items: flex-end;
  /* position: absolute;
  top: 10px;
  right: -20px; */
`;
export const BestBadge = styled.View`
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: ${({ theme }) => theme.colors.point};
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
`;

// 텍스트
export const MainTitle = styled.Text`
  font-family: "SUIT-Bold";
  font-size: ${({ theme }) => theme.fontSizes.title2};
  line-height: ${({ theme }) => theme.fontHeight.title2};
  letter-spacing: -0.5px;
  overflow: hidden;
`;
export const MainSubTitle = styled.Text`
  font-family: "SUIT-Medium";
  font-size: ${({ theme }) => theme.fontSizes.caption0};
  line-height: ${({ theme }) => theme.fontHeight.caption0};
  letter-spacing: 0.3px;
`;
export const Title = styled.Text`
  font-family: "SUIT-Bold";
  font-size: ${({ theme }) => theme.fontSizes.body2};
  line-height: ${({ theme }) => theme.fontHeight.body2};
  color: #fff;
`;
export const SubTitle = styled.Text`
  font-family: "SUIT-Bold";
  font-size: ${({ theme }) => theme.fontSizes.body};
  line-height: ${({ theme }) => theme.fontHeight.body};
  letter-spacing: -0.5px;
  color: #fff;
`;

// 이미지 스타일
// styles
export const styles = StyleSheet.create({
  img: {
    position: 'relative',
    right: 0,
    width: 75,
    height: 120,
    resizeMode: "contain",
    elevation: 5,
  },
  storeImg: {
    position: "absolute",
    width: '100%',
    height: 60,
    resizeMode: "cover",
  },
  storeImgContainer: {
    position: "relative",
    top: 0,
    left: 0,
    height: 60,
    backgroundColor: "#00000080",
    zIndex: 999,
  },
});
