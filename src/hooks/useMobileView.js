import {  useState, useEffect } from "react";

const useMobileView = (threshold) => {
  const [isMobileView, setIsMobileView] = useState(
    window.innerWidth < threshold
  );

  useEffect(() => {
    const handleResize = () => {
      console.log("hr");
      console.log(window.innerWidth);
      const mobileView = window.innerWidth < threshold;
      if (isMobileView !== mobileView) {
        setIsMobileView(mobileView);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [threshold, isMobileView]);

  return isMobileView;
};

export default useMobileView;
