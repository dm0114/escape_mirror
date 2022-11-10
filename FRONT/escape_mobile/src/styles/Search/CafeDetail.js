import styled from "styled-components/native";

export const ThemeListView = styled.View`
  background-color: #fff;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`

export const ThemeListTitle = styled.Text`
  font-family: "SUIT-Bold";
  font-size: ${({ theme }) => theme.fontSizes.title3};
  line-height: ${({ theme }) => theme.fontHeight.title3};
  letter-spacing: -0.3px;
  padding: 20px 0px 10px 20px;
`;