import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const AdminHome = () => {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    loadAdmins();
  }, []);
  
  const loadAdmins = async() => {
    await fetch("http://localhost:8080/admin")
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setAdmins(data);
      })
      .catch(err => {
        console.log("we have a problem " + err.message);
      });
  };

  const deleteAdmin=(id) => {
    if (!window.confirm("Are you sure to delete this admin?")) {
      return;
    }
    fetch(`http://localhost:8080/admin/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => {
      
      loadAdmins();
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
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">IsActive</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin, index) => (
              <tr key={admin.id}>
                <td>
                  {index + 1}
                </td>
                <td>{admin.name}</td>
                <td>{admin.description}</td>
                <td>{admin.isActive ? "true": "false"}</td>
                <td>
                  <Link
                    className="btn btn-primary mx-2"
                    to={`/Admins/ViewAdmin/${admin.id}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/Admins/EditAdmin/${admin.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteAdmin(admin.id)}
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

export default AdminHome;
