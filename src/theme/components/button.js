const Button = {
  baseStyle: {},
  variants: {
    danger: {
      bg: 'red.600',
      boxShadow: '0 0 2px 2px #efdfde',
    },
    standard: {
      bg: '#98A7B2',
      color: '#090A24',
      shadow: 'md',
    },
    'menu-button': {
      bg: 'primaryButton',
      color: 'dark',
    },
    solid: (props) => ({
      bg: props.colorMode === 'dark' ? 'yellow.300' : 'gray.500',
    }),
  },
};

export default Button;
