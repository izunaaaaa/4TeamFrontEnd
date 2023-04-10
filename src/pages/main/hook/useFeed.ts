import { Feed } from "../../../interface/Interface";
import axios from "axios";
import { useQuery } from "react-query";
import { Querykey } from "api/react-query/QueryKey";
import { getFeeds } from "api/axios/axiosSetting";

export function useFeed(): Feed[] {
  // const feedData = [
  //   {
  //     id: 1,
  //     user: "user1",
  //     group: "oz",
  //     title: "test1",
  //     description: "test the data",
  //     visited: 23,
  //     medias: [
  //       "http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg",
  //     ],
  //     comment: [
  //       { id: 1, user: "익명1", description: "대박....!" },
  //       {
  //         id: 2,
  //         user: "익명2",
  //         description:
  //           "데뷔 6주년 축하해. 당신을 만나서 매일 매우 즐겁습니다. 앞으로의 미래가 행복하도록 🎈 하루 지나서 미안해 😅",
  //       },
  //       { id: 3, user: "익명1", description: "대박....!" },
  //       { id: 4, user: "익명2", description: "반갑습니다." },
  //       { id: 5, user: "익명1", description: "대박....!" },
  //       { id: 6, user: "익명2", description: "반갑습니다." },
  //       { id: 7, user: "익명1", description: "대박....!" },
  //       { id: 8, user: "익명2", description: "반갑습니다." },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     user: "user2",
  //     group: "oz",
  //     title: "test2",
  //     description: "test the data",
  //     visited: 23,
  //     medias: [
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_AlAGSa0GmeQ1NjsjPsKFb6szez5ocX5iFw&usqp=CAU",
  //     ],
  //     comment: [
  //       { id: 1, user: "익명1", description: "행복하세요!!" },
  //       { id: 2, user: "익명2", description: "오이시쿠" },
  //     ],
  //   },
  //   {
  //     id: 3,
  //     user: "user3",
  //     group: "oz",
  //     title: "test3",
  //     description: "test the data",
  //     visited: 23,
  //     medias: [
  //       "http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg",
  //     ],
  //     comment: [{ id: 1, user: "user1", description: "fsd" }],
  //   },
  // ];

  const fallBack: [] = [];

  const { data: feedData = fallBack } = useQuery(Querykey.feedData, getFeeds);

  return feedData;
}
