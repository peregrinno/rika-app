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
    },
    Title: {
      styles: {
        root: {
          color: '#2e2e2e',
          '[data-mantine-color-scheme=dark]': {
            color: '#ffffff'
          }
        }
      }
    },
    Text: {
      styles: {
        root: {
          color: '#2e2e2e',
          '[data-mantine-color-scheme=dark]': {
            color: '#ffffff'
          }
        }
      }
    },
    Body: {
      styles: {
        root: {
          backgroundColor: '#ffffff',
          '[data-mantine-color-scheme=dark]': {
            backgroundColor: '#000000'
          }
        }
      }
    }
  }
}); 