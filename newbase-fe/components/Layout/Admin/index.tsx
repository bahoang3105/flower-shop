import React, { FC, useEffect, useState } from 'react';
import { Spin, Layout, Menu, Dropdown } from 'antd';
import Image from 'next/image';
import { NextSeo } from 'next-seo';
import {
  AppstoreAddOutlined,
  ApartmentOutlined,
  ShopOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/router';
import LoadingIcon from 'elements/LoadingIcon';
import ImageSvg from 'public/svg';
import { WEB_URL } from 'constants/routes';
import { LOCAL_STORAGE } from 'constants/common';

const ITEM_KEY = {
  MANAGE_FLOWERS: '1',
  MANAGE_TOPICS: '2',
  MANEGE_USERS: '3',
  MANAGE_ACCOUNT: '4',
  MANAGE_WEB_INFO: '5',
};

const AdminLayout: FC<{
  children: any;
  title?: string;
  className?: string;
  metaDescription?: string;
  socialImageUrl?: string;
  faviconImageUrl?: string;
}> = ({ children, title = 'Quản lý web', className, metaDescription, socialImageUrl, faviconImageUrl }) => {
  const { Header, Sider, Content } = Layout;
  const { Item } = Menu;
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const router = useRouter();
  const listItem = [
    {
      label: 'Quản lý hoa',
      value: ITEM_KEY.MANAGE_FLOWERS,
      route: WEB_URL.MANAGE_FLOWERS,
      logo: <AppstoreAddOutlined />,
    },
    { label: 'Quản lý loại hoa', value: ITEM_KEY.MANAGE_TOPICS, route: WEB_URL.MANAGE_TOPICS, logo: <ShopOutlined /> },
    // {
    //   label: 'Quản lý người dùng',
    //   value: ITEM_KEY.MANEGE_USERS,
    //   route: WEB_URL.MANEGE_USERS,
    //   logo: <UsergroupAddOutlined />,
    // },
    {
      label: 'Quản lý tài khoản khách',
      value: ITEM_KEY.MANAGE_ACCOUNT,
      route: WEB_URL.MANAGE_ACCOUNT,
      logo: <ApartmentOutlined />,
    },
    {
      label: 'Quản lý thông tin web',
      value: ITEM_KEY.MANAGE_WEB_INFO,
      route: WEB_URL.MANAGE_WEB_INFO,
      logo: <InfoCircleOutlined />,
    },
  ];
  const getCurrentPage = (pathname: string) => {
    if (pathname.includes(WEB_URL.MANAGE_FLOWERS)) {
      return ITEM_KEY.MANAGE_FLOWERS;
    }
    if (pathname.includes(WEB_URL.MANAGE_TOPICS)) {
      return ITEM_KEY.MANAGE_TOPICS;
    }
    if (pathname.includes(WEB_URL.MANEGE_USERS)) {
      return ITEM_KEY.MANEGE_USERS;
    }
    if (pathname.includes(WEB_URL.MANAGE_ACCOUNT)) {
      return ITEM_KEY.MANAGE_ACCOUNT;
    }
    if (pathname.includes(WEB_URL.MANAGE_WEB_INFO)) {
      return ITEM_KEY.MANAGE_WEB_INFO;
    }
  };
  const [currentPage, setCurrentPage] = useState(ITEM_KEY.MANAGE_FLOWERS);

  const handleClickItem = (route: string, keyPage: string) => {
    setCurrentPage(keyPage);
    router.push(route);
  };
  const handleClickExpand = () => {
    setCollapsed(!collapsed);
  };
  const renderListItem = () => {
    return listItem.map((item: any, index: number) => (
      <React.Fragment key={index}>
        <Item key={item.value} onClick={() => handleClickItem(item.route, item.value)}>
          {item.logo}
          <span>{item.label}</span>
        </Item>
      </React.Fragment>
    ));
  };
  const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE.TOKEN);
    router.push(WEB_URL.ADMIN_LOGIN);
  };
  const renderDropdownList = () => {
    return (
      <Menu className='admin-wallet'>
        <Item key={1} className='admin-wallet__disconnect-btn'>
          <div onClick={logout}>
            <Image src={ImageSvg.disconnect} alt='' />
            &nbsp;&nbsp;Đăng xuất
          </div>
        </Item>
      </Menu>
    );
  };

  useEffect(() => {
    setCurrentPage(getCurrentPage(router.pathname) || ITEM_KEY.MANAGE_FLOWERS);
  }, [router.pathname]);

  return (
    <Spin indicator={<LoadingIcon />} spinning={false}>
      <div className={className}>
        <NextSeo
          title={title}
          description={metaDescription}
          twitter={{
            cardType: 'summary_large_image',
          }}
          openGraph={{
            title: title,
            description: metaDescription,
            images: [
              {
                url: socialImageUrl ? socialImageUrl : '',
                alt: title,
                type: 'image/jpeg',
              },
            ],
          }}
          additionalLinkTags={[
            {
              rel: 'icon',
              href: '/static/favicon.ico'
            },
          ]}
          additionalMetaTags={[
            {
              name: 'viewport',
              content: 'initial-scale=1.0, width=device-width',
            },
            {
              name: 'keywords',
              content: '',
            },
            {
              name: 'author',
              content: '',
            },
          ]}
        />
        <Layout className='layout'>
          <Sider trigger={null} collapsible collapsed={collapsed} className='side-wrapper' width={243}>
            <div className='layout__logo'>{collapsed ? <Image  alt='' src={ImageSvg.miniLogo} /> : 'Tuyết hồ điệp'}</div>
            <Menu theme='dark' mode='inline' selectedKeys={[currentPage]} expandIcon={null}>
              {renderListItem()}
            </Menu>
          </Sider>
          <Layout>
            <Header className='layout__header'>
              <Image
                src={ImageSvg.expand}
                className='layout__header__expand'
                alt='expand'
                onClick={handleClickExpand}
              />
              <Dropdown trigger={['click']} overlay={renderDropdownList()}>
                <div className='layout__info'>
                  <Image src={ImageSvg.user} className='icon-header' alt='' />
                </div>
              </Dropdown>
            </Header>
            <Content className='layout__content'>{children}</Content>
          </Layout>
        </Layout>
      </div>
    </Spin>
  );
};

export default AdminLayout;
