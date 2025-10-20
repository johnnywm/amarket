import { memo, SVGProps } from 'react';

const MenuIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio='none' viewBox='0 0 15 12' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path d='M0 6H15' stroke='white' strokeWidth={3} strokeLinecap='round' />
    <path d='M0 12H15' stroke='white' strokeWidth={3} strokeLinecap='round' />
    <path d='M0 0H15' stroke='white' strokeWidth={3} strokeLinecap='round' />
  </svg>
);

const Memo = memo(MenuIcon);
export { Memo as MenuIcon };
