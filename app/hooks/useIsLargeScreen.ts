import { useEffect, useState } from "react";

export function useIsLargeScreen() {
  const [isLarge, setIsLarge] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSize = () => {
      setIsLarge(window.innerWidth >= 1000);
      setIsLoading(false);
    };

    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  return { isLarge, isLoading };
}
