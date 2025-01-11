import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			default: "member",
			enum: ["member", "admin", "superAdmin"],
		},
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

console.log(userSchema);
const User = mongoose.model("User", userSchema);

export default User;
