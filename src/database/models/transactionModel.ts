import { model, models, Schema } from "mongoose";

const transactionSchema = new Schema({
    stripeId: { type: String, required: true, unique: true, },
    amount: { type: Number, required: true },
    plan: { type: String },
    credits: { type: Number },
    buyer: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
}, { timestamps: true });

const Transaction = models?.Transaction || model("Transaction", transactionSchema);

export default Transaction;