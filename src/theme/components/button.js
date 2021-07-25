const Button = {
  baseStyle: {},
  variants: {
    danger: {
      bg: 'red.600',
      boxShadow: '0 0 2px 2px #efdfde',
      textColor: '#eee',
    },
    standard: {
      bg: 'dark',
      textColor: '#fff',
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
