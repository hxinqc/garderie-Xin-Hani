import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import styled from "styled-components";

const EnrolementHome = () => {
  const [enrolements, setEnrolements] = useState([]);
  const [select, setSelect] = useState();
  var options = [
    { value: "", label: "All" },
    { value: "ACCEPTED", label: "ACCEPTED" },
    { value: "REFUSED", label: "REFUSED" },
    { value: "WAITING", label: "WAITING" },
    { value: "INITIATE", label: "INITIATE" },
  ];

  const retrieveData = (status) => {
    fetch(`http://localhost:8080/inscription/status/${status}`)
      .then((resp) => resp.json())
      .then((data) => {
        setEnrolements(data);
      })
      .catch((err) => {
        console.log("we have a problem " + err.message);
      });
  };

  const btnConfirm = (ev) => {
    ev.preventDefault();
    if (select.value === "") {
      loadEnrolements();
    } else {
      retrieveData(select.value);
    }
  };

  useEffect(() => {
    loadEnrolements();
  }, []);

  const loadEnrolements = async () => {
    await fetch("http://localhost:8080/inscription")
      .then((resp) => resp.json())
      .then((data) => {
        setEnrolements(data);
      })
      .catch((err) => {
        console.log("we have a problem " + err.message);
      });
  };

  const updateStatus = (id, status) => {
    fetch(`http://localhost:8080/inscription/${id}/${status}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        loadEnrolements();
      })
      .catch((err) => {
        console.log("we have a problem " + err.message);
      });
  };

  return (
    <div className="container">
      <FormDiv>
      <Title> Select Enrolled Status to See Ralated Childs</Title>

        <Form
          onSubmit={(ev) => {
            btnConfirm(ev);
          }}
        >
          {/* <UpSection> */}
          <SelectDiv>
            <Select
              className="basic-single"
              classNamePrefix="select"
              value={select}
              name="isActive"
              options={options}
              onChange={(ev) => {
                setSelect({ value: ev.value, label: ev.label });
              }}
            />
          </SelectDiv>

          <Buttonsdiv>
            <Button type="submit">Submit</Button>
          </Buttonsdiv>
          {/* </UpSection> */}
        </Form>
      </FormDiv>
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
                <td>{index + 1}</td>
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
                    Add Enrolled Child
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => updateStatus(enrolement.id, "REFUSED")}
                  >
                    Refused
                  </button>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => updateStatus(enrolement.id, "WAITING")}
                  >
                    Waiting
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

export default EnrolementHome;

const Title = styled.div`
  position: absolute;
  color: white;
  margin-top: 20px;
  margin-left: 100px;
  z-index: 5;
  font-weight:300px;
  font-size: 19px;
`;


const UpSection = styled.div`
display: flex;
margin-right: 500px;
`;

const FormDiv = styled.div``;

const Form = styled.form`
 height: 20px;
  width: 600px;
   border-radius: 2px; 
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(0, 0, 22, 0.8);
  padding: 60px;
  margin-top: 5px;
  border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 1); 
  `;
   

const Buttonsdiv = styled.div`
  display: flex;
  /* align-items:center; */
  margin-left: 20px;
  margin-right: 10px;
  margin-top: -12px;
`;

const SelectDiv = styled.div`
  padding: 5px 13px;
  margin-left: -205px;
  margin-right: 7px;
  margin-top: -10px;
  width:auto;

`;

const Button = styled.button`
  position: relative;
  align-items: center;
  /* margin-bottom: 60px; */
  /* display: block;
  margin: 0 auto; */
  width: 125px;
  height: 38px;
  background-color: #f9c000;
  color: #333;
  border: none;
  cursor: pointer;
  align-items: center;
  padding: 6px;
  font-weight: 400;
  margin-top: -30px;
  margin-left:150px;
  font-size: 16px;
  border-radius: 5px;
  box-shadow: 0 0 4px #f7dd00;
  transition: box-shadow 0.5s ease;
`;
