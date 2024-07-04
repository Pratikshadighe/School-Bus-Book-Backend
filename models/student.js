import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    paid: { type: Boolean, default: false },
    paymentDate: { type: Date, default: null },
    paymentMethod: { type: String, enum: ['cash', 'online', null], default: null }
});

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mobileNumber: { type: Number, required: true },
    payments: [paymentSchema], // Array of payment records
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

export const Student = mongoose.model("Student", studentSchema);
