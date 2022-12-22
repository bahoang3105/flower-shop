import { FC } from 'react';
import { Spin } from 'antd';
import { NextSeo } from 'next-seo';

import Header from '@components//AppHeader';
import Footer from '@components//AppFooter';
import LoadingIcon from 'elements/LoadingIcon';
import ImageSvg from 'public/svg';

const META_DESCRIPTION = 'Đại lý chuyên bán buôn hoa hồ điệp miền Bắc';

const Layout: FC<{
  children: any;
  title?: string;
  notShowFooter?: boolean;
  notShowHeader?: boolean;
  className?: string;
  metaDescription?: string;
  socialImageUrl?: string;
  name?: string;
  faviconImageUrl?: string;
}> = ({
  children,
  title = 'Tuyết hồ điệp',
  notShowFooter,
  notShowHeader,
  className,
  metaDescription = META_DESCRIPTION,
  socialImageUrl,
  name = '',
  faviconImageUrl = ImageSvg.miniLogo,
}) => {
  const defaultPreviewImage = '';
  // 'https://nftify.s3.ap-southeast-1.amazonaws.com/';

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
                url: socialImageUrl ? socialImageUrl : defaultPreviewImage,
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

        {!notShowHeader && <Header />}
        <div>{children}</div>
        {!notShowFooter && <Footer />}
      </div>
    </Spin>
  );
};

export default Layout;
