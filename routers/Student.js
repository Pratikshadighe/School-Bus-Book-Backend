import express from 'express';
import { createStudent, getAllStudent, updateStudentPayment,updateStudentDetails, getStudentById, deleteStudent } from '../controllers/student.js';
import { isAuthenticated } from "../middleware/auth.js";


const router = express.Router();

// Route to create a new student

router.post('/create-student',isAuthenticated, createStudent);
router.put('/update/:studentId', isAuthenticated,updateStudentDetails); // New route for updating student details
router.put('/payments/:studentId', isAuthenticated,updateStudentPayment);
router.get('/students', isAuthenticated,getAllStudent);
router.get('/student/:studentId',isAuthenticated, getStudentById);
router.delete('/students/:studentId',isAuthenticated, deleteStudent);


export default router;
