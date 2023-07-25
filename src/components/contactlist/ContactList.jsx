import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchContacts, deleteContact } from 'redux/operations';
import { getContactsNames } from 'redux/contactsSlice';
import { getFilteredNames } from 'redux/filterSlice';

import {
  List,
  ListItem,
  Name,
  PhoneNumber,
  DeleteBtn,
} from './ContactList.styled';

export const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContactsNames);
  const queryFilter = useSelector(getFilteredNames);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(queryFilter.toLowerCase())
  );

  const handleDeleteContact = async id => {
    await dispatch(deleteContact(id)).unwrap();
  };

  return (
    <List>
      {filteredContacts.map(({ name, id, phone }) => {
        return (
          <ListItem key={id}>
            <Name>
              {name}: <PhoneNumber>{phone}</PhoneNumber>
            </Name>
            <DeleteBtn id={id} onClick={() => handleDeleteContact(id)}>
              Delete
            </DeleteBtn>
          </ListItem>
        );
      })}
    </List>
  );
};
