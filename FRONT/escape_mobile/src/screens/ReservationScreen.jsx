import React from "react";

import styled from "styled-components/native";
import theme from "../../theme";

import { useQuery } from "@tanstack/react-query";
import { reservationApi } from "../apis/api";

import LoadingScreen from "./LoadingScreen";
import BookComponent from "../components/BookComponent";
import ReservationComponent from "../components/Reservation/ReservationComponent";


export default function ReservationScreen() {

  const { isLoading, data } = useQuery(
    ["searchCafeAndTheme"], //토큰 추가
    reservationApi.getMypageActs
  );
 
  return isLoading ? (
    <LoadingScreen />
  ) : (
    <ReservationListScroll
      data={data?.books}
      ListHeaderComponent={
        <ReserveView>
          <ReservationListScroll
            data={data.reservations}
            ListHeaderComponent={<MainText>받으신 초대장 목록이에요.</MainText>}
            showsVerticalScrollIndicator={false}
            style={{ 
              paddingLeft: 10,
              paddingRight: 10,
              marginBottom: 20
              }}
            renderItem={({ item }) => (
              <ReservationComponent
                reservationId={item.reservationId}
                themeName={item.themeName}
                storeName={item.storeName}
                date={item.date}
                reserveTime={item.reservatedTime}
              />
            )}
          />
          <MainText>최근 초대받아 다녀오신 곳들이에요.</MainText>
        </ReserveView>
      }
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingTop: 30 }}
        renderItem={({ item }) => (
        <BookView>
        <BookComponent
          bookId={item.bookId}
          themeId={item.themeId}
          themeName={item.themeName}
          storeName={item.storeName}
          isClear={item.isClear}
          isReview={item.review}
          doneDate={item.doneDate}
          usedHint={item.usedHint}
          clearTime={item.clearTime}
          themeImg={item.themeImg}
            />
        </BookView>
      )}
    />
  );
}

const MainTextView = styled.View`
  justify-content: center;
  align-items: center;
`;

const MainText = styled.Text`
  font-family: "SUIT-Bold";
  font-size: ${({ theme }) => theme.fontSizes.title2};
  color: #fff;
  padding: 0px 10px;
  margin: 10px 0px;
`;

const ReservationListScroll = styled.FlatList`
  flex: 1;
`;

const BookView = styled.View`
  padding: 0px 10px;
`
const ReserveView = styled(BookView)`
  
`