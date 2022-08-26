import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { SizeType } from 'antd/lib/config-provider/SizeContext';

interface SearchProps {
    size?: SizeType
    placeholder: string
    value: string
    onChange: (value: any) => void
    handleSearch: () => void
}

function CommonSearch({ size = "large", placeholder, value, onChange, handleSearch }: SearchProps) {
    const onKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }
    return (
        <Input
            className="searchInput"
            onKeyDown={onKeyDown}
            size={size}
            placeholder={placeholder}
            prefix={<SearchOutlined />}
            value={value}
            onChange={onChange} />
    );
}
export default CommonSearch

