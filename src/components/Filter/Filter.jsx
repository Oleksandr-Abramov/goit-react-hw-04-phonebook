import PropTypes from 'prop-types';
import s from './Filter.module.css';

export const Filter = ({ value, onChange }) => {
  return (
    <div className={s.form}>
      <label>
        <p>Find contacts by name</p>
        <input
          type="text"
          value={value}
          name="filter"
          onChange={onChange}
          className={s.textbox}
        />
      </label>
    </div>
  );
};

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};
