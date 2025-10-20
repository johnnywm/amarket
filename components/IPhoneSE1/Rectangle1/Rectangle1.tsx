import { memo } from 'react';
import type { FC } from 'react';

import resets from '../../_resets.module.css';
import { BxPowerOff1Icon } from './BxPowerOff1Icon';
import { MenuIcon } from './MenuIcon';
import classes from './Rectangle1.module.css';
import { Vector1Icon } from './Vector1Icon';
import { Vector2Icon } from './Vector2Icon';
import { Vector3Icon } from './Vector3Icon';

interface Props {
  className?: string;
}
/* @figmaId 5:20 */
export const Rectangle1: FC<Props> = memo(function Rectangle1(props = {}) {
  return (
    <div className={`${resets.clapyResets} ${classes.root}`}>
      <div className={classes.rectangle1}></div>
      <div className={classes.vector3}>
        <Vector3Icon className={classes.icon} />
      </div>
      <div className={classes.vector1}>
        <Vector1Icon className={classes.icon2} />
      </div>
      <div className={classes.vector2}>
        <Vector2Icon className={classes.icon3} />
      </div>
      <div className={classes.frame5}>
        <div className={classes.frame7}>
          <div className={classes.frame6}>
            <div className={classes.organizaMejorTu}>Organiza mejor tu </div>
            <div className={classes.dinero}>Dinero</div>
          </div>
          <div className={classes.frame4}>
            <div className={classes.activosEsLaMejorAppParaRegistr}>
              Activos es la mejor app para registrar tus gastos y tener un mejor control del dinero
            </div>
            <div className={classes.botonStarYTry}>
              <div className={classes.botonStartNow}>
                <div className={classes.bOTONSTART}>
                  <div className={classes.startNow}>
                    <div className={classes.bxPowerOff1}>
                      <BxPowerOff1Icon className={classes.icon4} />
                    </div>
                    <div className={classes.startNow2}>Start Now</div>
                  </div>
                </div>
              </div>
              <div className={classes.orTRYFREE}>
                <div className={classes.or}>or</div>
                <div className={classes.tryForFree}> try for free</div>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.bm11}></div>
      </div>
      <div className={classes.panelInicial}>
        <div className={classes.frame8}>
          <div className={classes.logo11}></div>
        </div>
        <div className={classes.menu}>
          <MenuIcon className={classes.icon5} />
        </div>
        <div className={classes.signIn}>
          <div className={classes.signIn2}>SignIn</div>
        </div>
      </div>
    </div>
  );
});
