import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

const CSelect = ({
  className,
  placeholder,
  field,
  form,
  options,
  isMulti = false,
}) => {
  const onChange = (option) => {
    form.setFieldValue(
      field.name,
      isMulti
        ? (option).map((item) => item.value)
        : (option).value,
    );
  };

  const getValue = () => {
    if (options) {
      return isMulti
        ? options.filter((option) => field.value.indexOf(option.value) >= 0)
        : options.find((option) => option.value === field.value);
    }
    return isMulti ? [] : '';
  };

  return (
    <Select
      className={className}
      name={field.name}
      value={getValue()}
      onChange={onChange}
      placeholder={placeholder}
      options={options}
      isMulti={isMulti}
    />
  );
};

CSelect.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  options: PropTypes.instanceOf(Array),
  isMulti: PropTypes.bool,
  form: PropTypes.shape({
    setFieldValue: PropTypes.func,
  }),
  field: PropTypes.shape({
    name: PropTypes.string,
    filter: PropTypes.func,
    value: PropTypes.string,
  }),
};

CSelect.defaultProps = {
  className: '',
  placeholder: '',
  options: [],
  isMulti: false,
  form: {
    setFieldValue: () => null,
  },
  field: {
    name: '',
    filter: () => null,
    value: '',
  },
};

export default CSelect;
