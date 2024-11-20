// Importing the EmployeeModel to interact with the employee data in the database.
const { EmployeeModel } = require("../models/Employee");

// Defining resolvers for handling GraphQL queries and mutations.
const resolvers = {
  Query: {
    // Fetches all employees from the database
    getEmployees: async (_, { type }) => {
      try {
        const filter = type ? { EmployeeType: type } : {};
        return await EmployeeModel.find(filter);
      } catch (error) {
        console.error("Error in fetching employees:", error);
        throw new Error("Failed to fetch employees");
      }
    },
    employee: async (_, { id }) => {
      try {
        return await EmployeeModel.findById(id);
      } catch (error) {
        console.error("Error fetching employee by ID:", error);
        throw new Error("Failed to fetch employee");
      }
    },
  },

  // Mutation resolvers for modifying data
  Mutation: {
    // Creates a new employee and saves it to the database
    createEmployee: async (_, { input }) => {
      try {
        const newEmployee = new EmployeeModel({
          ...input,
          CurrentStatus: true,
        });
        await newEmployee.save();
        return newEmployee;
      } catch (error) {
        console.error("Error in creating an employee:", error);
        throw new Error("Failed to create an employee");
      }
    },

    // This will update the employee and store it in the DB.
    updateEmployee: async (_, { id, input }) => {
      const updates = {};
      if (input.Title) updates.Title = input.Title;
      if (input.Department) updates.Department = input.Department;
      if (typeof input.CurrentStatus === "boolean")
        updates.CurrentStatus = input.CurrentStatus;
      return await EmployeeModel.findByIdAndUpdate(id, updates, { new: true });
    },
    // This will delete an employee dynamically from the DB.
    deleteEmployee: async (_, { id }) => {
      await EmployeeModel.findByIdAndDelete(id);
      return { message: "Employee deleted successfully" };
    },
  },
};

// Export the resolvers to use them in the GraphQL server
module.exports = resolvers;
