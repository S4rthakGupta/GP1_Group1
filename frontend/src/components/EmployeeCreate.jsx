import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 

// Importing CSS
import "../style/EmployeeCreate.css"; 

// This below is a function which create and store the employee's data.
function EmployeeCreate() {
  const [employeeData, setEmployeeData] = useState({
    FirstName: "",
    LastName: "",
    Age: "",
    DateOfJoining: "",
    Title: "Employee",
    Department: "IT",
    EmployeeType: "FullTime",
  });

  // This below line will store validation errors.
  const [errors, setErrors] = useState({}); 

  // This is used for navigation after the form is submitted.
  const navigate = useNavigate();


  // This below line will update state when an input value changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({
      ...employeeData,
      // This below line converts age to number
      [name]: name === "Age" ? parseInt(value, 10) : value,
    });
  };

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {};

    if (!employeeData.FirstName) newErrors.FirstName = "First Name is required";
    if (!employeeData.LastName) newErrors.LastName = "Last Name is required";
    if (employeeData.Age < 20 || employeeData.Age > 70)
      newErrors.Age = "Age must be between 20 and 70";
    if (!employeeData.DateOfJoining)
      newErrors.DateOfJoining = "Date of Joining is required";

    setErrors(newErrors);

    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    
    // This below code will send data to the server via a GraphQL mutation
    const response = await fetch("http://localhost:3001/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          mutation CreateEmployee($input: EmployeeInput!) {
            createEmployee(input: $input) {
              id
              FirstName
              LastName
              Age
              DateOfJoining
              Title
              Department
              EmployeeType
              CurrentStatus
            }
          }
        `,
        variables: { input: employeeData },
      }),
    });

    const { data } = await response.json();
    if (data) {
      alert(
        "Employee has been created successfully and is registered in the DB."
      );
      navigate("/"); 
    }
  };

  // Main UI and code starts from here.
  return (
    <div className="employee-create-container">
      <h2 className="employee-create-title">
        <i className="fas fa-user-plus"></i> Create New Employee
      </h2>
      <form onSubmit={handleSubmit} className="employee-form">
        <div className="employee-form-row">
          <div className="employee-form-group">
            <label className="employee-label">First Name</label>
            <input
              type="text"
              name="FirstName"
              className={`employee-input ${
                errors.FirstName ? "employee-input-error" : ""
              }`}
              placeholder="Enter First Name"
              onChange={handleInputChange}
            />
            {errors.FirstName && (
              <div className="employee-error">{errors.FirstName}</div>
            )}
          </div>
          <div className="employee-form-group">
            <label className="employee-label">Last Name</label>
            <input
              type="text"
              name="LastName"
              className={`employee-input ${
                errors.LastName ? "employee-input-error" : ""
              }`}
              placeholder="Enter Last Name"
              onChange={handleInputChange}
            />
            {errors.LastName && (
              <div className="employee-error">{errors.LastName}</div>
            )}
          </div>
        </div>

        <div className="employee-form-row">
          <div className="employee-form-group">
            <label className="employee-label">Age</label>
            <input
              type="number"
              name="Age"
              className={`employee-input ${
                errors.Age ? "employee-input-error" : ""
              }`}
              placeholder="Enter Age (20-70)"
              min="20"
              max="70"
              onChange={handleInputChange}
            />
            {errors.Age && <div className="employee-error">{errors.Age}</div>}
          </div>
          <div className="employee-form-group">
            <label className="employee-label">Date of Joining</label>
            <input
              type="date"
              name="DateOfJoining"
              className={`employee-input ${
                errors.DateOfJoining ? "employee-input-error" : ""
              }`}
              onChange={handleInputChange}
            />
            {errors.DateOfJoining && (
              <div className="employee-error">{errors.DateOfJoining}</div>
            )}
          </div>
        </div>

        <div className="employee-form-row">
          <div className="employee-form-group">
            <label className="employee-label">Title</label>
            <select
              name="Title"
              className="employee-select"
              onChange={handleInputChange}
              value={employeeData.Title}
            >
              <option value="Employee">Employee</option>
              <option value="Manager">Manager</option>
              <option value="Director">Director</option>
              <option value="VP">VP</option>
            </select>
          </div>
          <div className="employee-form-group">
            <label className="employee-label">Department</label>
            <select
              name="Department"
              className="employee-select"
              onChange={handleInputChange}
              value={employeeData.Department}
            >
              <option value="IT">IT</option>
              <option value="Marketing">Marketing</option>
              <option value="HR">HR</option>
              <option value="Engineering">Engineering</option>
            </select>
          </div>
          <div className="employee-form-group">
            <label className="employee-label">Employee Type</label>
            <select
              name="EmployeeType"
              className="employee-select"
              onChange={handleInputChange}
              value={employeeData.EmployeeType}
            >
              <option value="FullTime">Full Time</option>
              <option value="PartTime">Part Time</option>
              <option value="Contract">Contract</option>
              <option value="Seasonal">Seasonal</option>
            </select>
          </div>
        </div>

        <button type="submit" className="employee-submit-button">
          Create Employee
        </button>
      </form>
    </div>
  );
}

// Exporting EmployeeCreate.
export default EmployeeCreate;
