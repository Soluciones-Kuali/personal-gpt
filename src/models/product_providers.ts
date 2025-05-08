import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { products, productsId } from './products';
import type { providers, providersId } from './providers';

export interface product_providersAttributes {
  id: string;
  provider_id: string;
  product_id: string;
  current_price: number;
}

export type product_providersPk = "id";
export type product_providersId = product_providers[product_providersPk];
export type product_providersOptionalAttributes = "id";
export type product_providersCreationAttributes = Optional<product_providersAttributes, product_providersOptionalAttributes>;

export class product_providers extends Model<product_providersAttributes, product_providersCreationAttributes> implements product_providersAttributes {
  id!: string;
  provider_id!: string;
  product_id!: string;
  current_price!: number;

  // product_providers belongsTo products via product_id
  product!: products;
  getProduct!: Sequelize.BelongsToGetAssociationMixin<products>;
  setProduct!: Sequelize.BelongsToSetAssociationMixin<products, productsId>;
  createProduct!: Sequelize.BelongsToCreateAssociationMixin<products>;
  // product_providers belongsTo providers via provider_id
  provider!: providers;
  getProvider!: Sequelize.BelongsToGetAssociationMixin<providers>;
  setProvider!: Sequelize.BelongsToSetAssociationMixin<providers, providersId>;
  createProvider!: Sequelize.BelongsToCreateAssociationMixin<providers>;

  static initModel(sequelize: Sequelize.Sequelize): typeof product_providers {
    return sequelize.define('product_providers', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('public.gen_random_uuid'),
      primaryKey: true
    },
    provider_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'providers',
        key: 'id'
      }
    },
    product_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id'
      }
    },
    current_price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  }, {
    tableName: 'product_providers',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "idx_product_providers_product",
        fields: [
          { name: "product_id" },
        ]
      },
      {
        name: "product_providers_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  }) as typeof product_providers;
  }
}
