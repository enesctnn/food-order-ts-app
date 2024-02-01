'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import classes from './nav-link.module.css';

function NavLink({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  const path = usePathname();

  return (
    <Link
      href={href}
      className={
        path.includes(href)
          ? `${classes.link} ${classes.active} `
          : classes.link
      }
    >
      {children}
    </Link>
  );
}

export default NavLink;
