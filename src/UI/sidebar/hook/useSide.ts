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
    ["categories"],
    () => getCategories(groupPk),
    {
      retry: false,
    }
  );

  return { categories, refetch };
};
