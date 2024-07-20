import { useState, useEffect } from "react";

function useDebounce(val, delay = 500) {
  const [debouncedVal, setDebouncedVal] = useState(val);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedVal(val);
    }, delay);

    return () => clearTimeout(timeout);
  }, [val, delay]);
  return debouncedVal;
}
export default useDebounce;
