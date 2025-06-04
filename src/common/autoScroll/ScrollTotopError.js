export const scrollToTop = (newErrors, refs) => {
  setTimeout(() => {
    if (newErrors.promotionTitle && refs.promoTitleRef?.current) {
      refs.promoTitleRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else if (newErrors.fromDate && refs.fromDateRef?.current) {
      refs.fromDateRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else if (newErrors.toDate && refs.toDateRef?.current) {
      refs.toDateRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, 0);
};
