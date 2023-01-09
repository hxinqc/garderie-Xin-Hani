import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const TeacherHome = () => {
  const [teachers, setTeachers] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    loadTeachers();
  }, []);
  
  const loadTeachers = async() => {
    await fetch("http://localhost:8080/teacher")
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setTeachers(data);
      })
      .catch(err => {
        console.log("we have a problem " + err.message);
      });
  };

  const deleteTeacher=(id) => {
    if (!window.confirm("Are you sure to delete this teacher?")) {
      return;
    }
    fetch(`http://localhost:8080/teacher/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => {
      if (res.status === 500) {
        alert('This teacher maybe still in one class, please check before deleting.');
        return;
      }
      loadTeachers();
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
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">IsActive</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher, index) => (
              <tr key={teacher.id}>
                <td>
                  {index + 1}
                </td>
                <td>{teacher.firstName}</td>
                <td>{teacher.lastName}</td>
                <td>{teacher.active ? "true": "false"}</td>
                <td>
                  <Link
                    className="btn btn-primary mx-2"
                    to={`/viewteacher/${teacher.id}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`teachers/editTeacher/${teacher.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteTeacher(teacher.id)}
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

export default TeacherHome;
