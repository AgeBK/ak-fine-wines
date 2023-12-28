import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Img from "../Image";
import Button from "../Button";

function ScrollToTop() {
  const { pathname } = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const scroll = () => window.scrollTo(0, 0);

  const handleScroll = () =>
    window.scrollY > 0 ? setIsVisible(true) : setIsVisible(false);

  useEffect(() => {
    scroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  return (
    <>
      {isVisible && (
        <Button css="scroll" onClick={scroll}>
          <Img image="arrow.png" imageStyle="scroll" imageAlt="Back to Top" />
        </Button>
      )}
    </>
  );
}

export default ScrollToTop;
