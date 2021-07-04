export function getStyle(style = {}, filter = []) {
  const needUnit = [
    "fontSize",
    "width",
    "height",
    "top",
    "left",
    "borderWidth",
    "letterSpacing",
    "borderRadius",
  ];

  const result = {};
  Object.keys(style).forEach((key) => {
    if (!filter.includes(key)) {
      if (key !== "rotate") {
        result[key] = needUnit.includes(key) ? `${style[key]}px` : style[key];
      } else {
        result.transform = `${key}(${style[key]}deg)`;
      }
    }
  });

  return result;
}
