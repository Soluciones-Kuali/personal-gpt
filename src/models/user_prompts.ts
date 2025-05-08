import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { users, usersId } from './users';

export interface user_promptsAttributes {
  id: string;
  user_id: string;
  prompt: string;
  created_at?: Date;
}

export type user_promptsPk = "id";
export type user_promptsId = user_prompts[user_promptsPk];
export type user_promptsOptionalAttributes = "id" | "created_at";
export type user_promptsCreationAttributes = Optional<user_promptsAttributes, user_promptsOptionalAttributes>;

export class user_prompts extends Model<user_promptsAttributes, user_promptsCreationAttributes> implements user_promptsAttributes {
  id!: string;
  user_id!: string;
  prompt!: string;
  created_at?: Date;

  // user_prompts belongsTo users via user_id
  user!: users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof user_prompts {
    return sequelize.define('user_prompts', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
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
    prompt: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now')
    }
  }, {
    tableName: 'user_prompts',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "user_prompts_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  }) as typeof user_prompts;
  }
}
