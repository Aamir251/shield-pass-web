"use server";

import { dbClient } from "@/lib/db/client";
import bcrypt from "bcrypt";
import { extractFormData } from "../helpers/form";

const SALT_ROUNDS = 10;

export const signUpAction = async (prevState: any, formData: FormData) => {
  try {
    const formFields = ["username", "email", "password"] as const;

    const { username, email, password } = extractFormData(formData, formFields);

    // check if user already exists
    const userExists = await dbClient.user.findUnique({ where: { email } });

    if (userExists) throw new Error("User Already Exists");

    // create account
    const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS);

    const createdUser = await dbClient.user.create({
      data: {
        email,
        password: hashedPassword,
        name: username,
      },
    });

    return {
      success: true,
      user: {
        name: username,
        email,
      },
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};
