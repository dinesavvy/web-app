import { useEffect } from "react";

const useScrollToTop = (dependencies = []) => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, dependencies);
};

export default useScrollToTop;
