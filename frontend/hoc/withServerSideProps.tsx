import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Params } from 'next/dist/server/router';
import { wrapper } from 'redux/configStore';
import handleServerSide from 'utils/handleServerSide';

const withServerSideProps = (getServerSidePropsCallback: any, needCtx?: boolean) => {
  return wrapper.getServerSideProps(() => async (ctx: any) => {
    const { locale }: Params = ctx;
    const { redirect } = await handleServerSide.handleRedirectServerSide();
    const props = await handleServerSide.handleGetPropsServerSide();

    return await getServerSidePropsCallback({
      props: {
        ...props,
        ...(await serverSideTranslations(locale, ['common'])),
      },
      ...(redirect ? { redirect } : {}),
      ...(needCtx ? { ctx } : {}),
    });
  });
};

export default withServerSideProps;
