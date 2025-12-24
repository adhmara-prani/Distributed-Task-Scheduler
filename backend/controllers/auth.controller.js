import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../db/db.js";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const signup = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    if (!name || !email || !password || !role) {
      res.status(400).json({
        message: "None of the fields can be empty! Please fill all the fields",
      });
    }

    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length !== 0) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await pool.query(
      "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role",
      [name, email, hashedPassword, role]
    );

    res.status(201).json({
      message: "User created successfully!",
      user: newUser.rows[0],
      token: generateToken(newUser.rows[0]),
    });
  } catch (error) {
    console.log(error.stack);
    res.status(500).json("Internal Server Error! Signup was unsuccessful!");
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const loginData = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (loginData.rows.length === 0) {
      return res
        .status(400)
        .json({ message: "Invalid emailID, please try again!" });
    }

    const user = loginData.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid password, please try again!" });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Login successful!",
      token,
      user: { id: user.id, name: user.name, role: user.role },
    });
  } catch (error) {
    console.log(error.stack);
    res
      .status(500)
      .json({ message: "Internal Server Error! Login was unsuccessful!" });
  }
};

const generateToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: "1h",
  });
};

// export const logout = async (req, res) => {

// }
