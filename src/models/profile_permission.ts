import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { permission, permissionId } from './permission';
import type { profile, profileId } from './profile';

export interface profile_permissionAttributes {
  profile_id: number;
  permission_id: number;
}

export type profile_permissionPk = "profile_id" | "permission_id";
export type profile_permissionId = profile_permission[profile_permissionPk];
export type profile_permissionCreationAttributes = profile_permissionAttributes;

export class profile_permission extends Model<profile_permissionAttributes, profile_permissionCreationAttributes> implements profile_permissionAttributes {
  profile_id!: number;
  permission_id!: number;

  // profile_permission belongsTo permission via permission_id
  permission!: permission;
  getPermission!: Sequelize.BelongsToGetAssociationMixin<permission>;
  setPermission!: Sequelize.BelongsToSetAssociationMixin<permission, permissionId>;
  createPermission!: Sequelize.BelongsToCreateAssociationMixin<permission>;
  // profile_permission belongsTo profile via profile_id
  profile!: profile;
  getProfile!: Sequelize.BelongsToGetAssociationMixin<profile>;
  setProfile!: Sequelize.BelongsToSetAssociationMixin<profile, profileId>;
  createProfile!: Sequelize.BelongsToCreateAssociationMixin<profile>;

  static initModel(sequelize: Sequelize.Sequelize): typeof profile_permission {
    return sequelize.define('profile_permission', {
    profile_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'profile',
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
    tableName: 'profile_permission',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "profile_permission_pkey",
        unique: true,
        fields: [
          { name: "profile_id" },
          { name: "permission_id" },
        ]
      },
    ]
  }) as typeof profile_permission;
  }
}
