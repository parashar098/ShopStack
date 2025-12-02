// src/models/User.ts
import { Schema, model, Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  matchPassword(enteredPassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre<IUser>('save', async function () {
  // Only hash password if it's new or modified
  if (!this.isModified('password')) {
    return;
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    throw error;
  }
});

// Method to compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword: string) {
  const user = this as IUser;
  return await bcrypt.compare(enteredPassword, user.password);
};

const User = model<IUser>('User', userSchema);

export default User;