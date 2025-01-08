import * as React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { OContext } from '@repo/ds/utils/colors/options';

import { LOGO, NAVBAR } from '../../utils';

import Header from './Header';

const meta = {
  args: {
    logo: LOGO,
    navbar: NAVBAR.items,
    context: 'primary',
    handleToggleMenu: () => alert('handle toggle menu'),
  },
  title: 'Components/Header',
  argTypes: {
    logo: {
      table: {
        type: { summary: 'object' },
        defaultValue: { summary: JSON.stringify(LOGO) },
      },
      control: { type: 'object' },
    },
    navbar: {
      table: {
        type: { summary: 'array' },
        defaultValue: { summary: JSON.stringify(NAVBAR.items) },
      },
      control: { type: 'object' },
    },
    context: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
      options: OContext,
      control: { type: 'select' },
    },
    handleToggleMenu: {
      option: 'handleToggleMenu',
      description: 'handleToggleMenu click void',
    },
  },
  component: Header,
  decorators: [
    (Story) => (
      <div style={{ height: '50vh', width: '100%' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
