// Importing mongoose to work with MongoDB.
const mongoose = require('mongoose');

// Defining the structure of employee data.
const EmployeeSchema = new mongoose.Schema({
  FirstName: { type: String, required: true },
  LastName: { type: String, required: true },
  Age: { type: Number, required: true },
  DateOfJoining: { type: String, required: true },
  Title: { type: String, required: true },     
  Department: { type: String, required: true }, 
  EmployeeType: { type: String, required: true }, 
  CurrentStatus: { type: Boolean, default: true },
});

// Creating a model to interact with the database.
const EmployeeModel = mongoose.model('Employee', EmployeeSchema);

// Exporting the model to use it in other files.
module.exports = { EmployeeModel };
