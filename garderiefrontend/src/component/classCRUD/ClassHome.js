import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function ClassHome() {
  const [classes, setClasses] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    loadClasses();
  }, []);

  const loadClasses = async () => {
    await fetch("http://localhost:8080/classes")
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setClasses(data);
      })
      .catch((err) => {
        console.log("we have a problem " + err.message);
      });
  };

  const deleteClass = (id) => {
    if (!window.confirm("Are you sure to delete this class?")) {
      return;
    }
    fetch(`http://localhost:8080/class/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.status === 500) {
          alert(
            "This teacher maybe still in one class, please check before deleting."
          );
          return;
        }
        loadClasses();
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
              <th scope="col">Open Date</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((eachClass, index) => (
              <tr key={eachClass.id}>
                <td>{index + 1}</td>
                <td>{eachClass.name}</td>
                <td>{eachClass.openDate}</td>
                <td>
                  <Link
                    className="btn btn-primary mx-2"
                    to={`/classes/viewClass/${eachClass.id}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-primary mx-2"
                    to={`/classes/teachers/${eachClass.id}`}
                  >
                    Assign Teachers
                  </Link>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/classes/editClass/${eachClass.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteClass(eachClass.id)}
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
}
export default ClassHome;
