import { memo, SVGProps } from 'react';

const Vector3Icon = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio='none' viewBox='0 0 170 274' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      d='M170 274C170 274 85.5 193 128 97C170.5 0.999962 3.05176e-05 -6.10352e-05 3.05176e-05 -6.10352e-05'
      stroke='url(#paint0_linear_74_3282)'
      strokeOpacity={0.39}
      strokeWidth={1.5}
    />
    <defs>
      <linearGradient
        id='paint0_linear_74_3282'
        x1={0.0000305176}
        y1={137}
        x2={170}
        y2={137}
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#E379E5' stopOpacity={0.91} />
        <stop offset={1} stopColor='white' stopOpacity={0.06} />
      </linearGradient>
    </defs>
  </svg>
);

const Memo = memo(Vector3Icon);
export { Memo as Vector3Icon };
