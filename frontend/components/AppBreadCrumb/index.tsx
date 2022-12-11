import { Breadcrumb } from 'antd';
import { appBreadcrumbType, BREADCRUMB_LINK, BREADCRUMB_TEXT } from 'constants/common';
import { useRouter } from 'next/router';

const { Item: BreadcrumbItem } = Breadcrumb;

const breadcrumbStyle = {
  common: {
    color: '#25424C',
  },
  selectingItem: {
    color: '#4D2C4B',
    fontWeight: '600',
  },
};

function AppBreadcrumb() {
  const router = useRouter();

  const getBreadcrumbPath = () => {
    return router?.pathname
      ?.split('/')
      ?.filter((item: string) => item)
      ?.map((item: string) => {
        return {
          url: BREADCRUMB_LINK[item as appBreadcrumbType],
          title: BREADCRUMB_TEXT[item as appBreadcrumbType],
        };
      });
  };

  return (
    <Breadcrumb>
      {getBreadcrumbPath()?.map(({ title, url }: { title: string; url: string }, index: number) => {
        const isCurrentPage = index === getBreadcrumbPath()?.length - 1;
        return (
          <BreadcrumbItem className='app_link' key={title}>
            {isCurrentPage ? (
              <div style={breadcrumbStyle?.selectingItem}>{title}</div>
            ) : (
              <a style={breadcrumbStyle?.common} href={url}>
                {title}
              </a>
            )}
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
}

export default AppBreadcrumb;
