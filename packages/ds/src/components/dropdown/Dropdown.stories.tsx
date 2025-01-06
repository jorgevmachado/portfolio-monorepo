import * as React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { OContext } from '../../utils/colors';

import Dropdown from './Dropdown';

const meta = {
    args: {
        type: 'button',
        label: 'activator',
        context: 'neutral',
        disabled: false,
        children: 'Hello, World!',
    },
    title: 'Components/Dropdown',
    argTypes: {
        type: {
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'button' },
            },
            options: ['link', 'button'],
            control: { type: 'select' },
        },
        label: {
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '' },
            },
            control: { type: 'text' },
        },
        context: {
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'primary' },
            },
            options: OContext,
            control: { type: 'select' },
        },
        disabled: {
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
            },
            control: { type: 'boolean' },
        },
    },
    component: Dropdown,
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: { children: 'Exemplo' }
};