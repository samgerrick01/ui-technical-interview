import { Select as Combobox } from 'antd';

interface ComboboxProps {
  onChange: (value: string) => void;
  placeholder: string;
  options: { value: string; label: string }[];
  value?: string | null;
}

function Select(props: ComboboxProps) {
  const { onChange, placeholder, options, value } = props;
  return (
    <Combobox value={value} onChange={onChange} placeholder={placeholder}>
      {options.map((option) => (
        <Combobox.Option key={option.value} value={option.value}>
          {option.label}
        </Combobox.Option>
      ))}
    </Combobox>
  );
}

export default Select;
