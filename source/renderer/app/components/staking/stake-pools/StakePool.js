// @flow
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import SVGInline from 'react-svg-inline';
import classnames from 'classnames';
import clockIcon from '../../../assets/images/clock.inline.svg';
import styles from './StakePool.scss';
import { getHSLColor } from '../../../utils/colors';
import type { StakePoolProps } from '../../../api/staking/types';

type Props = {
  stakePool: StakePoolProps,
  ranking: number,
  onClick: Function,
  isSelected: boolean,
};

@observer
export default class StakePool extends Component<Props> {
  get color() {
    return getHSLColor(this.props.ranking);
  }

  render() {
    const { stakePool, isSelected, onClick } = this.props;

    const { index, id, retirement } = stakePool;

    const componentClassnames = classnames([
      styles.component,
      isSelected ? styles.isSelected : null,
    ]);

    return (
      <div className={componentClassnames}>
        <div
          className={styles.content}
          onClick={(event: MouseEvent) => onClick(event, stakePool)}
          role="link"
          aria-hidden
        >
          <div className={styles.id}>{id}</div>
          <div
            className={styles.index}
            style={{
              color: this.color,
            }}
          >
            {index}
          </div>
          {retirement && (
            <div className={styles.clock}>
              <SVGInline svg={clockIcon} className={styles.clockIcon} />
            </div>
          )}
          <div
            className={styles.colorBand}
            style={{
              background: this.color,
            }}
          />
        </div>
      </div>
    );
  }
}
