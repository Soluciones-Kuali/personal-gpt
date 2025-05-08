import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { permission_type, permission_typeId } from './permission_type';
import type { profile, profileId } from './profile';
import type { profile_permission, profile_permissionId } from './profile_permission';
import type { section, sectionId } from './section';
import type { subsection, subsectionId } from './subsection';
import type { user_permission, user_permissionId } from './user_permission';
import type { users, usersId } from './users';

export interface permissionAttributes {
  id: number;
  description?: string;
  section_id?: number;
  permission_type_id?: number;
  subsection_id?: number;
}

export type permissionPk = "id";
export type permissionId = permission[permissionPk];
export type permissionOptionalAttributes = "id" | "description" | "section_id" | "permission_type_id" | "subsection_id";
export type permissionCreationAttributes = Optional<permissionAttributes, permissionOptionalAttributes>;

export class permission extends Model<permissionAttributes, permissionCreationAttributes> implements permissionAttributes {
  id!: number;
  description?: string;
  section_id?: number;
  permission_type_id?: number;
  subsection_id?: number;

  // permission belongsToMany profile via permission_id and profile_id
  profile_id_profiles!: profile[];
  getProfile_id_profiles!: Sequelize.BelongsToManyGetAssociationsMixin<profile>;
  setProfile_id_profiles!: Sequelize.BelongsToManySetAssociationsMixin<profile, profileId>;
  addProfile_id_profile!: Sequelize.BelongsToManyAddAssociationMixin<profile, profileId>;
  addProfile_id_profiles!: Sequelize.BelongsToManyAddAssociationsMixin<profile, profileId>;
  createProfile_id_profile!: Sequelize.BelongsToManyCreateAssociationMixin<profile>;
  removeProfile_id_profile!: Sequelize.BelongsToManyRemoveAssociationMixin<profile, profileId>;
  removeProfile_id_profiles!: Sequelize.BelongsToManyRemoveAssociationsMixin<profile, profileId>;
  hasProfile_id_profile!: Sequelize.BelongsToManyHasAssociationMixin<profile, profileId>;
  hasProfile_id_profiles!: Sequelize.BelongsToManyHasAssociationsMixin<profile, profileId>;
  countProfile_id_profiles!: Sequelize.BelongsToManyCountAssociationsMixin;
  // permission hasMany profile_permission via permission_id
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
  // permission hasMany user_permission via permission_id
  user_permissions!: user_permission[];
  getUser_permissions!: Sequelize.HasManyGetAssociationsMixin<user_permission>;
  setUser_permissions!: Sequelize.HasManySetAssociationsMixin<user_permission, user_permissionId>;
  addUser_permission!: Sequelize.HasManyAddAssociationMixin<user_permission, user_permissionId>;
  addUser_permissions!: Sequelize.HasManyAddAssociationsMixin<user_permission, user_permissionId>;
  createUser_permission!: Sequelize.HasManyCreateAssociationMixin<user_permission>;
  removeUser_permission!: Sequelize.HasManyRemoveAssociationMixin<user_permission, user_permissionId>;
  removeUser_permissions!: Sequelize.HasManyRemoveAssociationsMixin<user_permission, user_permissionId>;
  hasUser_permission!: Sequelize.HasManyHasAssociationMixin<user_permission, user_permissionId>;
  hasUser_permissions!: Sequelize.HasManyHasAssociationsMixin<user_permission, user_permissionId>;
  countUser_permissions!: Sequelize.HasManyCountAssociationsMixin;
  // permission belongsToMany users via permission_id and user_id
  user_id_users!: users[];
  getUser_id_users!: Sequelize.BelongsToManyGetAssociationsMixin<users>;
  setUser_id_users!: Sequelize.BelongsToManySetAssociationsMixin<users, usersId>;
  addUser_id_user!: Sequelize.BelongsToManyAddAssociationMixin<users, usersId>;
  addUser_id_users!: Sequelize.BelongsToManyAddAssociationsMixin<users, usersId>;
  createUser_id_user!: Sequelize.BelongsToManyCreateAssociationMixin<users>;
  removeUser_id_user!: Sequelize.BelongsToManyRemoveAssociationMixin<users, usersId>;
  removeUser_id_users!: Sequelize.BelongsToManyRemoveAssociationsMixin<users, usersId>;
  hasUser_id_user!: Sequelize.BelongsToManyHasAssociationMixin<users, usersId>;
  hasUser_id_users!: Sequelize.BelongsToManyHasAssociationsMixin<users, usersId>;
  countUser_id_users!: Sequelize.BelongsToManyCountAssociationsMixin;
  // permission belongsTo permission_type via permission_type_id
  permission_type!: permission_type;
  getPermission_type!: Sequelize.BelongsToGetAssociationMixin<permission_type>;
  setPermission_type!: Sequelize.BelongsToSetAssociationMixin<permission_type, permission_typeId>;
  createPermission_type!: Sequelize.BelongsToCreateAssociationMixin<permission_type>;
  // permission belongsTo section via section_id
  section!: section;
  getSection!: Sequelize.BelongsToGetAssociationMixin<section>;
  setSection!: Sequelize.BelongsToSetAssociationMixin<section, sectionId>;
  createSection!: Sequelize.BelongsToCreateAssociationMixin<section>;
  // permission belongsTo subsection via subsection_id
  subsection!: subsection;
  getSubsection!: Sequelize.BelongsToGetAssociationMixin<subsection>;
  setSubsection!: Sequelize.BelongsToSetAssociationMixin<subsection, subsectionId>;
  createSubsection!: Sequelize.BelongsToCreateAssociationMixin<subsection>;

  static initModel(sequelize: Sequelize.Sequelize): typeof permission {
    return sequelize.define('permission', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    section_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'section',
        key: 'id'
      }
    },
    permission_type_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'permission_type',
        key: 'id'
      }
    },
    subsection_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'subsection',
        key: 'id'
      }
    }
  }, {
    tableName: 'permission',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "permission_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  }) as typeof permission;
  }
}
