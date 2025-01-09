import React from 'react';

import Text from '@repo/ds/elements/text/Text';
import Link from '@repo/ds/components/link/Link';

import type { AuthLink } from '../interface';

interface ActionLinkProps extends AuthLink {
  className?: string;
}

export default function ActionLink({
  title,
  label,
  context = 'neutral',
  className = '',
  clickAction,
}: ActionLinkProps) {
  return (
    <div className={className}>
      {title && <Text color={`${context}-100`}>{title}</Text>}
      <Link onClick={clickAction} context={context}>
        {label}
      </Link>
    </div>
  );
}