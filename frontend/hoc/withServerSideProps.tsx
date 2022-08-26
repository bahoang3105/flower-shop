import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Params } from 'next/dist/server/router';
import { END } from 'redux-saga';
import { wrapper } from 'redux/configStore';
import handleServerSide from 'utils/handleServerSide';

const withServerSideProps = (getServerSidePropsCallback: any, needCtx?: boolean) => {
  return wrapper.getServerSideProps((store) => async (ctx: any) => {
    const { locale }: Params = ctx;

    // end the saga
    store.dispatch(END);
    await store.sagaTask.toPromise();

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
