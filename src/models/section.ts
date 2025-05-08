import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { permission, permissionId } from './permission';

export interface sectionAttributes {
  id: number;
  name: string;
  description?: string;
}

export type sectionPk = "id";
export type sectionId = section[sectionPk];
export type sectionOptionalAttributes = "id" | "description";
export type sectionCreationAttributes = Optional<sectionAttributes, sectionOptionalAttributes>;

export class section extends Model<sectionAttributes, sectionCreationAttributes> implements sectionAttributes {
  id!: number;
  name!: string;
  description?: string;

  // section hasMany permission via section_id
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

  static initModel(sequelize: Sequelize.Sequelize): typeof section {
    return sequelize.define('section', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'section',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "section_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  }) as typeof section;
  }
}
