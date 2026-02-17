import React from 'react';
import { Card, Button } from '@castui/cast-ui';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    body: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Basic: Story = {
  args: {
    title: 'Card Title',
    subtitle: 'Subtitle text',
    body: 'This is the card body text. It demonstrates how card content is styled by the current theme.',
  },
};

export const WithActions: Story = {
  args: {
    title: 'Interactive Card',
    body: 'This card includes action buttons in its footer area.',
  },
  render: (args) =>
    React.createElement(Card, {
      ...args,
      actions: React.createElement(
        React.Fragment,
        null,
        React.createElement(Button, { label: 'Primary', variant: 'filled', onPress: () => {} }),
        React.createElement(Button, { label: 'Secondary', variant: 'outline', onPress: () => {} }),
      ),
    }),
};

export const TitleOnly: Story = {
  args: {
    title: 'Minimal Card',
  },
};

export const FullContent: Story = {
  args: {
    title: 'Complete Card',
    subtitle: 'With all content slots filled',
    body: 'This card demonstrates every available content slot: title, subtitle, body text, and an actions row with multiple buttons.',
  },
  render: (args) =>
    React.createElement(Card, {
      ...args,
      actions: React.createElement(
        React.Fragment,
        null,
        React.createElement(Button, { label: 'Action 1', variant: 'filled', onPress: () => {} }),
        React.createElement(Button, { label: 'Action 2', variant: 'outline', onPress: () => {} }),
        React.createElement(Button, { label: 'Action 3', variant: 'text', onPress: () => {} }),
      ),
    }),
};
