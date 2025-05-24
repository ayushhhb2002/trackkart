import { Router, Request, Response } from "express";
import Session from "../models/Session";
import User from "../models/User";

const router = Router();

router.post("/start", async (req: Request, res: Response) => {
  try {
    const { userId, location, device_info, browser_info } = req.body;
    
    if (!userId) {
      res.status(400).json({ error: "Missing userId" });
      return;
    }

    const activeSession = await Session.findOne({
      where: { user_id: userId, is_logged_in: true },
    });

    if (activeSession) {
      res.status(409).json({ error: "User already has an active session" });
      return;
    }

    const newSession = await Session.create({
      user_id: userId,
      location: location || null,
      device_info: device_info || null,
      browser_info: browser_info || null,
      is_logged_in: true,
      started_at: new Date(),
      ended_at: null,
    });

    res
      .status(201)
      .json({ message: "Session started", sessionId: newSession.id });
  } catch (error) {
    console.error("Error starting session:", error);
    res.status(500).json({ error: "Failed to start session" });
  }
});

router.post("/validate", async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      res.status(400).json({ valid: false, error: "Missing sessionId" });
      return;
    }

    const session = await Session.findOne({ where: { id: sessionId } });

    if (!session) {
      res.status(404).json({ valid: false, error: "Session not found" });
      return;
    }

    const isValid = session.ended_at === null;
    const userId = session.user_id;

    if (!userId) {
      res.status(400).json({ valid: false, error: "Invalid userId" });
      return;
    }

    const user = await User.findByPk(userId);

    if (!user) {
      res.status(404).json({ valid: false, error: "User not found" });
      return;
    }

    res.status(200).json({
      valid: isValid,
      userId,
      role: user.role,
    });
  } catch (error) {
    console.error("Error validating session:", error);
    res.status(500).json({ valid: false, error: "Failed to validate session" });
  }
});

router.post("/end", async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      res.status(400).json({ error: "Missing sessionId" });
      return;
    }

    const activeSession = await Session.findOne({
      where: {
        id: sessionId,
        is_logged_in: true,
        ended_at: null,
      },
    });

    if (!activeSession) {
      res
        .status(404)
        .json({ error: "No active session found for this sessionId" });
      return;
    }

    activeSession.is_logged_in = false;
    activeSession.ended_at = new Date();

    await activeSession.save();

    res.status(200).json({ message: "Session ended" });
  } catch (error) {
    console.error("Error ending session:", error);
    res.status(500).json({ error: "Failed to end session" });
  }
});

export default router;
