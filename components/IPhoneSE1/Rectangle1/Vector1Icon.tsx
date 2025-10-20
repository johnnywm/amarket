import { memo, SVGProps } from 'react';

const Vector1Icon = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio='none' viewBox='0 0 523 312' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      d='M29.7352 158.971C-39.9497 271.12 170.909 414.567 473.961 11.2449M473.961 11.2449C478.111 5.7217 457.066 21.5556 461.26 15.8221C441.724 41.8389 469.993 16.4572 473.961 11.2449Z'
      stroke='#C179E5'
      strokeOpacity={0.39}
      strokeWidth={2}
    />
  </svg>
);

const Memo = memo(Vector1Icon);
export { Memo as Vector1Icon };
