const mongoose = require('mongoose');
const Employee = require('../models/Employee');

describe('Employee Model Test', () => {
  beforeEach(async () => {
    await Employee.deleteMany({});
  });

  it('should create & save employee successfully', async () => {
    const validEmployee = new Employee({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      position: 'Software Engineer',
      department: 'Engineering',
      salary: 75000
    });

    const savedEmployee = await validEmployee.save();
    
    expect(savedEmployee._id).toBeDefined();
    expect(savedEmployee.firstName).toBe(validEmployee.firstName);
    expect(savedEmployee.lastName).toBe(validEmployee.lastName);
    expect(savedEmployee.email).toBe(validEmployee.email);
    expect(savedEmployee.position).toBe(validEmployee.position);
    expect(savedEmployee.department).toBe(validEmployee.department);
    expect(savedEmployee.salary).toBe(validEmployee.salary);
    expect(savedEmployee.isActive).toBe(true);
  });

  it('should fail to save employee without required fields', async () => {
    const employeeWithoutRequiredField = new Employee({
      firstName: 'John'
    });

    let err;
    try {
      await employeeWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });

  it('should update employee salary successfully', async () => {
    const employee = new Employee({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      position: 'Software Engineer',
      department: 'Engineering',
      salary: 75000
    });

    await employee.save();

    const updatedEmployee = await Employee.findByIdAndUpdate(
      employee._id,
      { salary: 80000 },
      { new: true }
    );

    expect(updatedEmployee.salary).toBe(80000);
  });

  it('should delete employee successfully', async () => {
    const employee = new Employee({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      position: 'Software Engineer',
      department: 'Engineering',
      salary: 75000
    });

    await employee.save();

    await Employee.findByIdAndDelete(employee._id);
    const deletedEmployee = await Employee.findById(employee._id);

    expect(deletedEmployee).toBeNull();
  });
}); 