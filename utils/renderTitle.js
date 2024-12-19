import cfonts from "cfonts";

const fontOptions = {
  font: "tiny",
  background: "transparent",
  letterSpacing: 1,
  lineHeight: 1,
  space: false,
  maxLength: "0",
};

export const renderTitle = (title) => {
  cfonts.say(title, fontOptions);
};
