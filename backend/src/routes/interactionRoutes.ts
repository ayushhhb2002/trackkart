import { Router, Request, Response } from "express";
import Interaction from "../models/Interaction";
import Session from "../models/Session";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    // console.log("Received interaction data:", req.body);
    const { user_id, page, time_spent, product_clicked } = req.body;

    if (!user_id || !page || typeof time_spent !== "number") {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const session = await Session.findOne({
      where: { user_id, is_logged_in: true },
    });

    if (!session) {
      res.status(404).json({ error: "Active session not found for user" });
      return;
    }

    const session_id = session.id;

    const interaction = await Interaction.create({
      user_id,
      session_id,
      page,
      time_spent,
      product_clicked,
    });

    res.status(201).json({ message: "Interaction saved", interaction });
  } catch (error) {
    console.error("Error saving interaction:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
