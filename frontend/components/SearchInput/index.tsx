import { Image, Input } from 'antd';
import SearchIcon from 'public/svg/search.svg';

type PropsType = {};

export default function SearchInput({}: PropsType) {
  return <Input.Search autoComplete='off' prefix={<Image src={SearchIcon} height={16} width={16} preview={false} />} />;
}
