// @flow
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import classnames from 'classnames';
import styles from './DynamicTooltip.scss';

type Props = {
  isVisible: boolean,
  children: any,
  targetElement?: ?HTMLElement,
};

type State = {
  top: number | 'auto',
  right: number | 'auto',
  bottom: number | 'auto',
  left: number | 'auto',
};

const initialState = {
  top: -1000,
  right: 'auto',
  bottom: 'auto',
  left: -1000,
};

@observer
export default class DynamicTooltip extends Component<Props, State> {
  componentDidMount() {
    window.addEventListener('scroll', this.reset, true);
    const tooltip = document.getElementsByClassName(
      'DynamicTooltip_component'
    )[0];
    document.getElementsByTagName('body')[0].appendChild(tooltip);
  }

  reset = () => {
    this.setState({ ...initialState });
  };

  state = initialState;

  componentWillReceiveProps(newProps: Props) {
    this.checkIftargetChanged(newProps);
  }

  checkIftargetChanged = ({ targetElement: newTargetElement }: Props) => {
    const { targetElement: oldTargetElement } = this.props;
    if (newTargetElement && newTargetElement !== oldTargetElement)
      this.getTooltipPosition(newTargetElement);
  };

  getTooltipPosition = (targetElement: HTMLElement) => {
    const { top, left } = targetElement.getBoundingClientRect();
    // const { top, left } = getElementPosition(targetElement);
    this.setState({ top, left });
  };

  render() {
    const { isVisible, children } = this.props;
    const { top, right, bottom, left } = this.state;
    const componentClassnames = classnames([
      styles.component,
      isVisible ? styles.isVisible : null,
    ]);

    return (
      <div
        className={componentClassnames}
        style={{
          top,
          right,
          bottom,
          left,
        }}
      >
        {children}
      </div>
    );
  }
}
