import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { permission, permissionId } from './permission';

export interface permission_typeAttributes {
  id: number;
  name: string;
}

export type permission_typePk = "id";
export type permission_typeId = permission_type[permission_typePk];
export type permission_typeOptionalAttributes = "id";
export type permission_typeCreationAttributes = Optional<permission_typeAttributes, permission_typeOptionalAttributes>;

export class permission_type extends Model<permission_typeAttributes, permission_typeCreationAttributes> implements permission_typeAttributes {
  id!: number;
  name!: string;

  // permission_type hasMany permission via permission_type_id
  permissions!: permission[];
  getPermissions!: Sequelize.HasManyGetAssociationsMixin<permission>;
  setPermissions!: Sequelize.HasManySetAssociationsMixin<permission, permissionId>;
  addPermission!: Sequelize.HasManyAddAssociationMixin<permission, permissionId>;
  addPermissions!: Sequelize.HasManyAddAssociationsMixin<permission, permissionId>;
  createPermission!: Sequelize.HasManyCreateAssociationMixin<permission>;
  removePermission!: Sequelize.HasManyRemoveAssociationMixin<permission, permissionId>;
  removePermissions!: Sequelize.HasManyRemoveAssociationsMixin<permission, permissionId>;
  hasPermission!: Sequelize.HasManyHasAssociationMixin<permission, permissionId>;
  hasPermissions!: Sequelize.HasManyHasAssociationsMixin<permission, permissionId>;
  countPermissions!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof permission_type {
    return sequelize.define('permission_type', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false
    }
  }, {
    tableName: 'permission_type',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "permission_type_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  }) as typeof permission_type;
  }
}
