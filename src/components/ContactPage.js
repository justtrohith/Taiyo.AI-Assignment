import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { addContact, editContact, deleteContact } from '../contactsSlice';
//todo: add for edit and delete functionality
const CreateContactModal = ({setShowModal}) => {
    const dispatch = useDispatch();

    const [contactState, setContactState] = useState({
        firstName: "",
        lastName: "",
        status: "active"
    });
    return (
        <div className="fixed top-3 bg-white w-full h-full border-solid border-black-100">
        <div className="flex">
            <h1>Create Contact Screen</h1>
            <button onClick={() => { setShowModal(false)}}> close</button>
        </div>
        <div>
            <div>
                <span>First Name : </span>
                <input type="text" value={contactState.firstName} onChange={(e) => { setContactState({...contactState, firstName: e.target.value})}} />
            </div>
            <div>
                <span>Last Name : </span>
                <input type="text" value={contactState.lastName} onChange={(e) => { setContactState({...contactState, lastName: e.target.value})}} />
            </div>
            <div>
                <span>Status : </span>
                <div>
                    <div>
                        <input type="radio" checked={contactState.status === "active"} onChange={(e) => { setContactState({...contactState, status: "active"})}} />
                        <span>Active</span>
                    </div>
                    <div>
                        <input type="radio" checked={contactState.status === "inactive"} onChange={(e) => { setContactState({...contactState, status: "inactive"})}} />
                        <span>Inactive</span>
                    </div>
                </div>
            
            </div>
        </div>
        <button onClick={() => { dispatch(addContact(contactState)); setShowModal(false)}}
        >Save</button>
        </div>
    );
    }

const ContactPage = () => {
    const [showModal, setShowModal] = useState(false);
    const contacts = useSelector((state) => state.contacts);
    return (
        <div>
        {showModal && <CreateContactModal setShowModal={setShowModal}/>}
        <h1>Contact Page</h1>
        <div className="flex w-full">
           <div className="flex flex-col">
            {!showModal && <button onClick={() => { setShowModal(true)}}>Create Contact</button>}
            <div>
            {contacts.length > 0 ? (
        <ul className="space-y-4">
          {contacts.map((contact) => (
            <li key={contact.id} key={contact.id} className="border border-gray-300 p-4 rounded-md">
              <h3 className="text-xl font-semibold">{contact.firstName}</h3>
              <p className="text-gray-500">{contact.lastName}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No contacts found.</p>
      )}
            </div>
           </div>
        </div>
        </div>
    );
    }
    
export default ContactPage;