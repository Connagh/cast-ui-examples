import React from 'react';
import { View } from 'react-native';
import { Button } from '@castui/cast-ui';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'outline', 'text'],
    },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Filled: Story = {
  args: {
    label: 'Filled Button',
    variant: 'filled',
  },
};

export const Outline: Story = {
  args: {
    label: 'Outline Button',
    variant: 'outline',
  },
};

export const Text: Story = {
  args: {
    label: 'Text Button',
    variant: 'text',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Button',
    variant: 'filled',
    disabled: true,
  },
};

export const AllVariants: Story = {
  render: () =>
    React.createElement(
      View,
      { style: { flexDirection: 'row', gap: 16, flexWrap: 'wrap' } },
      React.createElement(Button, { label: 'Filled', variant: 'filled', onPress: () => {} }),
      React.createElement(Button, { label: 'Outline', variant: 'outline', onPress: () => {} }),
      React.createElement(Button, { label: 'Text', variant: 'text', onPress: () => {} }),
      React.createElement(Button, { label: 'Disabled', variant: 'filled', disabled: true, onPress: () => {} }),
    ),
};
