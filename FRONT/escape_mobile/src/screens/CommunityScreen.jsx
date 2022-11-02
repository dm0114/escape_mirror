import React, { useState } from "react";
import styled from "styled-components/native";

import { useQuery } from "@tanstack/react-query";
import { communityApi } from "../apis/api";
import { Text, TouchableOpacity, View } from "react-native";
import LoadingScreen from '../screens/LoadingScreen'

export default function CommunityScreen({navigation}) {
  const [query, setQuery] = useState("");
  const { isLoading, data } = useQuery(
    ["CommunityList", query],
    communityApi.getCommunityList
  );

  return (
    isLoading ? <LoadingScreen /> :
    <View>
      <Text>동료들과 이야기를 나눠보세요</Text>
      <Text>토글1</Text>
      <Text>토글2</Text>
      <Text>토글3</Text>
      {data.articles.map((item) => {
        return (
          <TouchableOpacity 
            key={item.articleId}
            onPress={() =>{ navigation.navigate('CommunityDetailScreen', 
            {articleId: item.articleId })}}
          >
            <Text>{item.Title}</Text>
            <Text>{item.writerName}</Text>
          </TouchableOpacity>
        )
      })}
    </View>
  );
}
