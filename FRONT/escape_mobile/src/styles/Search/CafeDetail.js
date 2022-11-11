import styled from "styled-components/native";

export const ThemeListView = styled.View`
  flex: 1;
  background-color: #fff;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`

export const ThemeListTitle = styled.Text`
  font-family: "SUIT-Bold";
  font-size: ${({ theme }) => theme.fontSizes.title3};
  line-height: ${({ theme }) => theme.fontHeight.title3};
  
  letter-spacing: -0.3px;
  padding: 40px 0px 0px 20px;
  color: #fff;
`;

export const SerachResultView = styled.View`
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  height: 100%;
`