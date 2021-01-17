const button = {
  baseStyle: {
    fontWeight: "bold",
  },
  variants: {
    danger: {
      bg: "red.600",
      boxShadow: "0 0 2px 2px #efdfde",
    },
    standard: {
      bg: "gray.300",
      color: "gray.900",
      boxShadow: "0 0 2px 2px #efdfde",
    },
    "menu-button": {
      bg: "blue.700",
      color: "gray.300",
    },
    solid: (props) => ({
      bg: props.colorMode === "dark" ? "yellow.300" : "gray.500",
    }),
  },
};

export default button;
