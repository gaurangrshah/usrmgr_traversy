import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

//destructure our expected input attributes as props:
const TextInputGroup = ({
  label,
  name,
  value,
  placeholder,
  type,
  onChange,
  error
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        //change attribute values to use our destructured values
        type={type}
        name={name}
        className={classNames('form-control form-control-lg', {
          'is-invalid': error
        })}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {/* //error handling output element */}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

TextInputGroup.propTypes = {
  //NOTE PropTypes:
  //defining required propTypes:
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  error: PropTypes.string,

  //NOTE onChange is a function, so it is required as such:
  onChange: PropTypes.func.isRequired
};

TextInputGroup.defaultProps = {
  // not distinguishing between text, email, tel input type attribute.
  type: 'text',
  error: null
};

export default TextInputGroup;
