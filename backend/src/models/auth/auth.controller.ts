import type { Request, Response } from "express";
import bcrypt from "bcryptjs";

import User from "./user.model.js";
import asyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/ApiError.js";
import generateToken from "../../utils/generateToken.js";

export const registerUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new ApiError(400, "User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const token = generateToken(user._id.toString());

    res.status(201).json({
      success: true,
      token,
      user,
    });
  }
);

export const loginUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new ApiError(401, "Invalid credentials");
    }

    const token = generateToken(user._id.toString());

    res.status(200).json({
      success: true,
      token,
      user,
    });
  }
);