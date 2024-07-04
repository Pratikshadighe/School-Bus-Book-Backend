import { Student } from "../models/student.js"; // Adjust the import path as needed

// Controller to create a new student
export const createStudent = async (req, res) => {
  try {
    const { name, mobileNumber, payments } = req.body;
    console.log("name",name)
    const userId = req.user._id;

    const newStudent = await Student.create({
      name,
      mobileNumber,
      payments,
      user: userId
    });

    res.status(201).json({
      success: true,
      message: "Student created successfully",
      student: newStudent,
    });
  } catch (error) {
    // Handle any errors and respond with an error message
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller to update a student's payment status
export const updateStudentPayment = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { amount, paid, paymentDate, paymentMethod } = req.body;

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    student.payments.push({ amount, paid, paymentDate, paymentMethod });
    await student.save();

    res.status(200).json({
      success: true,
      message: "Student payment status updated successfully",
      student,
    });
  } catch (error) {
    // Handle any errors and respond with an error message
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getAllStudent = async (req, res) => {
  try {
    // const userId = req.query.userId;
console.log("get")
    // const jobs = await Job.find({ user: userId }); // Find jobs associated with the user ID
    const students = await Student.find();
    console.log("get",students)
    res
      .status(200)
      .json({ success: true, message: "Students found successfully", students });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: true, error: error.message });
  }
};
