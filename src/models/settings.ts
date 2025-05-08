import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { users, usersId } from './users';

export interface settingsAttributes {
  id: string;
  user_id: string;
  name: string;
  value: string;
}

export type settingsPk = "id";
export type settingsId = settings[settingsPk];
export type settingsOptionalAttributes = "id";
export type settingsCreationAttributes = Optional<settingsAttributes, settingsOptionalAttributes>;

export class settings extends Model<settingsAttributes, settingsCreationAttributes> implements settingsAttributes {
  id!: string;
  user_id!: string;
  name!: string;
  value!: string;

  // settings belongsTo users via user_id
  user!: users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof settings {
    return sequelize.define('settings', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('public.gen_random_uuid'),
      primaryKey: true
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    value: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'settings',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "idx_settings_user_id",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "settings_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  }) as typeof settings;
  }
}
