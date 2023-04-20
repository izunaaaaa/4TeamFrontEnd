// import { useState, useEffect } from "react";
// import { getCategories } from "api/axios/axiosSetting";

// type Group = {
//   pk: number;
//   id: number;
//   name: string;
// };

// export type Category = {
//   id: number;
//   name: string;
//   group: Group;
// };

// export const useFeed = (groupPk: number) => {
//   const [categories, setCategories] = useState<Category[] | null>(null);

//   const refetch = async () => {
//     try {
//       const data = await getCategories(groupPk);
//       setCategories(data);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     }
//   };

//   useEffect(() => {
//     refetch();
//   }, []);

//   return { categories, refetch };
// };

// refetch : 카테고리를 추가(특정 이벤트)한 데이터를 다시 요청해서 목록을 불러오기 위해
import { useQuery } from "react-query";
import { getCategories } from "api/axios/axiosSetting";

type Group = {
  pk: number;
  id: number;
  name: string;
};

export type Category = {
  id: number;
  name: string;
  group: Group;
};

export const useFeed = (groupPk: number) => {
  const { data: categories, refetch } = useQuery<Category[]>(
    ["categories", groupPk],
    () => getCategories(groupPk)
  );

  return { categories, refetch };
};
