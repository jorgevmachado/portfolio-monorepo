import * as React from 'react';
import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import Button from '@repo/ds/components/button/Button';

import '../../styles/main.scss';

import Slide, { SlideProps } from './Slide';

const meta = {
  args: {
    enter: true,
    delay: 50,
    timeout: 0.2,
    children: (
      <>
        <h1>SLIDE TEST</h1>
      </>
    ),
    direction: 'right',
  },
  title: 'Animations/Slide',
  argTypes: {
    enter: {
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
      control: { type: 'boolean' },
    },
    delay: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '0' },
      },
      control: { type: 'number' },
    },
    timeout: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '.2' },
      },
      control: { type: 'number' },
    },
    direction: {
      name: 'direction',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'right' },
      },
      options: ['top', 'right', 'bottom', 'left'],
      control: { type: 'radio' },
      description: 'Direction of the animation.',
    },
  },
  component: Slide,
} satisfies Meta<typeof Slide>;

export default meta;

type Story = StoryObj<typeof meta>;

interface RenderProps {
  args: SlideProps;
  buttonLabel: string;
}

const render = ({ args, buttonLabel }: RenderProps) => {
  const [show, setShow] = useState(false);

  const handleToggle = () => {
    setShow(!show);
  };
  return (
    <>
      <Slide {...args} enter={show} children={args.children} />
      <Button onClick={handleToggle}>{buttonLabel}</Button>
    </>
  );
};

export const Default: Story = {
  args: { children: 'Exemplo' },
  render: (args) => render({ args, buttonLabel: 'TOGGLE' }),
};