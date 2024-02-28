import { useState, useEffect } from "react";

const usePageWidth = (threshold) => {
  const [isPageWidth, setIsPageWidth] = useState(
    window.innerWidth < threshold
  );

  useEffect(() => {
    const handleResize = () => {
      const pageWidth = window.innerWidth < threshold;
      if (isPageWidth !== pageWidth) {
        setIsPageWidth(pageWidth);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [threshold, isPageWidth]);

  return isPageWidth;
};

export default usePageWidth;
