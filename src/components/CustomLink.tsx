import Link from 'next/link';
import React from 'react';

interface Props {
  href: string;
  label: string;
}

export const CustomLink = ({ href, label }: Props) => {
  return (
    <Link target='_blank' href={href} className='w-full rounded-[50px] border border-black py-2 text-center'>
      {label}
    </Link>
  );
};
