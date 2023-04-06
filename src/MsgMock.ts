export type Note = {
  id: number;
  title: string;
  content: string;
  date: Date;
};

export const msgMock: Note[] = [
  {
    id: 1,
    title: "쪽지 1",
    content: "안녕하세요. 오늘 날씨가 좋네요.",
    date: new Date("2023-04-06"),
  },
  {
    id: 2,
    title: "쪽지 2",
    content: "이번 주말에 시간 되시면 저랑 같이 영화 보실래요?",
    date: new Date("2023-04-04"),
  },
  {
    id: 3,
    title: "쪽지 3",
    content: "금요일에는 회식이 있는데 같이 가실래요?",
    date: new Date("2023-04-02"),
  },
  {
    id: 2,
    title: "쪽지 4",
    content: "오늘 회의록 보내드립니다.",
    date: new Date("2023-04-01"),
  },
  {
    id: 2,
    title: "쪽지 5",
    content: "수고하셨습니다.",
    date: new Date("2023-03-31"),
  },
];
