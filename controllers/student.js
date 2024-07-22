import { Student } from "../models/student.js"; // Adjust the import path as needed

// Controller to create a new student
export const createStudent = async (req, res) => {
  try {
    const { name, mobileNumber, amount } = req.body;
    const userId = req.user._id;
console.log("amount",amount)
    const newStudent = await Student.create({
      name,
      mobileNumber,
      amount,
      user: userId
    });

    res.status(201).json({
      success: true,
      message: "Student created successfully",
      student: newStudent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller to update a student's basic details
export const updateStudentDetails = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { name, mobileNumber,amount } = req.body;
    const userId = req.user._id;
    const student = await Student.findById({ _id: studentId, user: userId });
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    student.name = name || student.name;
    student.mobileNumber = mobileNumber || student.mobileNumber;
    student.amount=amount || student.amount;
    await student.save();

    res.status(200).json({
      success: true,
      message: "Student details updated successfully",
      student,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller to update a student's payment status
export const updateStudentPayment = async (req, res) => {
  try {
 
    const { studentId } = req.params;
    console.log("studentId",studentId)
    const {  paid, paymentDate, paymentMethod } = req.body;
    const userId = req.user._id;
    const student = await Student.findById({ _id: studentId, user: userId });
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    student.payments.push({  paid, paymentDate, paymentMethod });
    await student.save();

    res.status(200).json({
      success: true,
      message: "Student payment status updated successfully",
      student,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller to get a single student's details by ID
export const getStudentById = async (req, res) => {
  try {
    const { studentId } = req.params; // Get studentId from request parameters
    const userId = req.user._id;
    const student = await Student.findById({ _id: studentId, user: userId }); // Query database for student
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    res.status(200).json({
      success: true,
      message: "Student found successfully",
      student,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller to get all students
// Controller to get all students for a specific user
export const getAllStudent = async (req, res) => {
  try {
    const userId = req.user._id; // Get the userId from the request
    const students = await Student.find({ user: userId }); // Filter students by userId
    res.status(200).json({
      success: true,
      message: "Students found successfully",
      students,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller to delete a student by ID
export const deleteStudent = async (req, res) => {
  try {
    const { studentId } = req.params; // Get studentId from request parameters
    const userId = req.user._id; // Get the userId from the request

    // Find the student by ID and ensure it belongs to the current user
    const student = await Student.findOne({ _id: studentId, user: userId });
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found or not authorized' });
    }

    // Delete the student
    await Student.deleteOne({ _id: studentId });

    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

