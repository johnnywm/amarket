import { memo } from 'react';
import type { FC } from 'react';

import resets from '../_resets.module.css';
import classes from './IPhoneSE1.module.css';
import { Rectangle1 } from './Rectangle1/Rectangle1';
import { Wave2Icon } from './Wave2Icon';
import { WaveIcon } from './WaveIcon';

interface Props {
  className?: string;
}
/* @figmaId 2:2 */
export const IPhoneSE1: FC<Props> = memo(function IPhoneSE1(props = {}) {
  return (
    <div className={`${resets.clapyResets} ${classes.root}`}>
      <Rectangle1 />
      <div className={classes.wave2}>
        <Wave2Icon className={classes.icon} />
      </div>
      <div className={classes.wave}>
        <WaveIcon className={classes.icon2} />
      </div>
    </div>
  );
});
