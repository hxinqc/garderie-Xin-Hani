import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const AdminHome = () => {
  // var BASE_URL = "http://localhost:8080";
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    await fetch("http://localhost:8080/activities")
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setActivities(data);
      })
      .catch((err) => {
        console.log("we have a problem " + err.message);
      });
  };

  const deleteActivity = (id) => {
    if (!window.confirm("Are you sure to delete this activity?")) {
      return;
    }
    fetch(`http://localhost:8080/activities/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        loadActivities();
      })
      .catch((err) => {
        console.log("we have a problem " + err.message);
      });
  };

  return (
    <div className="container">
      <NavDiv>
          {/* <nav className="navbar navbar-expand-lg navbar-light bg-primary">
        <div className="container-fluid"> */}
          <MyButton>
            <Link className="navbar-brand" to="/Activities">
              Activities Info
            </Link>
          </MyButton>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <Link className="btn btn-outline-light" to="/activity/AddActivity">
            Add Activity
          </Link>
        </NavDiv>
      <div className="py-4">
        
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">ActivityDate</th>
              <th scope="col">Description</th>
              {/* <th scope="col">PicPath</th> */}
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, index) => (
              <tr key={activity.id}>
                <td>{index + 1}</td>
                <td>{activity.name}</td>
                <td>{activity.activityDate}</td>
                <td>{activity.description}</td>
                {/* <td>{BASE_URL + activity.picPath}</td> */}
                <td>
                  <Link
                    className="btn btn-primary mx-2"
                    to={`/activity/ViewActivity/${activity.id}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/activity/EditActivity/${activity.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteActivity(activity.id)}
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

const MyButton = styled.div`
  display: flex;
  color: white;
  margin-left: 300px;
  margin-top: 30px;
  align-items: center;
  justify-content: center;
`;

const NavDiv = styled.div`
  display: flex;
  width: 520px;
  height: 50px;
  align-items: center;
  // margin-left: 410px;
  /* background-color:black; */
  background: rgba(0, 0, 22, 0.8);
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 1);
  margin-bottom: -20px;
`;