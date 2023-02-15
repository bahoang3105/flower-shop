export const TOP_ANCHOR = "app-top-anchor";

export const scrollToElement = ({ id }: { id: string }) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

export const scrollToTop = () => {
  const element = document.getElementById(TOP_ANCHOR);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};
