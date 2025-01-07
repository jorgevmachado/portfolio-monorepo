import React from 'react';
import type { TIcon, TIconPosition } from '../../utils/icons';
import type { TSimplySIze } from '../../utils/sizes';
import type { TWeight } from '../../utils/fonts';
import type { TColors, TContext } from '../../utils/colors';

export type TAppearance = 'icon' | 'outline' | 'standard' | 'borderless';

export const OAppearance: Array<TAppearance> = [
  'icon',
  'outline',
  'standard',
  'borderless',
];

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode | TIcon;
  size?: TSimplySIze;
  fluid?: boolean;
  focus?: boolean;
  weight?: TWeight;
  rounded?: boolean;
  context?: TContext;
  children?: React.ReactNode;
  disabled?: boolean;
  iconSize?: string | number;
  appearance?: TAppearance;
  iconPosition?: TIconPosition;
  iconClassName?: string;
  notificationColor?: TColors;
  notificationCounter?: number;
  notificationClassName?: string;
  notificationBackgroundColor?: TColors;
}
