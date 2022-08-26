import { Layout } from './slice';

const selectedLayout = {
  getLayout: (state: any) => state?.LayoutSlice as Layout,
  getLanguage: (state: any) => state?.LayoutSlice?.language,
  getLoading: (state: any) => state?.LayoutSlice?.loading,
  getShowFilter: (state: any) => state?.LayoutSlice?.isShowFilter,
};

export default selectedLayout;
