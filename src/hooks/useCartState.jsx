import { useEffect, useState, useRef, useCallback } from "react";

const useCartState = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const handleOpen = useCallback(
    (e) => {
      e.stopPropagation();
      if (!isOpen) setIsOpen(true);
    },
    [isOpen]
  );

  const handleClose = useCallback(() => {
    if (isOpen) setIsOpen(false);
  }, [isOpen]);

  useEffect(() => {
    const elem = ref.current;
    if (!elem) return undefined;

    elem.addEventListener("mousedown", (e) => handleOpen(e));
    document.addEventListener("mousedown", handleClose);

    return () => {
      elem.removeEventListener("mousedown", (e) => handleOpen(e));
      document.removeEventListener("mousedown", handleClose);
    };
  }, [handleOpen, handleClose]);

  return [ref, isOpen, handleClose];
};

export default useCartState;
