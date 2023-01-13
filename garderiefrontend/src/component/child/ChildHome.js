import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ChildHome = () => {
  const [children, setChildren] = useState([]);

  useEffect(() => {
    loadChildren();
  }, []);
  
  const loadChildren = async() => {
    await fetch("http://localhost:8080/roster")
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setChildren(data);
      })
      .catch(err => {
        console.log("we have a problem " + err.message);
      });
  };

  const deleteRoster=(id) => {
    if (!window.confirm("Are you sure to delete this roster?")) {
      return;
    }
    fetch(`http://localhost:8080/roster/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => {
      
      loadChildren();
    })
    .catch((err) => {      
      console.log("we have a problem " + err.message);
    });
    
  };

  return (
    <div className="container">
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">FirstName</th>
              <th scope="col">lastName</th>
              <th scope="col">InscripId</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {children.map((child, index) => (
              <tr key={child.id}>
                <td>
                  {index + 1}
                </td>
                <td>{child.firstName}</td>
                <td>{child.lastName}</td>
                <td>{child.inscripId}</td>
                <td>
                  <Link
                    className="btn btn-primary mx-2"
                    to={`/Child/ViewChild/${child.id}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/Child/EditChild/${child.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteRoster(child.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ChildHome;
