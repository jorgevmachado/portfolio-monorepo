import * as React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import Link from './Link';
import { OIcon, OIconPosition } from '../../utils/icons';
import { OSimplySize } from '../../utils/sizes';
import { OWeight } from '../../utils/fonts';
import { OColors, OContext } from '../../utils/colors';

const meta = {
  args: {
    icon: undefined,
    size: 'medium',
    weight: 'normal',
    context: 'neutral',
    children: 'Hello, World!',
    iconColor: undefined,
    iconPosition: 'left',
    iconClassName: undefined,
    notificationColor: undefined,
    notificationCounter: undefined,
    notificationClassName: undefined,
    notificationBackgroundColor: undefined,
  },
  title: 'Components/Link',
  argTypes: {
    icon: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'react' },
      },
      options: OIcon,
      control: { type: 'select' },
    },
    size: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'regular' },
      },
      options: OSimplySize,
      control: { type: 'radio' },
    },
    weight: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'regular' },
      },
      options: OWeight,
      control: { type: 'radio' },
    },
    context: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
      options: OContext,
      control: { type: 'select' },
    },
    iconColor: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary-100' },
      },
      options: OColors,
      control: { type: 'select' },
    },
    iconPosition: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'left' },
      },
      options: OIconPosition,
      control: { type: 'radio' },
    },
    iconClassName: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
      control: { type: 'text' },
    },
    notificationColor: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'white' },
      },
      options: OColors,
      control: { type: 'select' },
    },
    notificationCounter: {
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
      control: { type: 'number' },
    },
    notificationBackgroundColor: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary-100' },
      },
      options: OColors,
      control: { type: 'select' },
    },
  },
  component: Link,
} satisfies Meta<typeof Link>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: 'Exemplo' },
};
