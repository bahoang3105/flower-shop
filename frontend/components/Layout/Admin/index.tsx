import React, { FC, useState } from 'react';
import { Spin, Layout, Menu, Image, Dropdown } from 'antd';
import { NextSeo } from 'next-seo';
import {
  UsergroupAddOutlined,
  AppstoreAddOutlined,
  ApartmentOutlined,
  ShopOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/router';
import { withTranslation } from 'next-i18next';
import LoadingIcon from 'elements/LoadingIcon';
import ImageSvg from 'public/svg';
import { WEB_URL } from 'constants/routes';
import { LOCAL_STORAGE } from 'constants/common';

const AdminLayout: FC<{
  children: any;
  title?: string;
  className?: string;
  metaDescription?: string;
  socialImageUrl?: string;
  faviconImageUrl?: string;
}> = ({ children, title = '', className, metaDescription, socialImageUrl, faviconImageUrl }) => {
  const { Header, Sider, Content } = Layout;
  const { Item } = Menu;
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const router = useRouter();
  const listItem = [
    {
      label: 'Quản lý hoa',
      value: '1',
      route: WEB_URL.MANAGE_FLOWERS,
      logo: <AppstoreAddOutlined />,
    },
    { label: 'Quản lý loại hoa', value: '2', route: WEB_URL.MANAGE_TOPICS, logo: <ShopOutlined /> },
    { label: 'Quản lý người dùng', value: '3', route: WEB_URL.MANEGE_USERS, logo: <UsergroupAddOutlined /> },
    { label: 'Quản lý tài khoản', value: '4', route: WEB_URL.MANAGE_ACCOUNT, logo: <ApartmentOutlined /> },
    { label: 'Quản lý thông tin web', value: '5', route: WEB_URL.MANAGE_WEB_INFO, logo: <InfoCircleOutlined /> },
  ];
  const [currentPage, setCurrentPage] = useState('1');

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
            <Image preview={false} src={ImageSvg.disconnect} alt='' />
            &nbsp;&nbsp;Đăng xuất
          </div>
        </Item>
      </Menu>
    );
  };

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
              type: 'image/png',
              href: (faviconImageUrl || undefined) as any,
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
          <Sider trigger={null} collapsible collapsed={collapsed} className='side-wrapper' width={213}>
            <div className='layout__logo'>Logo</div>
            <Menu theme='dark' mode='inline' selectedKeys={[currentPage]} expandIcon={null}>
              {renderListItem()}
            </Menu>
          </Sider>
          <Layout>
            <Header className='layout__header'>
              <Image
                src={ImageSvg.expand}
                className='layout__header__expand'
                preview={false}
                alt='expand'
                onClick={handleClickExpand}
              />
              <Dropdown trigger={['click']} overlay={renderDropdownList()}>
                <div className='layout__info'>
                  <Image src={ImageSvg.user} className='icon-header' alt='' preview={false} />
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

export default withTranslation('common')(AdminLayout);
