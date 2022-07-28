import { useEffect, useRef } from 'react';
import { useState } from 'react';

import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

const CONTACTS_KEY = 'kontacts-key';
export const App = () => {
  const isFirstRender = useRef(true);
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem(CONTACTS_KEY));
    if (localData) {
      setContacts(localData);
    }
  }, []);

  useEffect(() => {
    if (!isFirstRender.current) {
      localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
    } else {
      isFirstRender.current = false;
    }
  }, [contacts]);

  const handleSubmit = dataForm => {
    contacts.find(
      ({ name }) => name.toLowerCase() === dataForm.name.toLowerCase()
    )
      ? alert(`${dataForm.name} is already in contacts.`)
      : setContacts([...contacts, dataForm]);
  };

  const handleOnInputFilter = evt => {
    const { value } = evt.target;
    setFilter(value);
  };

  const onDelete = id => {
    setContacts(ps => ps.filter(item => item.id !== id));
  };

  const normFilter = filter.toLowerCase();
  const filteredContacts = contacts.filter(item =>
    item.name.toLowerCase().includes(normFilter)
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleSubmit} />

      <h2>Contacts</h2>
      <Filter value={filter} onChange={handleOnInputFilter} />
      <ContactList
        contactsList={filteredContacts || contacts}
        onDelete={onDelete}
      />
    </div>
  );
};

// export class App extends Component {
//   state = {
//     contacts: [],
//     filter: '',
//   };

//   componentDidMount() {
//     const localData = JSON.parse(localStorage.getItem(CONTACTS_KEY));
//     if (localData) {
//       this.setState({ contacts: localData });
//     }
//   }

//   componentDidUpdate(_, prevState) {
//     const { contacts } = this.state;
//     if (contacts.length !== prevState.contacts.length) {
//       localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
//     }
//   }

//   handleSubmit = dataForm => {
//     this.state.contacts.find(
//       ({ name }) => name.toLowerCase() === dataForm.name.toLowerCase()
//     )
//       ? alert(`${dataForm.name} is already in contacts.`)
//       : this.setState(prevState => ({
//           contacts: [...prevState.contacts, dataForm],
//         }));
//   };

//   handleOnInputFilter = evt => {
//     const { value, name } = evt.target;
//     this.setState({ [name]: value });
//   };

//   onDelete = id => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(item => item.id !== id),
//     }));
//   };

//   render() {
//     const { contacts, filter } = this.state;
//     const normFilter = filter.toLowerCase();
//     const filteredContacts = contacts.filter(item =>
//       item.name.toLowerCase().includes(normFilter)
//     );

//     return (
//       <div>
//         <h1>Phonebook</h1>
//         <ContactForm onSubmit={this.handleSubmit} />

//         <h2>Contacts</h2>
//         <Filter value={filter} onChange={this.handleOnInputFilter} />
//         <ContactList
//           contactsList={filteredContacts || contacts}
//           onDelete={this.onDelete}
//         />
//       </div>
//     );
//   }
// }
