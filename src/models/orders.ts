import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { expenses, expensesId } from './expenses';
import type { order_items, order_itemsId } from './order_items';
import type { users, usersId } from './users';

export interface ordersAttributes {
  id: string;
  user_id: string;
  total: number;
  approx_total?: number;
  payment_form: string;
  draft?: boolean;
  made_in_home?: boolean;
  created_at?: Date;
  cost?: number;
}

export type ordersPk = "id";
export type ordersId = orders[ordersPk];
export type ordersOptionalAttributes = "id" | "approx_total" | "draft" | "made_in_home" | "created_at" | "cost";
export type ordersCreationAttributes = Optional<ordersAttributes, ordersOptionalAttributes>;

export class orders extends Model<ordersAttributes, ordersCreationAttributes> implements ordersAttributes {
  id!: string;
  user_id!: string;
  total!: number;
  approx_total?: number;
  payment_form!: string;
  draft?: boolean;
  made_in_home?: boolean;
  created_at?: Date;
  cost?: number;

  // orders hasMany expenses via order_id
  expenses!: expenses[];
  getExpenses!: Sequelize.HasManyGetAssociationsMixin<expenses>;
  setExpenses!: Sequelize.HasManySetAssociationsMixin<expenses, expensesId>;
  addExpense!: Sequelize.HasManyAddAssociationMixin<expenses, expensesId>;
  addExpenses!: Sequelize.HasManyAddAssociationsMixin<expenses, expensesId>;
  createExpense!: Sequelize.HasManyCreateAssociationMixin<expenses>;
  removeExpense!: Sequelize.HasManyRemoveAssociationMixin<expenses, expensesId>;
  removeExpenses!: Sequelize.HasManyRemoveAssociationsMixin<expenses, expensesId>;
  hasExpense!: Sequelize.HasManyHasAssociationMixin<expenses, expensesId>;
  hasExpenses!: Sequelize.HasManyHasAssociationsMixin<expenses, expensesId>;
  countExpenses!: Sequelize.HasManyCountAssociationsMixin;
  // orders hasMany order_items via order_id
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
  // orders belongsTo users via user_id
  user!: users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof orders {
    return sequelize.define('orders', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('public.gen_random_uuid'),
      primaryKey: true
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    total: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    approx_total: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    payment_form: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    draft: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    made_in_home: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    cost: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    tableName: 'orders',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "idx_orders_user_id",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "orders_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  }) as typeof orders;
  }
}
