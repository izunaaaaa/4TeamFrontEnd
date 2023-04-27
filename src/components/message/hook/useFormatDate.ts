import { useEffect, useState } from "react";

const useFormatDate = (input: string) => {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const formatDate = (input: string): string => {
      const date = new Date(input);

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hour = String(date.getHours()).padStart(2, "0");
      const minute = String(date.getMinutes()).padStart(2, "0");

      return `${year}/${month}/${day} ${hour}:${minute}`;
    };

    setFormattedDate(formatDate(input));
  }, [input]);

  return formattedDate;
};

export default useFormatDate;
