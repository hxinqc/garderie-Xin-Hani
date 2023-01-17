import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const FoodHome = () => {
  // var BASE_URL = "http://localhost:8080";
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    loadFoods();
  }, []);

  const loadFoods = async () => {
    await fetch("http://localhost:8080/food")
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setFoods(data);
      })
      .catch((err) => {
        console.log("we have a problem " + err.message);
      });
  };

  const deleteFood = (id) => {
    if (!window.confirm("Are you sure to delete this food?")) {
      return;
    }
    fetch(`http://localhost:8080/food/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        loadFoods();
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
              <th scope="col">OfferDate</th>
              <th scope="col">Description</th>
              {/* <th scope="col">PicPath</th> */}
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {foods!=null && foods.map((food, index) => (
              <tr key={food.id}>
                <td>{index + 1}</td>
                <td>{food.name}</td>
                <td>{food.offerDate}</td>
                <td>{food.description}</td>
                {/* <td>{BASE_URL + food.picPath}</td> */}
                <td>
                  <Link
                    className="btn btn-primary mx-2"
                    to={`/food/ViewFood/${food.id}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/food/EditFood/${food.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteFood(food.id)}
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

export default FoodHome;

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