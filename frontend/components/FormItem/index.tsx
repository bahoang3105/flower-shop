import React, { memo, FC } from 'react';
import { Field, ErrorMessage, FieldInputProps, FormikProps } from 'formik';
import { Input, DatePicker } from 'antd';
import cx from 'classnames';
import { trim } from 'lodash';
import LENGTH_CONSTANTS from 'constants/length';

export const TYPE_INPUT = {
  TEXT: 'TEXT',
  DATE: 'DATE',
  DATE_PICKER: 'DATE_PICKER',
};

export const TextInput: FC<{
  field: FieldInputProps<any>;
  form: FormikProps<any>;
  props: any;
  onChange?: any;
  onBlur?: any;
  maxLength?: number;
  onKeyDown?: any;
  placeholder?: string;
  prefix?: any;
  className?: string;
}> = ({
  field,
  form,
  prefix,
  maxLength = LENGTH_CONSTANTS.MAX_LENGTH_INPUT,
  onKeyDown,
  onChange,
  onBlur,
  placeholder,
  className,
}) => {
  const handleChange = (e: any) => {
    const { value } = e.target;
    if (!onChange) {
      form.setFieldValue(field.name, value.trimStart());
    } else {
      onChange(e);
    }
  };
  const handleBlur = (e: any) => {
    const { value } = e.target;
    if (!onBlur) {
      form.handleChange(e);
      form.setFieldValue(field.name, trim(value));
    } else {
      onBlur(e);
    }
  };

  return (
    <Input
      maxLength={maxLength}
      className={className}
      {...field}
      prefix={prefix}
      placeholder={placeholder}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={onKeyDown}
      value={form.values[field.name]}
      autoComplete='off'
    />
  );
};

export const DatePickerInput: FC<{
  field: FieldInputProps<any>;
  placeholder?: string;
  suffix?: any;
  onChange: any;
  disabledDate?: any;
  inputReadOnly?: boolean;
  className?: string;
  format?: string;
}> = ({ field, suffix, onChange, placeholder, disabledDate, inputReadOnly, format, className }) => {
  const handleChange = (value: any) => {
    onChange(field, value);
  };
  return (
    <DatePicker
      {...field}
      format={format}
      className={className}
      placeholder={placeholder}
      disabledDate={disabledDate}
      inputReadOnly={inputReadOnly}
      suffixIcon={suffix}
      onChange={handleChange}
    />
  );
};

type FormItemType = {
  component?: any;
  type?: string;
  name: string;
  typeInput?: string | null;
  prefix?: any;
  placeholder?: any;
  subLabel?: any;
  dropdownClassName?: string;
  className?: string;
  content?: any;
  label?: any;
  maxLength?: number;
  labelClassName?: string;
  containerClassName?: string;
  errorClassName?: string;
  autoFocus?: boolean;
  required?: boolean;
  children?: any;
  onSearch?: any;
  onKeyDown?: any;
  errorField?: string;
  description?: any;
  value?: any;
  disabled?: boolean;
  unit?: string;
  onBlur?: any;
  onSelectBox?: any;
  validate?: any;
  defaultValue?: any;
  suffix?: any;
  labelTootip?: any;
  onChange?: any;
  hideError?: boolean;
  inputReadOnly?: boolean;
  disabledDate?: any;
  format?: string;
};

const FormItem = ({
  component,
  placeholder,
  type,
  name,
  typeInput = TYPE_INPUT.TEXT,
  prefix,
  dropdownClassName,
  className,
  content,
  label,
  labelClassName,
  containerClassName,
  errorClassName,
  required,
  children,
  errorField,
  description,
  disabled,
  unit,
  validate,
  labelTootip,
  subLabel,
  hideError,
  ...props
}: FormItemType) => {
  let componentRender: any = component || TextInput;

  switch (typeInput) {
    case TYPE_INPUT.TEXT:
      componentRender = TextInput;
      break;
    case TYPE_INPUT.DATE_PICKER:
      componentRender = DatePickerInput;
      break;
  }
  const propsField: any = {
    prefix,
    placeholder,
    className,
    content,
    disabled,
    ...props,
  };

  return (
    <div className={cx(containerClassName, 'form-item')}>
      {label && (
        <div className={cx(labelClassName, 'form-item__label')}>
          {label}&nbsp;{required ? '*' : ''} {labelTootip ?? ''}
        </div>
      )}
      {subLabel && <p className='text--red'>{subLabel}</p>}
      {description && <div className={cx(labelClassName, 'form-item__description')}>{description}</div>}
      <Field
        type={type}
        name={name}
        placeholder={placeholder}
        label={label}
        component={componentRender}
        unit={unit}
        validate={validate}
        {...propsField}
      />
      {!hideError && (
        <ErrorMessage name={errorField || name} component='div' className={cx('error-text', errorClassName)} />
      )}
      {children}
    </div>
  );
};

export default memo(FormItem);
