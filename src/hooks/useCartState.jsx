import { useEffect, useState, useRef, useCallback } from "react";

const useCartState = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  const handleOpen = useCallback(
    (e) => {
      e.stopPropagation();
      !isOpen && setIsOpen(true);
    },
    [isOpen]
  );

  const handleClose = useCallback(() => {
    isOpen && setIsOpen(false);
  }, [isOpen]);

  useEffect(() => {
    const elem = ref.current;
    if (!elem) return;

    elem.addEventListener("mousedown", handleOpen);
    document.addEventListener("mousedown", handleClose);

    return () => {
      elem.removeEventListener("mousedown", handleOpen);
      document.removeEventListener("mousedown", handleClose);
    };
  }, [handleOpen, handleClose]);

  return [ref, isOpen, handleClose];
};

export default useCartState;
