import { DataTypes, Model } from "sequelize";
import sequelize from "../db";

class User extends Model {
  public id!: number;
  public username!: string;
  public email!: string;
  public password_hash!: string;
  public created_at!: Date;
  public role!: "user" | "admin";
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: "user",
      validate: {
        isIn: [["user", "admin"]],
      },
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: false,
  }
);

export default User;