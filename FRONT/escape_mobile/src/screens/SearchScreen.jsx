import React, { useEffect, useState } from "react";

import styled from "styled-components/native";
import theme from "../../theme";

import SearchBar from "../components/SearchBar";
import SearchCafeList from "../components/SearchCafeList";
import SearchThemeList from "../components/SearchThemeList";
import LoadingScreen from "./LoadingScreen";

import { useQuery } from "@tanstack/react-query";
import { searchApi } from "../apis/api";

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const { isLoading, isFetching, data, refetch } = useQuery(
    ["searchCafeAndTheme", query],
    searchApi.getSearch,
    { enabled: false, });

  const onChangeText = (text) => setQuery(text);
  const onSubmit = () => {
    if (query === "") {
      return;
    }
    refetch();
  };

  const SearchResult = () => {
    if (!isLoading && !isFetching) {
      return toggle ? (
        <CafeListScroll
          data={data.storeList}
          ListHeaderComponent={<SubText>카페 검색 결과</SubText>}
          renderItem={({ item }) => (
            <SearchCafeList
              storeId={item.storeId}
              storeName={item.storeName}
              storeImg={item.storeImg}
              storeAddress={item.storeAddress}
              likeCount={item.likeCount}
            />
          )}
        />
      ) : (
        <ThemeListScroll
          data={data.themeList}
          ListHeaderComponent={<SubText>테마 검색 결과</SubText>}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 30 }}
          renderItem={({ item }) => (
            <SearchThemeList
              themeId={item.themeId}
              themeName={item.themeName}
              storeName={item.storeName}
              themeImg={item.themeImg}
              likeCount={item.likeCount}
              star={item.star}
            />
          )}
        />
      );
    } else if (isLoading && isFetching) return <LoadingScreen />;
    else {
      return null;
    }
  }

  const [toggle, setToggle] = useState(false);

  return (
    <>
      <TextContainer>
        <MainText>
          초대 받지 않은 곳을 {"\n"}
          가는 것도 큰 재미이죠.{"\n"}
          새로운 곳에 가보시겠어요?
        </MainText>
      </TextContainer>
      <SearchTextInput
        placeholder="카페 또는 테마를 입력하세요."
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
      />
      <SearchView flex={1}>
        <SubText>지금 주변에서 인기 있는 곳</SubText>
        {/* 이미지 및 슬라이더 추가 */}
      </SearchView>
      {<SearchResult />}
    </>
  );
}

const Container = styled.View`
  flex: 1;
`;

const TextContainer = styled.View`
  justify-content: center;
`;

const ThemeListScroll = styled.FlatList``;

const CafeListScroll = styled.FlatList``;

const SearchView = styled.View`
  flex: ${(props) => props.flex};
  background-color: ${(props) => props.backgroundColor};
  justify-content: center;
`;

const MainText = styled.Text`
  font-family: "SUIT-Bold";
  font-size: ${({ theme }) => theme.fontSizes.title2};
  color: #fff;
`;

const SubText = styled.Text`
  font-family: "SUIT-SemiBold";
  font-size: ${({ theme }) => theme.fontSizes.title3};
  color: #fff;
`;

const SearchTextInput = styled.TextInput`
  background-color: #fff;
  padding: 8px 16px;
  margin: 16px;
  border-color: #fff;
  border-radius: 20px;

  text-align: center;
`;
