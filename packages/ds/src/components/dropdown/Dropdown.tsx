import React, { useEffect, useRef, useState } from 'react';

import joinClass from '../../utils/join-class';
import { useOutsideClick } from '../../utils';

import { DropdownProps } from './interface';

import Activator from './Activator';

import './Dropdown.scss';

export default function Dropdown({
  type = 'button',
  label = 'activator',
  isOpen,
  context = 'neutral',
  disabled,
  children,
  activator,
  onClickOutside,
  onDropDownClick,
  ...props
}: DropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const rootClassName = `dropdown__context--${context}`;
  const classNameList = joinClass([
    'dropdown',
    rootClassName,
    `${props.className ?? ''}`,
  ]);

  const handleClick = () => {
    if (disabled) {
      return;
    }

    if (isOpen === undefined) {
      setIsDropdownOpen(!isDropdownOpen);
    }

    if (onDropDownClick) {
      onDropDownClick(!isDropdownOpen);
    }
  };

  const handleIsOpen = () => {
    if (isOpen !== undefined) {
      return isOpen;
    }
    return isDropdownOpen;
  };

  const handleOpenDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  useEffect(() => {
    if (isOpen !== undefined) {
      setIsDropdownOpen(isOpen);
    }
  }, [isOpen]);

  useOutsideClick(ref, () => {
    onClickOutside && onClickOutside(true);
    setIsDropdownOpen(false);
    onDropDownClick && onDropDownClick(isDropdownOpen);
  }, []);

  return (
    <div {...props} ref={ref} className={classNameList}>
      <div className={`${rootClassName}-trigger`} onClick={handleClick}>
        {!activator ? (
          <Activator
            type={type}
            label={label}
            isOpen={handleIsOpen()}
            onClick={handleOpenDropdown}
            context={context}
            className={`${rootClassName}-trigger__activator--type-${type}`}
          />
        ) : (
          activator
        )}
      </div>
      {handleIsOpen() && (
        <div
          className={`${rootClassName}-content__type--${type}`}
          tabIndex={-1}
        >
          {children}
        </div>
      )}
    </div>
  );
}
