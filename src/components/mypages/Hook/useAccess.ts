import { getAccess } from "api/axios/axiosSetting";
import { Querykey } from "api/react-query/QueryKey";
import { useQuery } from "react-query";
import { memebers } from "../interface/type";

interface UseAccess {
  groupAccess: memebers[];
  refetch: Function;
}

const useAccess = (groupPk: number): UseAccess => {
  const fallback: [] = [];

  const { data: groupAccess = fallback, refetch } = useQuery(
    [Querykey.access, groupPk],
    () => getAccess(groupPk)
  );

  return { groupAccess, refetch };
};

export default useAccess;
