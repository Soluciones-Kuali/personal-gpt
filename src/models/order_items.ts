import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { orders, ordersId } from './orders';
import type { products, productsId } from './products';

export interface order_itemsAttributes {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price_snapshot: number;
  total_item_price?: number;
}

export type order_itemsPk = "id";
export type order_itemsId = order_items[order_itemsPk];
export type order_itemsOptionalAttributes = "id" | "total_item_price";
export type order_itemsCreationAttributes = Optional<order_itemsAttributes, order_itemsOptionalAttributes>;

export class order_items extends Model<order_itemsAttributes, order_itemsCreationAttributes> implements order_itemsAttributes {
  id!: string;
  order_id!: string;
  product_id!: string;
  quantity!: number;
  price_snapshot!: number;
  total_item_price?: number;

  // order_items belongsTo orders via order_id
  order!: orders;
  getOrder!: Sequelize.BelongsToGetAssociationMixin<orders>;
  setOrder!: Sequelize.BelongsToSetAssociationMixin<orders, ordersId>;
  createOrder!: Sequelize.BelongsToCreateAssociationMixin<orders>;
  // order_items belongsTo products via product_id
  product!: products;
  getProduct!: Sequelize.BelongsToGetAssociationMixin<products>;
  setProduct!: Sequelize.BelongsToSetAssociationMixin<products, productsId>;
  createProduct!: Sequelize.BelongsToCreateAssociationMixin<products>;

  static initModel(sequelize: Sequelize.Sequelize): typeof order_items {
    return sequelize.define('order_items', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('public.gen_random_uuid'),
      primaryKey: true
    },
    order_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'orders',
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
    quantity: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    price_snapshot: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    total_item_price: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    tableName: 'order_items',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "idx_order_items_order",
        fields: [
          { name: "order_id" },
        ]
      },
      {
        name: "order_items_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  }) as typeof order_items;
  }
}
