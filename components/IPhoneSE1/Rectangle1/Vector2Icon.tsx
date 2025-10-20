import { memo, SVGProps } from 'react';

const Vector2Icon = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio='none' viewBox='0 0 342 104' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      d='M0 1.00001C81.4899 -1.73587 67.2554 46.5998 192 71.5C280.036 89.0729 293.34 61.4673 341.5 104'
      stroke='url(#paint0_linear_74_3284)'
      strokeOpacity={0.39}
      strokeWidth={2}
    />
    <defs>
      <linearGradient
        id='paint0_linear_74_3284'
        x1={0}
        y1={52.4443}
        x2={341.5}
        y2={52.4443}
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#C179E5' stopOpacity={0.18} />
        <stop offset={1} stopColor='white' />
      </linearGradient>
    </defs>
  </svg>
);

const Memo = memo(Vector2Icon);
export { Memo as Vector2Icon };
