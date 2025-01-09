import * as React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import Sidebar from './Sidebar';

const meta = {
    args: {
        children: 'Hello, World!',
    },
    title: 'Components/Sidebar',
    component: Sidebar,
} satisfies Meta<typeof Sidebar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: { children: 'Exemplo' }
};