import { useState } from "react";
import { updateUser } from "./Api";
import { useLocation, useNavigate } from "react-router";

function Edit({ setEditToggle, data, setData }) {
  const { state } = useLocation(); 
  const { editToggle } = state || {}; 
  const [newFirstName, setNewFirstName] = useState(editToggle?.firstName);
  const [newLastName, setNewLastName] = useState(editToggle?.lastName);
  const [newEmail, setNewEmail] = useState(editToggle?.email);
  const [newUserName, setNewUserName] = useState(editToggle?.username);

  const navigate = useNavigate();

  const handleUpdate = async () => {
    const newUser = {
      firstName: newFirstName,
      lastName: newLastName,
      email: newEmail,
      username: newUserName,
    };
    const createdUser = await updateUser(newUser, editToggle.id);

    if (createdUser) {
      setData((data) =>
        data.map((user) => {
          if (user.id === editToggle.id) {
            return { ...user, createdUser };
          }
          return user;
        })
      );
      setNewFirstName("");
      setNewLastName("");
      setNewEmail("");
      setNewUserName("");
    }
    setEditToggle(null);
    navigate("/");
  };
  const handleCancel = () => {
    setEditToggle(null); 
    navigate("/");
  };

  if (editToggle) {
    return (
      <div>
        <input
          type="text"
          value={newFirstName}
          onChange={(e) => setNewFirstName(e.target.value)}
        />
        <input
          type="text"
          value={newLastName}
          onChange={(e) => setNewLastName(e.target.value)}
        />
        <input
          type="text"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
        <input
          type="text"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
        />
        <button onClick={handleUpdate}>Update</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    );
  } else {
    return null;
  }
}
export default Edit;
