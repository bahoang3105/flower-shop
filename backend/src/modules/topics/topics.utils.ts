import { SearchDto } from 'src/common/search.dto';

export class TopicsUtils {
  public static matchSearchTopics = (searchDto: SearchDto) => {
    const { keyword } = searchDto;
    return {
      $or: [
        {
          name: {
            $regex: keyword,
            $options: 'i',
          },
        },
        {
          _id: {
            $regex: keyword,
            $options: 'i',
          },
        },
      ],
    };
  };
}
