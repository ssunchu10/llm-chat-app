import { useEffect, useState } from "react";

export function useIsLargeScreen() {
  const [isLarge, setIsLarge] = useState(false);

  useEffect(() => {
    const checkSize = () => {
      setIsLarge(window.innerWidth >= 768); 
    };

    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  return isLarge;
}
