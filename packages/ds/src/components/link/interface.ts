import React from 'react';

import type { TIcon, TIconPosition } from '../../utils/icons';
import type { TSimplySIze } from '../../utils/sizes';
import type { TWeight } from '../../utils/fonts';
import type { TColors, TContext } from '../../utils/colors';

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  icon?: React.ReactNode | TIcon;
  size?: TSimplySIze;
  weight?: TWeight;
  context?: TContext;
  children: React.ReactNode;
  iconColor?: TColors;
  iconPosition?: TIconPosition;
  iconClassName?: string;
  notificationColor?: TColors;
  notificationCounter?: number;
  notificationClassName?: string;
  notificationBackgroundColor?: TColors;
}