import PropTypes from 'prop-types';
import s from './ContactList.module.css';

export const ContactList = ({ contactsList, onDelete }) => {
  return (
    contactsList.length !== 0 && (
      <ul className={s.list}>
        {contactsList.map(({ name, number, id }) => (
          <li key={id} className={s.item}>
            {name}: {number}
            <button
              type="button"
              onClick={() => {
                onDelete(id);
              }}
              className={s.button}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    )
  );
};

ContactList.propTypes = {
  onDelete: PropTypes.func,
  contactsList: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      number: PropTypes.string,
      id: PropTypes.string,
    })
  ),
};
