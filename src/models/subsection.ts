import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { permission, permissionId } from './permission';

export interface subsectionAttributes {
  id: number;
  name: string;
}

export type subsectionPk = "id";
export type subsectionId = subsection[subsectionPk];
export type subsectionOptionalAttributes = "id";
export type subsectionCreationAttributes = Optional<subsectionAttributes, subsectionOptionalAttributes>;

export class subsection extends Model<subsectionAttributes, subsectionCreationAttributes> implements subsectionAttributes {
  id!: number;
  name!: string;

  // subsection hasMany permission via subsection_id
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

  static initModel(sequelize: Sequelize.Sequelize): typeof subsection {
    return sequelize.define('subsection', {
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
    tableName: 'subsection',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "subsection_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  }) as typeof subsection;
  }
}
