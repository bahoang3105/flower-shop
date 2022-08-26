import { Input, Select } from 'antd';
import { valueType } from 'antd/lib/statistic/utils';
import ImageSvg from 'public/svg';
const { Option } = Select;

interface CommonSelectProps {
    list: any[],
    onChange: (value: any) => void
    defaultValue?: string
}

function CommonSelect({ list, defaultValue, onChange }: CommonSelectProps) {
    return (
        <div className="select-parent" >
            <img src={ImageSvg.sorting} className="select-parent__sortingIcon" width="16" />
            <Select suffixIcon={<img src={ImageSvg.down} width="10" />} defaultValue={defaultValue} style={{ width: "100%" }} onChange={onChange}>
                {list.map((item) => <Option value={item?.value}>{item?.display}</Option>)}

            </Select>
        </div>
    );
}
export default CommonSelect
