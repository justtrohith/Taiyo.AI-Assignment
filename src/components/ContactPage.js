import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { addContact, deleteContact, editContact } from '../contactsSlice';

const CreateContactModal = ({ setShowModal}) => {
  const dispatch = useDispatch();

  const [contactState, setContactState] = useState({
    firstName: "",
    lastName: "",
    status: "active",
  });
  
  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-75">
      <div className="bg-white w-96 p-8 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Create Contact</h1>
          
          <button
            className="flex items-center justify-center text-gray-600 hover:text-gray-800 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full py-2 px-4"
            onClick={() => {
              setShowModal(false);
            }}
          >
            <span className="text-white">Close</span>
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center">
            <span className="text-gray-800 mr-2">First Name :</span>
            <input
              type="text"
              value={contactState.firstName}
              onChange={(e) =>
                setContactState({ ...contactState, firstName: e.target.value })
              }
              className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-orange-600"
            />
          </div>
          <div className="flex items-center">
            <span className="text-gray-800 mr-2">Last Name :</span>
            <input
              type="text"
              value={contactState.lastName}
              onChange={(e) =>
                setContactState({ ...contactState, lastName: e.target.value })
              }
              className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-orange-600"
            />
          </div>
          <div className="flex items-center">
            <span className="text-gray-800 mr-2">Status :</span>
            <div className="flex items-center">
              <div className="flex items-center mr-4">
                <input
                  type="radio"
                  checked={contactState.status === "active"}
                  onChange={(e) =>
                    setContactState({ ...contactState, status: "active" })
                  }
                  className="mr-1"
                />
                <span className="text-gray-800">Active</span>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  checked={contactState.status === "inactive"}
                  onChange={(e) =>
                    setContactState({ ...contactState, status: "inactive" })
                  }
                  className="mr-1"
                />
                <span className="text-gray-800">Inactive</span>
              </div>
            </div>
          </div>
        </div>
        
        <button
          onClick={() => {
            dispatch(addContact(contactState));
            setShowModal(false);
          }}
          className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-lg mt-6"
        >
            Save
        </button>
      </div>
    </div>
  );
};




const EditContactModal = ({ contact, setShowModal }) => {
  const dispatch = useDispatch();

  const [contactState, setContactState] = useState({
    firstName: contact.firstName,
    lastName: contact.lastName,
    status: contact.status,
  });


  const handleSave = () => {
    dispatch(editContact({
        id: contact.id,
        contact: contactState,
    }));
    setShowModal(false);
  };

  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-75">
      <div className="bg-white w-96 p-8 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Edit Contact</h1>

          <button
            className="flex items-center justify-center text-gray-600 hover:text-gray-800 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full py-2 px-4"
            onClick={() => {
              setShowModal(false);
            }}
          >
            <span className="text-white">Close</span>
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center">
            <span className="text-gray-800 mr-2">First Name :</span>
            <input
              type="text"
              name="firstName"
              value={contactState.firstName}
              onChange={(e) =>
                setContactState({ ...contactState, firstName: e.target.value })
              }
              className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-orange-600"
            />
          </div>
          <div className="flex items-center">
            <span className="text-gray-800 mr-2">Last Name :</span>
            <input
              type="text"
              name="lastName"
              value={contactState.lastName}
              onChange={(e) =>
                setContactState({ ...contactState, lastName: e.target.value })
              }
              className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-orange-600"
            />
          </div>
          <div className="flex items-center">
            <span className="text-gray-800 mr-2">Status :</span>
            <div className="flex items-center">
              <div className="flex items-center mr-4">
                <input
                  type="radio"
                  name="status"
                  value="active"
                  checked={contactState.status === "active"}
                  onChange={(e) =>
                    setContactState({ ...contactState, status: "active" })
                  }
                  className="mr-1"
                />
                <span className="text-gray-800">Active</span>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="inactive"
                  checked={contactState.status === "inactive"}
                  onChange={(e) =>
                    setContactState({ ...contactState, status: "inactive" })
                  }
                  className="mr-1"
                />
                <span className="text-gray-800">Inactive</span>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-lg mt-6"
        >
          Save
        </button>
      </div>
    </div>
  );
};


  
const ContactPage = () => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const contacts = useSelector((state) => state.contacts);

    return (
        <div>
        {showModal && <CreateContactModal setShowModal={setShowModal}/>}
        
        
        <div class="flex justify-center bg-gray-200">
  <h1 class="text-4xl font-bold text-center text-gray-800 p-4 rounded-lg">
    Contact Page
  </h1>
</div>


           <div className="flex justify-end">
            {!showModal &&   <button class="mt-4 mb-4 bg-gray-800 hover:bg-orange-600 text-white py-2 px-4 rounded-lg shadow-md"
 onClick={() => { setShowModal(true)}}>Create Contact</button>}
 </div>
            <div>
            {contacts.length > 0 ? (
        <ul className="space-y-4">
        {contacts.map((contact) => (
          <li
            key={contact.id}
            className="border border-gray-300 p-4 rounded-md hover:bg-orange-100 flex items-center justify-between"
          >
            <div>
              <h3 className="text-xl font-semibold">{contact.firstName}</h3>
              <p className="text-gray-500">{contact.lastName}</p>
            </div>
            <div>
  {!showEditModal && 
    <button
        className="mt-4 mr-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg shadow-md"
        onClick={() => { setShowEditModal(true)}}> Edit </button>}

{showEditModal && <EditContactModal contact={contact} setShowModal={setShowEditModal}/>}


  <button
  className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg shadow-md"
  onClick={() => {
    dispatch(deleteContact(contact.id))
  }}
>
  Delete
</button>

</div>

          </li>
        ))}
      </ul>
      
      ) : (
        <p className="text-gray-500">No contacts found.</p>
      )}
            </div>
           </div>

    );
    }
    
export default ContactPage;