import { useQuery } from "react-query";

const useSearchData = () => {
  const { data } = useQuery("searchData");
};

export default useSearchData;
