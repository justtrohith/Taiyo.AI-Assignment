import { createSlice } from '@reduxjs/toolkit';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: [],
  reducers: {
    addContact: (state, action) => {
      state.push({id:state.length,...action.payload});
    },
    editContact: (state, action) => {
      console.log(action.payload);
      const id = action.payload.id;
      const updatedContact = action.payload.contact;
      
      const index = state.findIndex((contact) => contact.id === id);
      if (index !== -1) {
        state[index] = updatedContact;
      }
    },
    deleteContact: (state, action) => {
      const id = action.payload;
      return state.filter((contact) => contact.id !== id);
    },
    
  },
});


export const { addContact, editContact, deleteContact } = contactsSlice.actions;

export default contactsSlice.reducer;
