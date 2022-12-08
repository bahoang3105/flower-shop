import { createSlice } from '@reduxjs/toolkit';

export interface Topic {
  topicList: string[];
}

const initialState: Topic = {
  topicList: [],
};

export const TopicSlice = createSlice({
  name: 'topic',
  initialState,
  reducers: {
    getTopicListStart: (state: Topic, action: any) => {
      const {} = action.payload;
      return {
        ...state,
      };
    },
    getTopicListSuccess: (state: Topic, action: any) => {
      const {} = action.payload;
      return {
        ...state,
      };
    },
  },
});

export const namespace = 'TopicSlice';

export const { getTopicListStart, getTopicListSuccess } = TopicSlice.actions;

export default TopicSlice.reducer;
