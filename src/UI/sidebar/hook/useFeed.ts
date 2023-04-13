// hooks/useFeed.ts
import { useQuery } from "react-query";
import { instance } from "api/axios/axiosSetting";

interface Group {
  pk: number;
  name: string;
  members_count: string;
}

export interface Category {
  id: number;
  group: Group;
  name: string;
}

const fetchCategories = async () => {
  const response = await instance.get("/categories/");
  return response.data;
};

// refetch : 카테고리를 추가(특정 이벤트)한 데이터를 다시 요청해서 목록을 불러오기 위해
export const useFeed = () => {
  const { data, refetch } = useQuery<Category[], Error>(
    "categories",
    fetchCategories
  );

  return { categories: data, refetch };
};
