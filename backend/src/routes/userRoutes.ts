import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";

const router = Router();

router.post("/signup", async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({ username, email, password_hash });
    res
      .status(201)
      .json({ message: "User signed up successfully", user: newUser });
  } catch (err) {
    res.status(500).json({ error: "Failed to sign up user" });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    res.status(200).json({
      message: "Login successful",
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to log in" });
  }
});

export default router;