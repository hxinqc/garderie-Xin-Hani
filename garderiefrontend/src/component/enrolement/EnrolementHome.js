import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


const EnrolementHome = () => {
  const [enrolements, setEnrolements] = useState([]);

  useEffect(() => {
    loadEnrolements();
  }, []);
  
  const loadEnrolements = async() => {
    await fetch("http://localhost:8080/inscription")
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setEnrolements(data);
      })
      .catch(err => {
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
              <th scope="col">Phone</th>
              <th scope="col">Address</th>
              <th scope="col">Date</th>
              <th scope="col">Place</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {enrolements.map((enrolement, index) => (
              <tr key={enrolement.id}>
                <td>
                  {index + 1}
                </td>
                <td>{enrolement.firstName}</td>
                <td>{enrolement.lastName}</td>
                <td>{enrolement.phone}</td>
                <td>{enrolement.address}</td>
                <td>{enrolement.inscriptionDate}</td>
                <td>{enrolement.openPlace}</td>
                <td>{enrolement.status}</td>
                <td>
                  <Link
                    className="btn btn-primary mx-2"
                    to={`/child/AddChild/${enrolement.id}`}
                  >
                    Add Roster
                  </Link>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnrolementHome;
