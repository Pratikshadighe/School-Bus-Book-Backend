import express from 'express';
import { createStudent, getAllStudent, updateStudentPayment } from '../controllers/student.js';
import { isAuthenticated } from "../middleware/auth.js";


const router = express.Router();

// Route to create a new student

router.route("/create-students").post(isAuthenticated, createStudent);

// Route to update a student's payment status
router.put('/students/:studentId',isAuthenticated, updateStudentPayment);
router.get('/students',isAuthenticated, getAllStudent);

export default router;
