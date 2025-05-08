import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { permission, permissionId } from './permission';
import type { users, usersId } from './users';

export interface user_permissionAttributes {
  user_id: string;
  permission_id: number;
}

export type user_permissionPk = "user_id" | "permission_id";
export type user_permissionId = user_permission[user_permissionPk];
export type user_permissionCreationAttributes = user_permissionAttributes;

export class user_permission extends Model<user_permissionAttributes, user_permissionCreationAttributes> implements user_permissionAttributes {
  user_id!: string;
  permission_id!: number;

  // user_permission belongsTo permission via permission_id
  permission!: permission;
  getPermission!: Sequelize.BelongsToGetAssociationMixin<permission>;
  setPermission!: Sequelize.BelongsToSetAssociationMixin<permission, permissionId>;
  createPermission!: Sequelize.BelongsToCreateAssociationMixin<permission>;
  // user_permission belongsTo users via user_id
  user!: users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof user_permission {
    return sequelize.define('user_permission', {
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    permission_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'permission',
        key: 'id'
      }
    }
  }, {
    tableName: 'user_permission',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "user_permission_pkey",
        unique: true,
        fields: [
          { name: "user_id" },
          { name: "permission_id" },
        ]
      },
    ]
  }) as typeof user_permission;
  }
}
