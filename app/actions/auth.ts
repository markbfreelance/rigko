"use server";

import { prisma } from "@/lib/prisma";
import { createSession, deleteSession } from "@/lib/auth";
import { hash, compare } from "bcryptjs";
import { redirect } from "next/navigation";

export interface AuthResult {
  error?: string;
}

export async function register(
  _prev: AuthResult | null,
  formData: FormData
): Promise<AuthResult> {
  const email = formData.get("email") as string;
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!email || !username || !password || !confirmPassword) {
    return { error: "All fields are required." };
  }

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match." };
  }

  const existingUser = await prisma.user.findFirst({
    where: { OR: [{ email }, { username }] },
  });

  if (existingUser) {
    if (existingUser.email === email) {
      return { error: "Email already registered." };
    }
    return { error: "Username already taken." };
  }

  const hashedPassword = await hash(password, 12);

  const user = await prisma.user.create({
    data: { email, username, password: hashedPassword },
  });

  await createSession({
    userId: user.id,
    email: user.email,
    username: user.username,
  });

  redirect("/");
}

export async function login(
  _prev: AuthResult | null,
  formData: FormData
): Promise<AuthResult> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return { error: "Invalid email or password." };
  }

  const valid = await compare(password, user.password);

  if (!valid) {
    return { error: "Invalid email or password." };
  }

  await createSession({
    userId: user.id,
    email: user.email,
    username: user.username,
  });

  redirect("/");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
