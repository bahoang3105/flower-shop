import { FC } from "react";
import { Spin } from "antd";
import { NextSeo } from "next-seo";

import Header from "components//AppHeader";
import Footer from "components//AppFooter";
import LoadingIcon from "elements/LoadingIcon";

const META_DESCRIPTION = "Đại lý chuyên bán buôn hoa hồ điệp miền Bắc";
const SEO_TITLE = 'Hoa hồ điệp'

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
  title = "Tuyết hồ điệp",
  notShowFooter,
  notShowHeader,
  className,
  metaDescription = META_DESCRIPTION,
  socialImageUrl,
}) => {
  const defaultPreviewImage = "";
  // 'https://nftify.s3.ap-southeast-1.amazonaws.com/';

  return (
    <Spin indicator={<LoadingIcon />} spinning={false}>
      <div className={className}>
        <NextSeo
          title={title}
          description={metaDescription}
          twitter={{
            cardType: "summary_large_image",
          }}
          openGraph={{
            title: title,
            description: metaDescription,
            images: [
              {
                url: socialImageUrl ? socialImageUrl : defaultPreviewImage,
                alt: SEO_TITLE,
                type: "image/jpeg",
              },
            ],
          }}
          additionalLinkTags={[
            {
              rel: 'icon',
              href: '/static/favicon.ico'
            }
          ]}
          additionalMetaTags={[
            {
              name: "viewport",
              content: "initial-scale=1.0, width=device-width",
            },
            {
              name: "keywords",
              content: "",
            },
            {
              name: "author",
              content: "",
            },
          ]}
        />

        {!notShowHeader && <Header />}
        <main>{children}</main>
        {!notShowFooter && <Footer />}
      </div>
    </Spin>
  );
};

export default Layout;
