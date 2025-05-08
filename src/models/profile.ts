import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { permission, permissionId } from './permission';
import type { profile_permission, profile_permissionId } from './profile_permission';
import type { users, usersId } from './users';

export interface profileAttributes {
  id: number;
  name: string;
  description?: string;
}

export type profilePk = "id";
export type profileId = profile[profilePk];
export type profileOptionalAttributes = "id" | "description";
export type profileCreationAttributes = Optional<profileAttributes, profileOptionalAttributes>;

export class profile extends Model<profileAttributes, profileCreationAttributes> implements profileAttributes {
  id!: number;
  name!: string;
  description?: string;

  // profile belongsToMany permission via profile_id and permission_id
  permission_id_permissions!: permission[];
  getPermission_id_permissions!: Sequelize.BelongsToManyGetAssociationsMixin<permission>;
  setPermission_id_permissions!: Sequelize.BelongsToManySetAssociationsMixin<permission, permissionId>;
  addPermission_id_permission!: Sequelize.BelongsToManyAddAssociationMixin<permission, permissionId>;
  addPermission_id_permissions!: Sequelize.BelongsToManyAddAssociationsMixin<permission, permissionId>;
  createPermission_id_permission!: Sequelize.BelongsToManyCreateAssociationMixin<permission>;
  removePermission_id_permission!: Sequelize.BelongsToManyRemoveAssociationMixin<permission, permissionId>;
  removePermission_id_permissions!: Sequelize.BelongsToManyRemoveAssociationsMixin<permission, permissionId>;
  hasPermission_id_permission!: Sequelize.BelongsToManyHasAssociationMixin<permission, permissionId>;
  hasPermission_id_permissions!: Sequelize.BelongsToManyHasAssociationsMixin<permission, permissionId>;
  countPermission_id_permissions!: Sequelize.BelongsToManyCountAssociationsMixin;
  // profile hasMany profile_permission via profile_id
  profile_permissions!: profile_permission[];
  getProfile_permissions!: Sequelize.HasManyGetAssociationsMixin<profile_permission>;
  setProfile_permissions!: Sequelize.HasManySetAssociationsMixin<profile_permission, profile_permissionId>;
  addProfile_permission!: Sequelize.HasManyAddAssociationMixin<profile_permission, profile_permissionId>;
  addProfile_permissions!: Sequelize.HasManyAddAssociationsMixin<profile_permission, profile_permissionId>;
  createProfile_permission!: Sequelize.HasManyCreateAssociationMixin<profile_permission>;
  removeProfile_permission!: Sequelize.HasManyRemoveAssociationMixin<profile_permission, profile_permissionId>;
  removeProfile_permissions!: Sequelize.HasManyRemoveAssociationsMixin<profile_permission, profile_permissionId>;
  hasProfile_permission!: Sequelize.HasManyHasAssociationMixin<profile_permission, profile_permissionId>;
  hasProfile_permissions!: Sequelize.HasManyHasAssociationsMixin<profile_permission, profile_permissionId>;
  countProfile_permissions!: Sequelize.HasManyCountAssociationsMixin;
  // profile hasMany users via profile_id
  users!: users[];
  getUsers!: Sequelize.HasManyGetAssociationsMixin<users>;
  setUsers!: Sequelize.HasManySetAssociationsMixin<users, usersId>;
  addUser!: Sequelize.HasManyAddAssociationMixin<users, usersId>;
  addUsers!: Sequelize.HasManyAddAssociationsMixin<users, usersId>;
  createUser!: Sequelize.HasManyCreateAssociationMixin<users>;
  removeUser!: Sequelize.HasManyRemoveAssociationMixin<users, usersId>;
  removeUsers!: Sequelize.HasManyRemoveAssociationsMixin<users, usersId>;
  hasUser!: Sequelize.HasManyHasAssociationMixin<users, usersId>;
  hasUsers!: Sequelize.HasManyHasAssociationsMixin<users, usersId>;
  countUsers!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof profile {
    return sequelize.define('profile', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'profile',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "profile_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  }) as typeof profile;
  }
}
