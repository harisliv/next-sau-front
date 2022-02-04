import { compare, hash } from "bcryptjs";

export async function hashPassword(pw) {
  const hashedPassword = await hash(pw, 12);
  return hashedPassword;
}

export async function verifyPassword(password, hashedPassword) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}

export async function createUser(email, password, name, surname) {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password, name, surname }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong!');
  }

  return data;
}

export async function changePassword(passwordData) {
  const response = await fetch('/api/user/change-password', {
    method: 'PATCH',
    body: JSON.stringify(passwordData),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json();

  console.log(data);
}
