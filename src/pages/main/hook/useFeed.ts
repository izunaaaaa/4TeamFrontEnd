import { Feed } from "../../../interface/Interface";
import axios from "axios";

export function useFeed(): Feed[] {
  const fallBack = [];

  const feedData = [
    {
      id: 1,
      user: "user1",
      group: "oz",
      title: "test1",
      description: "test the data",
      visited: 23,
      medias: [
        "http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg",
      ],
    },
    {
      id: 2,
      user: "user2",
      group: "oz",
      title: "test2",
      description: "test the data",
      visited: 23,
      medias: [
        "http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg",
      ],
    },
    {
      id: 3,
      user: "user3",
      group: "oz",
      title: "test3",
      description: "test the data",
      visited: 23,
      medias: [
        "http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg",
      ],
    },
  ];

  return feedData;
}
