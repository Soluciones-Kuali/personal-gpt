import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { expenses, expensesId } from './expenses';
import type { products, productsId } from './products';
import type { users, usersId } from './users';

export interface inventory_entryAttributes {
  id: string;
  product_id: string;
  user_id: string;
  quantity: number;
  cost_per_unit: number;
  total_cost?: number;
  date?: Date;
  notes?: string;
}

export type inventory_entryPk = "id";
export type inventory_entryId = inventory_entry[inventory_entryPk];
export type inventory_entryOptionalAttributes = "id" | "total_cost" | "date" | "notes";
export type inventory_entryCreationAttributes = Optional<inventory_entryAttributes, inventory_entryOptionalAttributes>;

export class inventory_entry extends Model<inventory_entryAttributes, inventory_entryCreationAttributes> implements inventory_entryAttributes {
  id!: string;
  product_id!: string;
  user_id!: string;
  quantity!: number;
  cost_per_unit!: number;
  total_cost?: number;
  date?: Date;
  notes?: string;

  // inventory_entry hasMany expenses via inventory_entry_id
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
  // inventory_entry belongsTo products via product_id
  product!: products;
  getProduct!: Sequelize.BelongsToGetAssociationMixin<products>;
  setProduct!: Sequelize.BelongsToSetAssociationMixin<products, productsId>;
  createProduct!: Sequelize.BelongsToCreateAssociationMixin<products>;
  // inventory_entry belongsTo users via user_id
  user!: users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof inventory_entry {
    return sequelize.define('inventory_entry', {
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
    cost_per_unit: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    total_cost: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'inventory_entry',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "idx_inventory_entry_product",
        fields: [
          { name: "product_id" },
        ]
      },
      {
        name: "inventory_entry_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  }) as typeof inventory_entry;
  }
}
