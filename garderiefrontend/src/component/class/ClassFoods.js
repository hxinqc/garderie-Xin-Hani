import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import "./classFoods.css";


function ClassFoods() {
    const [foods, setFoods] = useState(null);
    const [checkedState, setCheckedState] = useState();
    const [foodIds, setFoodIds] = useState("");
    const [message, setMessage] = useState(null);
    var lastStatus;

    const { id } = useParams();

    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );
        setCheckedState(updatedCheckedState);

        const allIds = updatedCheckedState.reduce(
            (ids, currentState, index) => {
                if (currentState === true) {
                    return ids + foods[index].id + ",";
                }
                return ids;
            },
            ""
        );

        setFoodIds(allIds);
    };


    useEffect(() => {
        loadFoods();
    }, []);

    const loadFoods = async () => {
        await fetch(`http://localhost:8080/allFoods/class/${id}`)
            .then((resp) => resp.json())
            .then((data) => {
                setFoods(data);
                var classStatus = new Array(data.length);
                var ids = "";
                data.forEach((food, index) => {
                    if (food.classId != null) {
                        classStatus[index] = true;
                        ids += food.id + ",";
                    } else {
                        classStatus[index] = false;
                    }
                });
                setCheckedState(classStatus);
                setFoodIds(ids);
            })
            .catch(err => {
                console.log("we have a problem " + err.message);
            });
    };

    const btnConfirm = (ev) => {
        ev.preventDefault();
        var ids = foodIds;
        if (ids == null) {
            ids = "";
        } else if (ids.length > 0) {
            ids = ids.substring(0, ids.length - 1);
        }

        fetch(`http://localhost:8080/class/foods?classId=${id}&afoodsIds=${ids}`, {
            method: "POST",
            body: JSON.stringify({
                classId: id,
                foodsIds: ids
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                lastStatus = res.status;
                return res;
            })
            .then((data) => {
                if (lastStatus === 204) {
                    setMessage("Class Foods are successfully modified.");
                }
            })
            .catch((err) => {
                setMessage("we have a problem " + err.message);
            });
    };

    return (
        <>
            <Title> Class - Foods</Title>
            {/* <FormDiv> */}
            <Form
                onSubmit={(ev) => {
                    btnConfirm(ev);
                }}
            >
                <div className="App">
                    <ul className="list">
                        {foods != null && foods.map((food, index) => {
                            return (
                                <div className="row" key={index}>
                                    <div className="cell">
                                        <li>
                                            <div className="list-item">
                                                <div className="left-section">
                                                    <input
                                                        type="checkbox"
                                                        id={`custom-checkbox-${index}`}
                                                        name={food.id}
                                                        value={food.id}
                                                        checked={checkedState != null && checkedState[index]}
                                                        onChange={() => handleOnChange(index)}
                                                    />
                                                    <label htmlFor={`custom-checkbox-${index}`}>{food.name}</label>
                                                </div>
                                            </div>
                                        </li>
                                    </div>
                                    <div className="cell">
                                        <label htmlFor={`custom-checkbox-${index}`}>{food.offerDate}</label>
                                    </div>
                                </div>
                            );
                        })}

                    </ul>

                    <br />
                    <Buttonsdiv>
                        <Button type="submit">Submit</Button>

                        <Link to="/Classes" style={{ textDecoration: "none" }}>
                            <Button type="button"> Back </Button>
                        </Link>
                    </Buttonsdiv>
                    <MessageLabel> {message} </MessageLabel>
                </div>
            </Form>
            {/* </FormDiv> */}
        </>
    );
}


const Title = styled.div`
  position: absolute;
  color: white;
  margin-top: -250px;
  margin-left: -140px;
  z-index: 5;
`;

const Wrapper = styled.div`
  height: calc(100vh - 60px);
  z-index: -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow-y: hidden;
  overflow-x: hidden;
  top: 50%;
  left: 50%;
`;

const FormDiv = styled.div``;

const Form = styled.form`
  height: 1000px;
  width: 800px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(0, 0, 22, 0.8);
  padding: 60px;
  margin: 15px;
  border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 1);
`;
const Label = styled.label`
  align-items: center;
  color: white;
  display: block;
`;

const MessageLabel = styled.label`
  align-items: center;
  color: white;
  margin-left: 2px;
  display: block;
  font-weight: 400;
  color: white;
  margin-top: 20px;
  margin-left: 14px;
`;
const Button = styled.button`
  position: relative;
  align-items: center;
  margin-bottom: 20px;
  margin-left: 16px;
  width: 80px;
  background-color: #f9c000;
  color: #333;
  border: none;
  cursor: pointer;
  align-items: center;
  padding: 3px;
  font-weight: 400;
  margin-top: 5px;
  font-size: 15px;
  border-radius: 5px;
  box-shadow: 0 0 4px #f7dd00;
  transition: box-shadow 0.5s ease;
`;

const Input = styled.input`
  margin: 0 auto;
  color: black;
  padding: 5px 20px;
  display: block;
  width: 100%;
  align-items: center;
  margin-top: 5px;
  background-color: white;
  display: flex;
  justify-content: right;
  width: 230px;
  margin-right: 24px;
`;

const Buttonsdiv = styled.div`
  display: flex;
  /* align-items:center; */
  margin-left: 20px;
  margin-right: 50px;
  margin-top: 10px;
`;

export default ClassFoods