import { Checkbox } from 'antd';

interface CheckboxProps {
    text: string,
    checked: boolean
    onChange: () => void
}

function CommonCheckbox({ checked, text, onChange }: CheckboxProps) {
    return (
        <Checkbox className="checkbox" checked={checked} onChange={onChange}>
            {text}
        </Checkbox>
    );
}
export default CommonCheckbox

