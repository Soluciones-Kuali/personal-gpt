import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { product_providers, product_providersId } from './product_providers';

export interface providersAttributes {
  id: string;
  alias: string;
  fullname?: string;
  email?: string;
  website?: string;
  image_url?: string;
}

export type providersPk = "id";
export type providersId = providers[providersPk];
export type providersOptionalAttributes = "id" | "fullname" | "email" | "website" | "image_url";
export type providersCreationAttributes = Optional<providersAttributes, providersOptionalAttributes>;

export class providers extends Model<providersAttributes, providersCreationAttributes> implements providersAttributes {
  id!: string;
  alias!: string;
  fullname?: string;
  email?: string;
  website?: string;
  image_url?: string;

  // providers hasMany product_providers via provider_id
  product_providers!: product_providers[];
  getProduct_providers!: Sequelize.HasManyGetAssociationsMixin<product_providers>;
  setProduct_providers!: Sequelize.HasManySetAssociationsMixin<product_providers, product_providersId>;
  addProduct_provider!: Sequelize.HasManyAddAssociationMixin<product_providers, product_providersId>;
  addProduct_providers!: Sequelize.HasManyAddAssociationsMixin<product_providers, product_providersId>;
  createProduct_provider!: Sequelize.HasManyCreateAssociationMixin<product_providers>;
  removeProduct_provider!: Sequelize.HasManyRemoveAssociationMixin<product_providers, product_providersId>;
  removeProduct_providers!: Sequelize.HasManyRemoveAssociationsMixin<product_providers, product_providersId>;
  hasProduct_provider!: Sequelize.HasManyHasAssociationMixin<product_providers, product_providersId>;
  hasProduct_providers!: Sequelize.HasManyHasAssociationsMixin<product_providers, product_providersId>;
  countProduct_providers!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof providers {
    return sequelize.define('providers', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('public.gen_random_uuid'),
      primaryKey: true
    },
    alias: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    fullname: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    website: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    image_url: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'providers',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "idx_providers_alias",
        fields: [
          { name: "alias" },
        ]
      },
      {
        name: "providers_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  }) as typeof providers;
  }
}
