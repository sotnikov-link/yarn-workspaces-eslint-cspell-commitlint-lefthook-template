import { rem } from '@mantine/core';
import { style } from '@vanilla-extract/css';
import { variables } from './theme';

export const title = style({
  color: variables.colors.black,
  fontSize: rem(100),
  fontWeight: 900,
  letterSpacing: rem(-2),

  selectors: {
    [variables.darkSelector]: {
      color: variables.colors.white,
    },
  },

  '@media': {
    [variables.smallerThan('md')]: {
      fontSize: rem(50),
    },
  },
});
