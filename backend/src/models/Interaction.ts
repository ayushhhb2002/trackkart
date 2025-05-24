import { DataTypes, Model } from "sequelize";
import sequelize from "../db";

class Interaction extends Model {
  public id!: number;
  public user_id!: number;
  public session_id!: string;
  public page!: string;
  public time_spent!: number;
  public product_clicked!: string;
  public timestamp!: Date;
}

Interaction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    session_id: {
      type: DataTypes.STRING(150),
      allowNull: false,
      comment: "Foreign key to session table",
    },
    page: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    time_spent: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Time spent on the page in seconds",
    },
    product_clicked: {
      type: DataTypes.STRING(500),
      allowNull: true,
      comment: "Comma-separated product IDs clicked by the user",
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "interactions",
    timestamps: false,
  }
);

export default Interaction;
