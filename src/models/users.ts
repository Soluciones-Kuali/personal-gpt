import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { user_prompts, user_promptsId } from './user_prompts';

export interface usersAttributes {
  id: string;
  email: string;
  name: string;
  created_at?: Date;
  hashed_password?: string;
}

export type usersPk = "id";
export type usersId = users[usersPk];
export type usersOptionalAttributes = "id" | "created_at" | "hashed_password";
export type usersCreationAttributes = Optional<usersAttributes, usersOptionalAttributes>;

export class users extends Model<usersAttributes, usersCreationAttributes> implements usersAttributes {
  id!: string;
  email!: string;
  name!: string;
  created_at?: Date;
  hashed_password?: string;

  // users hasMany user_prompts via user_id
  user_prompts!: user_prompts[];
  getUser_prompts!: Sequelize.HasManyGetAssociationsMixin<user_prompts>;
  setUser_prompts!: Sequelize.HasManySetAssociationsMixin<user_prompts, user_promptsId>;
  addUser_prompt!: Sequelize.HasManyAddAssociationMixin<user_prompts, user_promptsId>;
  addUser_prompts!: Sequelize.HasManyAddAssociationsMixin<user_prompts, user_promptsId>;
  createUser_prompt!: Sequelize.HasManyCreateAssociationMixin<user_prompts>;
  removeUser_prompt!: Sequelize.HasManyRemoveAssociationMixin<user_prompts, user_promptsId>;
  removeUser_prompts!: Sequelize.HasManyRemoveAssociationsMixin<user_prompts, user_promptsId>;
  hasUser_prompt!: Sequelize.HasManyHasAssociationMixin<user_prompts, user_promptsId>;
  hasUser_prompts!: Sequelize.HasManyHasAssociationsMixin<user_prompts, user_promptsId>;
  countUser_prompts!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof users {
    return sequelize.define('users', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "users_email_key"
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    hashed_password: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'users',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "idx_users_email",
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "users_email_key",
        unique: true,
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "users_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  }) as typeof users;
  }
}
