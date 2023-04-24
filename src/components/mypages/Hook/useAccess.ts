import { getAccess } from "api/axios/axiosSetting";
import { Querykey } from "api/react-query/QueryKey";
import React from "react";
import { useQuery } from "react-query";

const useAccess = (groupPk: number) => {
  const fallback: [] = [];

  const { data: groupAccess = fallback } = useQuery(
    [Querykey.access, groupPk],
    () => getAccess(groupPk)
  );

  return { groupAccess };
};

export default useAccess;
