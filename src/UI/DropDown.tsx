import { useRef, useState } from "react";

interface ListItem {
  id: number;
  title: string;
}

const list: ListItem[] = [
  { id: 1, title: "마이페이지" },
  { id: 2, title: "쪽지" },
  { id: 3, title: "글등록" },
  { id: 4, title: "로그인" },
];

function DropDown() {
  const outside = useRef();

  const handleOnClick = () => {};
  return (
    <>
      <ul className="dd-list">
        {list.map((item) => (
          <li className="dd-list-item" key={item.id}>
            <button type="button" onClick={() => handleOnClick()}>
              <span>{item.title}</span>
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default DropDown;
