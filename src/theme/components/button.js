const Button = {
  baseStyle: {},
  variants: {
    danger: {
      bg: 'red.600',
      textColor: '#eee',
      shadow: 'md',
    },
    standard: {
      bg: 'dark',
      textColor: '#fff',
      shadow: 'md',
    },
    'standard-light': {
      bg: 'tertiaryButton',
      textColor: 'black',
      shadow: 'md',
    },
    'menu-button': {
      bg: 'primaryButton',
      textColor: '#eee',
    },
    solid: (props) => ({
      bg: props.colorMode === 'dark' ? 'yellow.300' : 'gray.500',
    }),
  },
};

export default Button;
