import { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import Img from "../Image";
import Button from "../Button";

function ScrollToTop() {
  const { pathname } = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const scroll = () => window.scrollTo(0, 0);

  const handleScroll = useCallback(() => {
    if (window.scrollY === 0) {
      setIsVisible(false);
    } else if (!isVisible) {
      setIsVisible(true);
    }
  }, [isVisible]);

  useEffect(() => {
    scroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname, handleScroll]);

  return (
    <>
      {isVisible && (
        <Button css="scroll" onClick={scroll}>
          <Img
            image={`icons/up.png`}
            imageStyle="scroll"
            imageAlt="Back to Top"
          />
        </Button>
      )}
    </>
  );
}

export default ScrollToTop;
