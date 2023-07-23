import { useDispatch, useSelector } from 'react-redux';
import { getContactsNames } from 'redux/contactsSlice';
import { addContact } from 'redux/operations';
import {
  Form,
  AddContactBtn,
  FormLabel,
  FormInput,
} from './ContactForm.styled';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContactsNames);
  const newContact = { name: '', phone: '' };

  const onChange = e => {
    const { name, value } = e.target;
    if (name === 'name') newContact.name = value;
    if (name === 'number') newContact.phone = value;
  };

  const addContacts = e => {
    e.preventDefault();
    const addedName = contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );
    if (addedName) {
      return alert(`${newContact.name} is already in contacts`);
    }

    dispatch(addContact(newContact));
    newContact.name = '';
    newContact.phone = null;
  };

  return (
    <Form onSubmit={addContacts}>
      <FormLabel>
        Name
        <FormInput
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          placeholder="Serhii"
          onChange={onChange}
          value={newContact.name.value}
          required
        />
      </FormLabel>
      <FormLabel>
        Number
        <FormInput
          type="tel"
          name="number"
          pattern="[0-9]{3}[0-9]{3}[0-9]{2}[0-9]{2}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          placeholder="000 000 00 00"
          onChange={onChange}
          value={newContact.phone.value}
          required
        />
      </FormLabel>
      <AddContactBtn>Add contacts</AddContactBtn>
    </Form>
  );
};
