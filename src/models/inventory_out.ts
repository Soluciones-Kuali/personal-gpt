import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { products, productsId } from './products';
import type { users, usersId } from './users';

export interface inventory_outAttributes {
  id: string;
  product_id: string;
  user_id: string;
  quantity: number;
  date?: Date;
  notes?: string;
  out_reason?: string;
}

export type inventory_outPk = "id";
export type inventory_outId = inventory_out[inventory_outPk];
export type inventory_outOptionalAttributes = "id" | "date" | "notes" | "out_reason";
export type inventory_outCreationAttributes = Optional<inventory_outAttributes, inventory_outOptionalAttributes>;

export class inventory_out extends Model<inventory_outAttributes, inventory_outCreationAttributes> implements inventory_outAttributes {
  id!: string;
  product_id!: string;
  user_id!: string;
  quantity!: number;
  date?: Date;
  notes?: string;
  out_reason?: string;

  // inventory_out belongsTo products via product_id
  product!: products;
  getProduct!: Sequelize.BelongsToGetAssociationMixin<products>;
  setProduct!: Sequelize.BelongsToSetAssociationMixin<products, productsId>;
  createProduct!: Sequelize.BelongsToCreateAssociationMixin<products>;
  // inventory_out belongsTo users via user_id
  user!: users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof inventory_out {
    return sequelize.define('inventory_out', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('public.gen_random_uuid'),
      primaryKey: true
    },
    product_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    quantity: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    out_reason: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'inventory_out',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "idx_inventory_out_product",
        fields: [
          { name: "product_id" },
        ]
      },
      {
        name: "inventory_out_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  }) as typeof inventory_out;
  }
}
