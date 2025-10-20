import { memo, SVGProps } from 'react';

const BxPowerOff1Icon = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio='none' viewBox='0 0 18 15' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      d='M9 13.125C12.1245 13.125 14.6667 10.8819 14.6667 8.125C14.6667 6.03125 13.199 4.23688 11.125 3.49312V4.8825C11.7702 5.2112 12.3062 5.68379 12.6792 6.25289C13.0521 6.82199 13.249 7.4676 13.25 8.125C13.25 10.1931 11.3439 11.875 9 11.875C6.65613 11.875 4.75 10.1931 4.75 8.125C4.75094 7.46759 4.94777 6.82195 5.32074 6.25284C5.69371 5.68373 6.22972 5.21115 6.875 4.8825V3.49312C4.801 4.23688 3.33333 6.03125 3.33333 8.125C3.33333 10.8819 5.87554 13.125 9 13.125Z'
      fill='black'
    />
    <path d='M8.29167 1.25H9.70833V7.5H8.29167V1.25Z' fill='black' />
  </svg>
);

const Memo = memo(BxPowerOff1Icon);
export { Memo as BxPowerOff1Icon };
