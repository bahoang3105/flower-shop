export const scrollToElement = ({
  id,
  yOffset,
}: {
  id: string;
  yOffset: number;
}) => {
  const element = document.getElementById(id);
  if (element) {
    const y =
      element.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
};
