import { Col, Drawer, Dropdown, Image, Menu, Row } from 'antd';
import { useTranslation } from 'next-i18next';
import { MenuOutlined, CaretDownOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import AppButton from '../AppButton';
import LogoIcon from 'public/svg/logo.svg';
import MiniLogoIcon from 'public/svg/mini-logo.svg';
import DisconnectIcon from 'public/svg/disconnect.svg';
// import UserIcon from 'public/svg/user.svg';
import FNftPoolIcon from 'public/svg/f-nft-pool.svg';
import StakingIcon from 'public/svg/staking.svg';
import { AccountItemType, HeaderItemType } from 'constants/type';
import { WEB_URL } from 'constants/routes';
import { useWindowSize } from 'hooks/useWindowSize';
import { useWeb3React } from '@web3-react/core';
import { useConnectWallet } from 'hooks/useConnectWallet';
import { formatAddress } from 'utils/common';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { LOCAL_STORAGE } from 'constants/common';

type HeaderProps = Record<string, never>;

const MINI_SCREEN = 1199;

const Header: React.FC<HeaderProps> = () => {
  const { width } = useWindowSize();
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const { connectInjected } = useConnectWallet();
  const { account, deactivate } = useWeb3React();
  const router = useRouter();
  const { Item } = Menu;
  const HEADER_ITEM_LIST = [
    { text: t('common.fNftPools'), link: WEB_URL.TIERING_POOL },
    { text: t('common.tieringPool'), link: WEB_URL.TIERING_POOL },
    { text: t('common.diamondMarketplace'), comingSoon: true },
    { text: t('common.nftArtGallery'), comingSoon: true },
  ];
  const ACCOUNT_LIST_ITEM = [
    // { text: t('myAccount.myAccount'), icon: UserIcon, handleClick: () => router.push(WEB_URL.MY_ACCOUNT) },
    { text: t('fNftPool.myFNftPools'), icon: FNftPoolIcon, handleClick: () => router.push(WEB_URL.MY_F_NFT_POOL) },
    {
      text: t('staking.myStakingHistory'),
      icon: StakingIcon,
      handleClick: () => router.push(WEB_URL.MY_STAKING_HISTORY),
    },
    {
      text: t('common.disconnect'),
      icon: DisconnectIcon,
      handleClick: () => {
        deactivate();
        localStorage.removeItem(LOCAL_STORAGE.TOKEN);
      },
    },
  ];

  useEffect(() => {
    if (width < MINI_SCREEN) {
      setVisible(false);
    }
  }, [width]);

  const copyAddress = () => {
    account && navigator.clipboard.writeText(account);
  };
  const handleConnectWallet = () => {
    connectInjected();
  };
  const renderHeaderButton = (headerItemList: HeaderItemType[]) => (
    <Row className='header-items'>
      {headerItemList.map((item: HeaderItemType, index: number) => (
        <Row className='header-items__item' key={index}>
          {item.link ? (
            <div className='header-items__item__link'>
              <Link href={item.link}>{item.text}</Link>
            </div>
          ) : (
            <div className='header-items__item__coming-soon'>
              <a className='not-allowed'>{item.text}</a>
              <div>{t('common.comingSoon')}</div>
            </div>
          )}
        </Row>
      ))}
    </Row>
  );
  const renderButtonConnectWallet = () => {
    if (account) {
      return (
        <AppButton
          className='header__connect-wallet-button'
          text={formatAddress(account)}
          variant={'secondary'}
          onClick={copyAddress}
        />
      );
    }
    return (
      <AppButton
        className='header__connect-wallet-button'
        text={t('common.connectWallet')}
        variant={'primary'}
        onClick={handleConnectWallet}
      />
    );
  };
  const renderDropdownList = (accountListItem: AccountItemType[]) => {
    return (
      <Menu>
        {accountListItem.map((item: AccountItemType, index: number) => (
          <Item className='header-dropdown-overlay__item' key={index} onClick={item.handleClick}>
            <Image preview={false} src={item.icon} alt='icon' width={20} height={20} />
            <span>{item.text}</span>
          </Item>
        ))}
      </Menu>
    );
  };
  const renderAccountList = (accountListItem: AccountItemType[]) => {
    return (
      <div className='header-account-list'>
        {accountListItem.map((item: AccountItemType, index: number) => (
          <div className='header-account-list__item' key={index} onClick={item.handleClick}>
            <Image preview={false} src={item.icon} alt='icon' width={20} height={20} />
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    );
  };
  const handleClose = () => {
    setVisible(false);
  };
  const openDrawer = () => {
    setVisible(true);
  };

  return (
    <header className='header'>
      <Row>
        <Col md={0} lg={1} xl={1} xxl={2}></Col>
        <Col md={24} lg={22} xl={22} className='header_content' xxl={20}>
          <Row justify='space-between'>
            <Col className='header__logo'>
              <Image src={LogoIcon} preview={false} height={33} width={200} alt='logo' />
            </Col>
            {width > MINI_SCREEN ? (
              <>
                {renderHeaderButton(HEADER_ITEM_LIST)}
                {renderButtonConnectWallet()}
              </>
            ) : (
              <MenuOutlined className='header__menu' onClick={openDrawer} />
            )}
            {account && (
              <Dropdown
                overlay={renderDropdownList(ACCOUNT_LIST_ITEM)}
                overlayClassName={classNames('header-dropdown-overlay', { 'display-none': width <= MINI_SCREEN })}
                trigger={['click']}
                placement='bottomRight'
              >
                <div className='header__dropdown'>
                  <AppButton
                    className={classNames('header__dropdown__button', { 'display-none': width <= MINI_SCREEN })}
                    variant='primary'
                    text={<CaretDownOutlined />}
                  />
                </div>
              </Dropdown>
            )}
          </Row>
        </Col>
        <Col md={0} lg={1} xl={1} xxl={2}></Col>
      </Row>
      <Drawer
        title={<Image src={MiniLogoIcon} alt='' preview={false} />}
        placement='right'
        onClose={handleClose}
        visible={visible}
      >
        {renderHeaderButton(HEADER_ITEM_LIST)}
        <div className='header__button-drawer'>{renderButtonConnectWallet()}</div>
        {account && renderAccountList(ACCOUNT_LIST_ITEM)}
      </Drawer>
    </header>
  );
};

export default Header;
