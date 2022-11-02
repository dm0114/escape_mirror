import styled from "styled-components/native";

// font size를 객체로 반환해주자.
const fontSizes = {
  title1: '28px',
  title2: '22px',
  title3: '20px',
  body: '17px',
  caption1: '12px',
  caption2: '11px'
};

const fontHeight = {
  title1 : '42px',
  title2 : '33px',
  title3 : '30px',
  body : '25px',
  caption1 : '18px',
  caption2 : '16px'
}

const screenMargin = {
  marginBottom: '20px',
  titleLeftMargin: '20px'
}

// 자주 사용하는 색을 객체로 만들자.
const colors = {
  // black: "#000000",
  // grey: "#999999",
  // green: "#3cb46e",
  // blue: "#000080",
};

// 자주 사용하는 스타일 속성을 theme으로 만들어보자.
const common = {
  flexCenterRow: `
    flex-direction: row;
    justify-contents: center;
    align-items: center;
  `,
  flexCenterColumn: `
    justify-contents: center;
    align-items: center;
  `,
};

// theme 객체에 감싸서 반환한다.
const theme = {
  fontSizes,
  fontHeight,
  colors,
  common,
  screenMargin
};

export default theme;