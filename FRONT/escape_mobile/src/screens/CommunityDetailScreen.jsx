import React, { useState } from "react";
import styled from "styled-components/native";

import { useQuery } from "@tanstack/react-query";
import { communityApi } from "../apis/api";
import { Text, View } from "react-native";
import { Background } from "@react-navigation/elements";

export default function CommunityDetailScreen({route, navigation}) {
  const { articleId } = route.params
  // const { isLoading, data } = useQuery(
  //   ["CommunityDetail", articleId],
  //   communityApi.getCommunityDetail
  // );
  const data = {
    "articleId": 3,
    "articleTitle": "게시글 제목",
    "articleContent": "게시글 내용",
    "head": 0,
    "articleCreated_at": "2022-08-13 09:13",
    "writerId": 5,
    "writerNickname": "글 작성자",
    "writerProfile": "작성자 프로필 사진",
    "coments": [
      {
        "comentId": 6,
        "comentContent": "댓글 내용",
        "comentWriter": "댓글 작성자",
        "comentWriterProfile": "댓글 작성자 프로필",
        "comentCreated_at": "2022-08-14 09:15",
        "cocoments": [
          {
            "cocomentId": 6,
            "cocomentContent": "댓글 내용",
            "cocomentWriter": "댓글 작성자",
            "cocomentWriterProfile": "대댓글 작성자 프로필",
            "cocomentCreated_at": "2022-08-14 09:15"
          },
          {
            "cocomentId": 7,
            "cocomentContent": "댓글 내용",
            "cocomentWriter": "댓글 작성자",
            "cocomentWriterProfile": "대댓글 작성자 프로필",
            "cocomentCreated_at": "2022-08-14 09:15"
          }
        ]
      },
      {
        "comentId": 7,
        "comentContent": "댓글 내용",
        "comentWriter": "댓글 작성자",
        "comentWriterProfile": "댓글 작성자 프로필",
        "comentCreated_at": "2022-08-14 09:15",
        "cocoments": [
          {
            "cocomentId": 8,
            "cocomentContent": "댓글 내용",
            "cocomentWriter": "댓글 작성자",
            "cocomentWriterProfile": "대댓글 작성자 프로필",
            "cocomentCreated_at": "2022-08-14 09:15"
          },
          {
            "cocomentId": 9,
            "cocomentContent": "댓글 내용",
            "cocomentWriter": "댓글 작성자",
            "cocomentWriterProfile": "대댓글 작성자 프로필",
            "cocomentCreated_at": "2022-08-14 09:15"
          }
        ]
      }
    ]
  }
  return (
    <View>
      <Text>{data.articleId}</Text>
      <Text>{data.articleTitle}</Text>
      <Text>{data.articleContent}</Text>
      <Text>{data.head}</Text>
      <Text>{data.articleCreated_at}</Text>
      <Text>{data.writerId}</Text>
      <Text>{data.writerNickname}</Text>
      <Text>{data.writerProfile}</Text>
      <View>
        {data.coments.map((item) => {
          return (
            <View key={item.comentId}>
              <Text>{item.comentContent}</Text>
              <Text>{item.comentWriter}</Text>
              <Text>{item.comentWriterProfile}</Text>
              <Text>{item.comentCreated_at}</Text>
              <View>
                {item.cocoments.map((item) => {
                  return (
                    <View key={item.cocomentId}>
                      <Text>{item.cocomentContent}</Text>
                      <Text>{item.cocomentWriter}</Text>
                      <Text>{item.cocomentWriterProfile}</Text>
                      <Text>{item.cocomentCreated_at}</Text>
                    </View>
                  )
                })}
              </View>
            </View>
          )
        })}
      </View>
    </View>
  )
}