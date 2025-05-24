import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db';

interface SessionAttributes {
  id: string;
  user_id?: number | null;
  location?: string | null;
  device_info?: string;
  browser_info?: string;
  is_logged_in: boolean;
  started_at?: Date;
  ended_at?: Date | null;
}

type SessionCreationAttributes = Optional<
  SessionAttributes,
  'id' | 'user_id' | 'location' | 'device_info' | 'browser_info' | 'started_at' | 'ended_at'
>;

class Session extends Model<SessionAttributes, SessionCreationAttributes> implements SessionAttributes {
  public id!: string;
  public user_id!: number | null;
  public location?: string;
  public device_info?: string;
  public browser_info?: string;
  public is_logged_in!: boolean;
  public started_at?: Date;
  public ended_at?: Date | null;
}

Session.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users', // table name
        key: 'id',
      },
      onDelete: 'SET NULL',
    },
    location: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    device_info: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    browser_info: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    is_logged_in: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    started_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    ended_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'sessions',
    timestamps: false, // timestamps are manually handled
  }
);

export default Session;
