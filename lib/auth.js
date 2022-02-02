import { compare, hash } from "bcryptjs";

export async function hashPassword(pw) {
  const hashedPassword = await hash(pw, 12);
  return hashedPassword;
}

export async function verifyPassword(password, hashedPassword) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}
