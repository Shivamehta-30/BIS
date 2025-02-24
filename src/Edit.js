import { useState } from "react";
import { updateUser } from "./Api";
function Edit({ setEditToggle, editToggle, data, setData }) {
  const [newFirstName, setNewFirstName] = useState(editToggle?.firstName);
  const [newLastName, setNewLastName] = useState(editToggle?.lastName);
  const [newEmail, setNewEmail] = useState(editToggle?.email);
  const [newUserName, setNewUserName] = useState(editToggle?.username);

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
    window.location.reload();  
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
        <button onClick={() => setEditToggle(null)}>Cancle</button>
      </div>
    );
  } else {
    return null;
  }
}
export default Edit;
