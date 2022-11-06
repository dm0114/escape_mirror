import React, { useState } from "react";
import styled from "styled-components/native";

import { useQuery } from "@tanstack/react-query";
import { communityApi } from "../apis/api";
import { Text, View } from "react-native";
import { Background } from "@react-navigation/elements";


const ProfileComponent = ({
  writer,
  created_at,
  content
}) => {
  return (
    <>
      <CommentRowView>
        <ProfileImage />
        {/* <Text>{item.comentWriterProfile}</Text> */}
        <View>
          <ArticleWriterInfo>{writer}</ArticleWriterInfo>
          <ArticleWriterInfo>{created_at}</ArticleWriterInfo>
        </View>
      </CommentRowView>
      <CommentBody>
        <ArticleBody>{content}</ArticleBody>
      </CommentBody>
    </>
  );
}
export default function CommunityDetailScreen({ route, navigation }) {
  const { articleId } = route.params;
  // const { isLoading, data } = useQuery(
  //   ["CommunityDetail", articleId],
  //   communityApi.getCommunityDetail
  // );
  const data = {
    articleId: 3,
    articleTitle: "게시글 제목",
    articleContent: "게시글 내용",
    head: 0,
    articleCreated_at: "2022-08-13 09:13",
    writerId: 5,
    writerNickname: "글 작성자",
    writerProfile: "작성자 프로필 사진",
    coments: [
      {
        comentId: 6,
        comentContent: "댓글 내용",
        comentWriter: "댓글 작성자",
        comentWriterProfile: "댓글 작성자 프로필",
        comentCreated_at: "2022-08-14 09:15",
        cocoments: [
          {
            cocomentId: 6,
            cocomentContent: "대댓글 내용1",
            cocomentWriter: "댓글 작성자",
            cocomentWriterProfile: "대댓글 작성자 프로필",
            cocomentCreated_at: "2022-08-14 09:15",
          },
          {
            cocomentId: 7,
            cocomentContent: "대댓글 내용2",
            cocomentWriter: "댓글 작성자",
            cocomentWriterProfile: "대댓글 작성자 프로필",
            cocomentCreated_at: "2022-08-14 09:15",
          },
        ],
      },
      {
        comentId: 7,
        comentContent: "댓글 내용",
        comentWriter: "댓글 작성자",
        comentWriterProfile: "댓글 작성자 프로필",
        comentCreated_at: "2022-08-14 09:15",
        cocoments: [
          {
            cocomentId: 8,
            cocomentContent: "대댓글 내용1",
            cocomentWriter: "댓글 작성자",
            cocomentWriterProfile: "대댓글 작성자 프로필",
            cocomentCreated_at: "2022-08-14 09:15",
          },
          {
            cocomentId: 9,
            cocomentContent: "대댓글 내용2",
            cocomentWriter: "댓글 작성자",
            cocomentWriterProfile: "대댓글 작성자 프로필",
            cocomentCreated_at: "2022-08-14 09:15",
          },
        ],
      },
    ],
  };
  return (
    <View style={{backgroundColor:'#fff'}}>
      <MainView>
        {/* <Text>{data.articleId}</Text> */}
        <ArticleWriter>{data.head}</ArticleWriter>

        <ArticleTitle>{data.articleTitle}</ArticleTitle>

        <RowView>
          <ArticleWriter>{data.writerNickname} | </ArticleWriter>
          <ArticleWriter>{data.articleCreated_at}</ArticleWriter>
          {/* <ArticleWriter>{data.writerId}</ArticleWriter> */}
          {/* <ArticleWriter>{data.writerProfile}</ArticleWriter> */}
        </RowView>

        <ArticleBody>{data.articleContent}</ArticleBody>
      </MainView>
      <View>
        {data.coments.map((item) => {
          return (
            <CommentView key={item.comentId}>
              <ProfileComponent
                writer={item.comentWriter}
                created_at={item.comentCreated_at}
                content={item.comentContent}
              />
              <View>
                {item.cocoments.map((item) => {
                  return (
                    <CocommentView key={item.cocomentId}>
                      <ProfileComponent
                        writer={item.cocomentWriter}
                        created_at={item.cocomentCreated_at}
                        content={item.cocomentContent}
                      />
                      {/* <Text>{item.cocomentWriterProfile}</Text> */}
                    </CocommentView>
                  );
                })}
              </View>
            </CommentView>
          );
        })}
      </View>
    </View>
  );
}

// 뷰
const MainView = styled.View`
  padding: 20px;
  margin: 10px;
  border-radius: 10px;
`;
const CommentView = styled.View`
  padding: 20px;
  margin: 10px;
  border-radius: 10px;
`;
const CommentBody = styled.View`
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 50px;
`


const CocommentView = styled.View`
  padding: 20px;
  margin: 10px;
  border-radius: 10px;
`;
const RowView = styled.View`
  flex-direction: row;
`;
const CommentRowView = styled(RowView)`
  align-items: center;
`;

// 요소
const ProfileImage = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 50px;
  background-color: gray;
  margin-right: 10px;
`;

// 텍스트
const ArticleWriter = styled.Text`
  font-family: "SUIT-Bold";
  font-size: ${({ theme }) => theme.fontSizes.caption1};
  line-height: ${({ theme }) => theme.fontHeight.caption1};
`;
const ArticleWriterInfo = styled.Text`
  font-family: "SUIT-SemiBold";
  font-size: ${({ theme }) => theme.fontSizes.caption1};
  line-height: ${({ theme }) => theme.fontHeight.caption1};
`;
const ArticleTitle = styled.Text`
  font-family: "SUIT-Bold";
  font-size: ${({ theme }) => theme.fontSizes.title3};
  line-height: ${({ theme }) => theme.fontHeight.title3};
`;
const ArticleBody = styled.Text`
  font-family: "SUIT-SemiBold";
  font-size: ${({ theme }) => theme.fontSizes.body};
  line-height: ${({ theme }) => theme.fontHeight.body};
`;

