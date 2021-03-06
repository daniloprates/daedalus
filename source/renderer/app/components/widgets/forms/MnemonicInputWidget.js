// @flow
import React, { Component } from 'react';
import { IObservableArray } from 'mobx';
import { observer } from 'mobx-react';
import { Input } from 'react-polymorph/lib/components/Input';
import { InputSkin } from 'react-polymorph/lib/skins/simple/InputSkin';
import styles from './MnemonicInputWidget.scss';

type Props = {
  label: string,
  tokens: IObservableArray<string>,
  onTokenChanged: Function,
  error?: string,
};

@observer
export default class MnemonicInputWidget extends Component<Props> {
  render() {
    const { label, tokens, onTokenChanged, error } = this.props;
    return (
      <div className={styles.component}>
        <div className={styles.label}>{label}</div>
        {error && <div className={styles.error}>{error}</div>}
        <div className={styles.tokens}>
          {tokens.map((token, index) => (
            <Input
              type="text"
              placeholder="Token"
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              className={styles.input}
              value={token}
              onChange={value => onTokenChanged(index, value)}
              skin={InputSkin}
            />
          ))}
        </div>
      </div>
    );
  }
}
