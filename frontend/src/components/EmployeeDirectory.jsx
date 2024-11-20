import React, { useState } from "react";

// Importing the EmployeeSearch and EmployeeTable components
import EmployeeSearch from "./EmployeeSearch";
import EmployeeTable from "./EmployeeTable";

// Main EmployeeDirectory component
const EmployeeDirectory = () => {
  
  // This below is a state to store the list of employees, initialized as an empty array
  const [getEmployees, setEmployees] = useState([]); 

  return (
    <div className="directory-container">

      {/* EmployeeSearch component for filtering or searching employees */}
      <EmployeeSearch setEmployees={setEmployees} />

      {/* Section for displaying the employee table */}
      <div className="employee-section">
        <EmployeeTable getEmployees={getEmployees} />
      </div>
    </div>
  );
};

export default EmployeeDirectory;
