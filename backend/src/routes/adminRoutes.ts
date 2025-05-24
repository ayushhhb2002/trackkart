// routes/admin.ts
import express from "express";
import { Op, fn, col, literal } from "sequelize";
import Interaction from "../models/Interaction";
import Session from "../models/Session";
import User from "../models/User";
import BestDealsData from "../data/BestDealsData";

const router = express.Router();

router.get("/report", async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const start = startDate
      ? new Date(startDate as string)
      : new Date("2000-01-01");
    const end = endDate ? new Date(endDate as string) : new Date();

    // Total unique user visits
    const uniqueUsers = await User.count({
      col: "id",
      where: {
        created_at: {
          [Op.between]: [start, end],
        },
      },
    });

    // Top 3 visited pages
    const topPages = await Interaction.findAll({
      attributes: ["page", [fn("COUNT", col("page")), "count"]],
      where: {
        timestamp: {
          [Op.between]: [start, end],
        },
      },
      group: ["page"],
      order: [[literal("count"), "DESC"]],
      limit: 3,
    });

    // Average time spent on each page
    const avgTimePerPage = await Interaction.findAll({
      attributes: ["page", [fn("AVG", col("time_spent")), "avg_time_spent"]],
      where: {
        timestamp: {
          [Op.between]: [start, end],
        },
      },
      group: ["page"],
    });

    // Top 5 products clicked (raw from DB)
    const topProductsRaw = await Interaction.findAll({
      attributes: [
        "product_clicked",
        [fn("COUNT", col("product_clicked")), "count"],
      ],
      where: {
        timestamp: {
          [Op.between]: [start, end],
        },
        product_clicked: {
          [Op.ne]: null,
        },
      },
      group: ["product_clicked"],
      order: [[literal("count"), "DESC"]],
      limit: 5,
    });

    // Map product IDs to names using BestDealsData
    const topProducts = topProductsRaw.map((entry) => {
      const productId = entry.getDataValue("product_clicked");
      const count = entry.getDataValue("count");

      const product = BestDealsData.find(
        (p) => Number(p.id) === Number(productId)
      );

      return {
        product_id: productId,
        product_name: product ? product.name : "Unknown Product",
        count,
      };
    });

    // Logged in vs Logged out user count
    const loggedInUserCount = await Session.count({
      distinct: true,
      col: "user_id",
      where: {
        ended_at: null,
        user_id: {
          [Op.ne]: null, // Optional: Exclude sessions without a user_id
        },
      },
    });

    res.json({
      uniqueUsers,
      topPages,
      avgTimePerPage,
      topProducts,
      loggedInUserCount,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate report" });
  }
});

export default router;
