import { getGroup } from "api/axios/axiosSetting";
import { Querykey } from "api/react-query/QueryKey";
import { useQuery } from "react-query";

const useSignUpGroup = () => {
  const fallback: [] = [];
  const { data: group = fallback } = useQuery(Querykey.group, () => getGroup());

  return { group };
};

export default useSignUpGroup;
