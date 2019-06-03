// @flow
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import SVGInline from 'react-svg-inline';
import { defineMessages, intlShape, FormattedMessage } from 'react-intl';
import { Input } from 'react-polymorph/lib/components/Input';
import { InputSkin } from 'react-polymorph/lib/skins/simple/InputSkin';
import StakePool from './StakePool';
import type { StakePoolProps } from '../../../api/staking/types';
import DynamicTooltip from '../../widgets/DynamicTooltip';
import StakePoolTooltip from './StakePoolTooltip';

import searchIcon from '../../../assets/images/search.inline.svg';
import styles from './StakingStakePools.scss';

const messages = defineMessages({
  searchInputPlaceholder: {
    id: 'staking.stakePools.searchInputPlaceholder',
    defaultMessage: '!!!Search stake pools',
    description: '"Delegating List Title" for the Stake Pools page.',
  },
  filterAll: {
    id: 'staking.stakePools.filterAll',
    defaultMessage: '!!!All',
    description: '"Filter All" for the Stake Pools page.',
  },
  filterNew: {
    id: 'staking.stakePools.filterNew',
    defaultMessage: '!!!New',
    description: '"Filter New" for the Stake Pools page.',
  },
  filterCharity: {
    id: 'staking.stakePools.filterCharity',
    defaultMessage: '!!!Charity',
    description: '"FilterChar ity" for the Stake Pools page.',
  },
  delegatingListTitle: {
    id: 'staking.stakePools.delegatingListTitle',
    defaultMessage: '!!!Staking pools your are delegating to',
    description: '"delegatingListTitlee" for the Stake Pools page.',
  },
  listTitle: {
    id: 'staking.stakePools.listTitle',
    defaultMessage: '!!!Stake pools ({pools})',
    description: '"listTitle" for the Stake Pools page.',
  },
});

type Props = {
  stakePoolsDelegatingList: Array<StakePoolProps>,
  stakePoolsList: Array<StakePoolProps>,
  onOpenExternalLink: Function,
  currentTheme: string,
};

type State = {
  search: string,
  filter: string,
  selectedList?: ?string,
  selectedIndex?: ?number,
  selectedPool: StakePoolProps | {},
  targetElement?: ?HTMLElement,
};

@observer
export default class StakingStakePools extends Component<Props, State> {
  static contextTypes = {
    intl: intlShape.isRequired,
  };

  state = {
    search: '',
    filter: 'all',
    selectedList: null,
    selectedIndex: null,
    selectedPool: {},
    targetElement: null,
  };

  searchInput: ?HTMLElement = null;

  getFilterItemClassName = (item: string) =>
    item === this.state.filter && styles.searchFilterAtiveItem;

  onFilterChange = (filter: string) => this.setState({ filter });

  onSearch = (search: string) => this.setState({ search });

  getRanking = (index: number) =>
    (index * 100) / this.props.stakePoolsList.length;

  isSelected = (newSelectedList: string, newSelectedIndex: number) =>
    newSelectedList === this.state.selectedList &&
    newSelectedIndex === this.state.selectedIndex;

  handleClick = (
    selectedList: string,
    event: SyntheticMouseEvent<HTMLElement>,
    selectedPool: StakePoolProps
  ) => {
    const { index: selectedIndex } = selectedPool;
    if (
      this.state.selectedList === selectedList &&
      this.state.selectedIndex === selectedIndex
    ) {
      return this.handleClose();
    }
    event.persist();
    const targetElement =
      event.target.className === 'StakePool_content'
        ? event.target
        : event.target.parentNode;
    console.log('targetElement', targetElement);
    console.log('event.target.className', event.target.className);
    console.log('event.target.class', event.target.class);
    return this.setState({
      selectedList,
      selectedIndex,
      selectedPool,
      targetElement,
    });
  };

  handleClose = () =>
    this.setState({
      selectedList: null,
      selectedIndex: null,
      selectedPool: {},
    });

  render() {
    const { intl } = this.context;
    const {
      stakePoolsList,
      stakePoolsDelegatingList,
      onOpenExternalLink,
      currentTheme,
    } = this.props;

    const { search, selectedIndex, selectedPool, targetElement } = this.state;

    return (
      <div className={styles.component}>
        <div className={styles.search}>
          <SVGInline svg={searchIcon} className={styles.searchIcon} />
          <Input
            className={styles.searchInput}
            onChange={this.onSearch}
            ref={input => {
              this.searchInput = input;
            }}
            placeholder={intl.formatMessage(messages.searchInputPlaceholder)}
            skin={InputSkin}
            value={search}
            maxLength={150}
            autoFocus
          />
          <ul className={styles.searchFilter}>
            <li>
              <button
                onClick={() => this.onFilterChange('all')}
                className={this.getFilterItemClassName('all')}
              >
                {intl.formatMessage(messages.filterAll)}
              </button>
            </li>
            <li>
              <button
                onClick={() => this.onFilterChange('new')}
                className={this.getFilterItemClassName('new')}
              >
                {intl.formatMessage(messages.filterNew)}
              </button>
            </li>
            <li>
              <button
                onClick={() => this.onFilterChange('charity')}
                className={this.getFilterItemClassName('charity')}
              >
                {intl.formatMessage(messages.filterCharity)}
              </button>
            </li>
          </ul>
        </div>

        <h2>{intl.formatMessage(messages.delegatingListTitle)}</h2>

        <div className={styles.stakePoolsDelegatingList}>
          {stakePoolsDelegatingList.map(stakePool => (
            <StakePool
              stakePool={stakePool}
              key={stakePool.id}
              ranking={this.getRanking(stakePool.index)}
              isSelected={this.isSelected(
                'selectedIndexDelegatedList',
                stakePool.index
              )}
              onClick={(...args) =>
                this.handleClick('selectedIndexDelegatedList', ...args)
              }
            />
          ))}
        </div>

        <h2>
          <FormattedMessage
            {...messages.listTitle}
            values={{
              pools: stakePoolsList.length,
            }}
          />
        </h2>

        <div className={styles.stakePoolsList}>
          {this.props.stakePoolsList.map(stakePool => (
            <StakePool
              stakePool={stakePool}
              key={stakePool.id}
              ranking={this.getRanking(stakePool.index)}
              isSelected={this.isSelected('selectedIndexList', stakePool.index)}
              onClick={(...args) =>
                this.handleClick('selectedIndexList', ...args)
              }
            />
          ))}
        </div>

        <DynamicTooltip
          isVisible={!!selectedIndex}
          targetElement={targetElement}
        >
          <StakePoolTooltip
            stakePool={selectedPool}
            className={styles.tooltip}
            onClick={this.handleClose}
            currentTheme={currentTheme}
            onOpenExternalLink={onOpenExternalLink}
          />
        </DynamicTooltip>
      </div>
    );
  }
}
