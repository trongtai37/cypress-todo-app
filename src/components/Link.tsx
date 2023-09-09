import React from 'react';
import classnames from 'classnames';

interface LinkProps {
  active: boolean;
  children: React.ReactNode;
  setFilter: () => void;
}

const Link: React.FC<LinkProps> = ({ active, children, setFilter }) => (
  // eslint-disable-next-line jsx-a11y/anchor-is-valid
  <a
    className={classnames({ selected: active })}
    style={{ cursor: 'pointer' }}
    onClick={() => setFilter()}
  >
    {children}
  </a>
);

export default Link;
