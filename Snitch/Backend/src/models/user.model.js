import mongoose from "mongoose";
import bcrypt from "bcryptjs";


const userSchema = new mongoose.Schema({
    email:{ type: String, required: true, unique: true },
    contactNumber:{ type: String, required: true },
    password:{ type: String, required: true },
    fullName:{ type: String, required: true },
    role:{ 
        type: String,
        enum: ["user", "seller"], 
        default: "buyer"
     }
    });

    /**
     * email: String, required, unique
     * contact: String, required
     * password: String, required
     * fullname: String, required
     * role: String, enum ["user", "seller"], default
     */


        // Hash password before saving
    userSchema.pre("save", async function () {
        if (!this.isModified("password")) return;

            const hash = await bcrypt.hash(this.password, 10);
            this.password = hash;
        })


        // Method to compare password
    userSchema.methods.comparePassword = async function (password) {
        return await bcrypt.compare(password, this.password);
    }    

    const userModel = mongoose.model("User", userSchema);

    export default userModel;