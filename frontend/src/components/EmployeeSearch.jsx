import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Importing CSS for the filter (EmployeeSearch)
import "../style/EmployeeSearch.css"; 

// Import UI Icon from font awesome to add it in the input field of search.
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons"; //

// EmployeeSearch component to filter employees based on their type.
const EmployeeSearch = ({ setEmployees }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState("");
  
  // Extracting the "type" query parameter from the URL
  const type = new URLSearchParams(location.search).get("type") || "";
  
  // This below hook is synchronizing the selectedType state with the "type" query parameter
  useEffect(() => {
    setSelectedType(type);
  }, [type]);

  
  // Fetching employee data based on the selected type whenever the "type" changes
  useEffect(() => {
    fetch("http://localhost:3001/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query ($type: String) {
            getEmployees(type: $type) {
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
        variables: { type: type || null },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.errors) {
          console.error("GraphQL Error:", data.errors);
          setEmployees([]);
        } else {          
          // Updating the employee list with the fetched data
          setEmployees(data.data.getEmployees || []);
        }
      })
      .catch((err) => {
        console.error("Network Error:", err);
        setEmployees([]);
      });
  }, [type, setEmployees]);

  
  // Handler for dropdown selection change
  const handleTypeChange = (event) => {
    const newType = event.target.value;
    setSelectedType(newType);
    navigate(`?type=${newType}`);
  };

  return (    
    // Container for the search/filter UI
    <div className="employee-search-container">
      <h2>Filter Employees</h2>
      <div className="dropdown-wrapper">
        {/* Using icon in the search bar. */}
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        <select
          value={selectedType}
          onChange={handleTypeChange}
        >
          <option value="">All</option>
          <option value="FullTime">Full-Time</option>
          <option value="PartTime">Part-Time</option>
          <option value="Contract">Contract</option>
          <option value="Seasonal">Seasonal</option>
        </select>
      </div>
    </div>
  );
};

export default EmployeeSearch;
