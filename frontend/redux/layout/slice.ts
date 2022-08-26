import { createSlice } from '@reduxjs/toolkit';

export interface Layout {
  isShowFilter: boolean;
  language: string;
  loading: boolean;
}

const initialState: Layout = {
  language: '',
  isShowFilter: true,
  loading: false,
};

export const LayoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setLoading: (state: Layout, action: any) => {
      const loading = action.payload;
      return {
        ...state,
        loading,
      };
    },
    setLanguage: (state: Layout, action: any) => {
      const { language } = action.payload;
      return {
        ...state,
        language,
      };
    },
    setShowFilter: (state: Layout, action: any) => {
      return {
        ...state,
        isShowFilter: action.payload,
      };
    },
  },
});

export const { setLanguage, setShowFilter, setLoading } = LayoutSlice.actions;

export const namespace = 'LayoutSlice';

export default LayoutSlice.reducer;
