import { pool } from "../../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config";

const loginIntoUserDb = async (payload: { email: string; password: string }) => {
  const { email, password } = payload;

  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const userData = await pool.query(
    `
    SELECT * FROM users
    WHERE LOWER(TRIM(email)) = LOWER(TRIM($1))
    LIMIT 1
    `,
    [email]
  );

  if (userData.rowCount === 0) {
    throw new Error("User not found");
  }

  const user = userData.rows[0];

  const matchPassword = await bcrypt.compare(password, user.password);

  if (!matchPassword) {
    throw new Error("Invalid password");
  }

  const jwtPayload = {
    id: user.id,
    email: user.email,
    name: user.name,
  };

  const accessToken = jwt.sign(jwtPayload, config.JWT_SECRET_KEY, {
    expiresIn: "1h",
  });

  const { password: hashedPassword, ...userWithoutPassword } = user;

  return {
    accessToken,
    user: userWithoutPassword,
  };
};

export const authService = {
  loginIntoUserDb,
};