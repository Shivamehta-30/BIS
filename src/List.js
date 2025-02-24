import { useEffect, useState } from "react";
import { deleteUser, getUsers } from "./Api";
import Form from "./Form";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router";
import "./styles/style.css";
function List() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await getUsers();
        setData(users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const success = await deleteUser(id);
      if (success) {
        setData(data.filter((user) => user.id !== id));
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEdit = (user) => {
    navigate("/edit", { state: { editToggle: user } });
  };

  const filterData = data.filter((item) =>
    item.firstName?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <div className="search-container">
        <input
          className="form-group"
          type="text"
          placeholder="Search by first name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        style={{ position: "absolute", top: "2px", right: "0" }}
      >
        Create User
      </button>

      <table className="table mt-4">
        <thead style={{ background: "lavender", color: "blue" }}>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>User Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filterData.map((i) => (
            <tr key={i.id}>
              <td>{i.firstName}</td>
              <td>{i.lastName}</td>
              <td>{i.email}</td>
              <td>{i.username}</td>
              <td>
                <button
                  style={{ color: "red" }}
                  onClick={() => handleDelete(i.id)}
                >
                  <AiFillDelete />
                </button>
                <button style={{ color: "blue" }} onClick={() => handleEdit(i)}>
                  <AiFillEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Form setData={setData} data={data} />
    </div>
  );
}

export default List;
