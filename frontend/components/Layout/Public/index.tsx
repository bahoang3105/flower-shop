import { FC } from 'react';
import { Spin } from 'antd';
import { NextSeo } from 'next-seo';

import Header from '@components//AppHeader';
import Footer from '@components//AppFooter';
import LoadingIcon from 'elements/LoadingIcon';
import { withTranslation } from 'next-i18next';

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
  title = '',
  notShowFooter,
  notShowHeader,
  className,
  metaDescription,
  socialImageUrl,
  name = '',
  faviconImageUrl,
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

export default withTranslation('common')(Layout);
