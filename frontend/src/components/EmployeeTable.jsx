import React from "react";
import { Link } from "react-router-dom";

// Importing Styles for Employee Table
import "../style/EmployeeTable.css"; 

// This below contains all the data that will be displayed on the home page.
const EmployeeTable = ({ getEmployees = [] }) => {
  return (
    <div className="employee-table-container">
      <h2>Employee List</h2>
      <div className="table-wrapper">
        <table className="employee-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Date of Joining</th>
              <th>Title</th>
              <th>Department</th>
              <th>Type</th>
              <th>Status</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {getEmployees.length === 0 ? (
              <tr>
                <td colSpan="9" className="no-records">
                  {/* If no data is found, it will display no employees found. */}
                  No employees found.
                </td>
              </tr>
            ) : (              
              // Iterating over the `getEmployees` array to dynamically generate a table row for each employee
              getEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.FirstName}</td>
                  <td>{employee.LastName}</td>
                  <td>{employee.Age}</td>
                  <td>
                    {new Date(employee.DateOfJoining).toLocaleDateString()}
                  </td>
                  <td>{employee.Title}</td>
                  <td>{employee.Department}</td>
                  <td>{employee.EmployeeType}</td>
                  <td>{employee.CurrentStatus ? "Working" : "Retired"}</td>
                  <td>
                    {/* Providing a link to the employee's details page */}
                    <Link to={`/employee/${employee.id}`} className="details-link">
                      Details
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeTable;
