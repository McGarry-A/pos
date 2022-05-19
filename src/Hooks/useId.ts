import { useMemo } from "react";

let idCounter = 0;

const useId = (prefix: string): string => {
  const id = useMemo(() => idCounter++, []);
  return `${prefix}${id}`;
};

export default useId;
