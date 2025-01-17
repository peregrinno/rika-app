import { createTheme, MantineColorsTuple } from '@mantine/core';

const rikaColor: MantineColorsTuple = [
  '#ffe9f2',
  '#ffd1e0',
  '#faa1bd',
  '#f66e99',
  '#f2437a',
  '#f02866',
  '#f0185c',
  '#d6084c',
  '#c00043',
  '#a90039'
];

export const theme = createTheme({
  primaryColor: 'rika',
  colors: {
    rika: rikaColor,
  },
  defaultRadius: 'md',
  components: {
    Button: {
      defaultProps: {
        color: 'rika'
      }
    }
  }
}); 