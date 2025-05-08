import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { categories, categoriesId } from './categories';
import type { inventory_entry, inventory_entryId } from './inventory_entry';
import type { inventory_out, inventory_outId } from './inventory_out';
import type { order_items, order_itemsId } from './order_items';
import type { product_providers, product_providersId } from './product_providers';

export interface productsAttributes {
  id: string;
  category_id?: string;
  sell_price: number;
  buy_price: number;
  name: string;
  notes?: string;
  unit?: string;
  stock?: number;
  image_url?: string;
  enabled?: boolean;
  approx_unit_weight?: number;
  min_amount?: number;
  sale_buy_price?: number;
}

export type productsPk = "id";
export type productsId = products[productsPk];
export type productsOptionalAttributes = "id" | "category_id" | "notes" | "unit" | "stock" | "image_url" | "enabled" | "approx_unit_weight" | "min_amount" | "sale_buy_price";
export type productsCreationAttributes = Optional<productsAttributes, productsOptionalAttributes>;

export class products extends Model<productsAttributes, productsCreationAttributes> implements productsAttributes {
  id!: string;
  category_id?: string;
  sell_price!: number;
  buy_price!: number;
  name!: string;
  notes?: string;
  unit?: string;
  stock?: number;
  image_url?: string;
  enabled?: boolean;
  approx_unit_weight?: number;
  min_amount?: number;
  sale_buy_price?: number;

  // products belongsTo categories via category_id
  category!: categories;
  getCategory!: Sequelize.BelongsToGetAssociationMixin<categories>;
  setCategory!: Sequelize.BelongsToSetAssociationMixin<categories, categoriesId>;
  createCategory!: Sequelize.BelongsToCreateAssociationMixin<categories>;
  // products hasMany inventory_entry via product_id
  inventory_entries!: inventory_entry[];
  getInventory_entries!: Sequelize.HasManyGetAssociationsMixin<inventory_entry>;
  setInventory_entries!: Sequelize.HasManySetAssociationsMixin<inventory_entry, inventory_entryId>;
  addInventory_entry!: Sequelize.HasManyAddAssociationMixin<inventory_entry, inventory_entryId>;
  addInventory_entries!: Sequelize.HasManyAddAssociationsMixin<inventory_entry, inventory_entryId>;
  createInventory_entry!: Sequelize.HasManyCreateAssociationMixin<inventory_entry>;
  removeInventory_entry!: Sequelize.HasManyRemoveAssociationMixin<inventory_entry, inventory_entryId>;
  removeInventory_entries!: Sequelize.HasManyRemoveAssociationsMixin<inventory_entry, inventory_entryId>;
  hasInventory_entry!: Sequelize.HasManyHasAssociationMixin<inventory_entry, inventory_entryId>;
  hasInventory_entries!: Sequelize.HasManyHasAssociationsMixin<inventory_entry, inventory_entryId>;
  countInventory_entries!: Sequelize.HasManyCountAssociationsMixin;
  // products hasMany inventory_out via product_id
  inventory_outs!: inventory_out[];
  getInventory_outs!: Sequelize.HasManyGetAssociationsMixin<inventory_out>;
  setInventory_outs!: Sequelize.HasManySetAssociationsMixin<inventory_out, inventory_outId>;
  addInventory_out!: Sequelize.HasManyAddAssociationMixin<inventory_out, inventory_outId>;
  addInventory_outs!: Sequelize.HasManyAddAssociationsMixin<inventory_out, inventory_outId>;
  createInventory_out!: Sequelize.HasManyCreateAssociationMixin<inventory_out>;
  removeInventory_out!: Sequelize.HasManyRemoveAssociationMixin<inventory_out, inventory_outId>;
  removeInventory_outs!: Sequelize.HasManyRemoveAssociationsMixin<inventory_out, inventory_outId>;
  hasInventory_out!: Sequelize.HasManyHasAssociationMixin<inventory_out, inventory_outId>;
  hasInventory_outs!: Sequelize.HasManyHasAssociationsMixin<inventory_out, inventory_outId>;
  countInventory_outs!: Sequelize.HasManyCountAssociationsMixin;
  // products hasMany order_items via product_id
  order_items!: order_items[];
  getOrder_items!: Sequelize.HasManyGetAssociationsMixin<order_items>;
  setOrder_items!: Sequelize.HasManySetAssociationsMixin<order_items, order_itemsId>;
  addOrder_item!: Sequelize.HasManyAddAssociationMixin<order_items, order_itemsId>;
  addOrder_items!: Sequelize.HasManyAddAssociationsMixin<order_items, order_itemsId>;
  createOrder_item!: Sequelize.HasManyCreateAssociationMixin<order_items>;
  removeOrder_item!: Sequelize.HasManyRemoveAssociationMixin<order_items, order_itemsId>;
  removeOrder_items!: Sequelize.HasManyRemoveAssociationsMixin<order_items, order_itemsId>;
  hasOrder_item!: Sequelize.HasManyHasAssociationMixin<order_items, order_itemsId>;
  hasOrder_items!: Sequelize.HasManyHasAssociationsMixin<order_items, order_itemsId>;
  countOrder_items!: Sequelize.HasManyCountAssociationsMixin;
  // products hasMany product_providers via product_id
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

  static initModel(sequelize: Sequelize.Sequelize): typeof products {
    return sequelize.define('products', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('public.gen_random_uuid'),
      primaryKey: true
    },
    category_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'categories',
        key: 'id'
      }
    },
    sell_price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    buy_price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    unit: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    stock: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0
    },
    image_url: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    approx_unit_weight: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    min_amount: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    sale_buy_price: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    tableName: 'products',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "idx_products_category",
        fields: [
          { name: "category_id" },
        ]
      },
      {
        name: "products_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  }) as typeof products;
  }
}
