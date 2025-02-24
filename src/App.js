import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import List from "./List";
import Edit from "./Edit";
import { useState } from "react";
function App() {
  const [data, setData] = useState([]);
  const [editToggle, setEditToggle] = useState(null);  
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          exact
          element={
            <List data={data} setData={setData} setEditToggle={setEditToggle} />
          }
        />
        <Route
          path="/edit"
          element={
            <Edit data={data} setData={setData} setEditToggle={setEditToggle} editToggle={editToggle} />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
