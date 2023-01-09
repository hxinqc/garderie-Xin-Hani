import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const TeacherHome = () => {
  const [teachers, setTeachers] = useState([]);
  const [teacher, setTeacher] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    loadTeachers();
  }, []);

  const loadTeachers = async () => {
    await fetch("https://localhost8080/teacher")
      .then((resp) => resp.json())
      .then((resp) => {
        setTeachers(resp.data);
      });
  };

  const deleteTeacher = async (id) => {
    await fetch(`http://localhost:8080/teacher/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log("we have a problem " + err.message);
      });

    loadTeachers();
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
              <tr>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{teacher.firstName}</td>
                <td>{teacher.lastName}</td>
                <td>{teacher.isActive}</td>
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
