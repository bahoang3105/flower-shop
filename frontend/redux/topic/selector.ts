import { Topic } from './slice';

const selectedLayout = {
  getTopicList: (state: any) => state?.TopicSlice as Topic,
};

export default selectedLayout;
