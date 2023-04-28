import { getFeedCategory } from "api/axios/axiosSetting";
import { Querykey } from "api/react-query/QueryKey";
import { useQuery } from "react-query";

const useFeedCategory = (group: number) => {
  const fallback: [] = [];
  const { data: feedCategory = fallback } = useQuery(
    Querykey.feedCategory,
    () => getFeedCategory(group)
  );

  return { feedCategory };
};

export default useFeedCategory;
