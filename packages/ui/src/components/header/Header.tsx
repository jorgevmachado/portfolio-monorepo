import React from 'react';

import { TContext } from '@repo/ds/utils/colors';

import { Logo, Menu } from '../../utils/menu';

import Image from '@repo/ds/elements/image/Image';

import Button from '@repo/ds/components/button/Button';
import Dropdown from '@repo/ds/components/dropdown/Dropdown';
import Link from '@repo/ds/components/link/Link';

import './Header.scss';

interface NavbarProps {
  logo?: Logo;
  navbar?: Menu['items'];
  context?: TContext;
  handleToggleMenu?: () => void;
}

export default function Header({
  logo,
  navbar,
  context = 'neutral',
  handleToggleMenu,
}: NavbarProps) {
  const classNameLink = `header__context--${context}-link`;

  return (
    <header className="header">
      <div className="header__brand">
        <Button
          icon="hamburger"
          onClick={handleToggleMenu}
          context={context}
          className="header__brand--button"
          aria-label="sidebar"
          appearance="icon"
          noIconBorder={true}
        />
        {logo && (
          <div className="header__brand--logo" onClick={logo.onClick}>
            <Image
              src={logo.src}
              alt={logo.alt}
              title={logo.title}
              width={logo.width}
              height={logo.height}
            />
          </div>
        )}
      </div>
      <nav className="header__nav">
        <ul className="header__nav--list">
          {navbar?.map((item) => (
            <li
              key={item.key}
              className={`header__nav--list-item ${item.items?.length ? 'header__nav--list-dropdown' : ''}`}
            >
              {!item.items?.length ? (
                <Link
                  type="link"
                  context={context}
                  onClick={item?.onRedirect}
                  className={classNameLink}
                >
                  {item.label}
                </Link>
              ) : (
                <Dropdown
                  label={item.label}
                  type="link"
                  context={context}
                  className={`header__context--${context}-dropdown`}
                >
                  {item?.items?.map((subItem) => (
                    <Link
                      key={subItem.key}
                      type="link"
                      context={context}
                      iconColor={`${context}-100`}
                      onClick={subItem?.onRedirect}
                      className={classNameLink}
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </Dropdown>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
