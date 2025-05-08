import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { inventory_entry, inventory_entryId } from './inventory_entry';
import type { orders, ordersId } from './orders';
import type { users, usersId } from './users';

export interface expensesAttributes {
  id: string;
  user_id: string;
  amount: number;
  category: string;
  description?: string;
  date?: Date;
  order_id?: string;
  inventory_entry_id?: string;
}

export type expensesPk = "id";
export type expensesId = expenses[expensesPk];
export type expensesOptionalAttributes = "id" | "description" | "date" | "order_id" | "inventory_entry_id";
export type expensesCreationAttributes = Optional<expensesAttributes, expensesOptionalAttributes>;

export class expenses extends Model<expensesAttributes, expensesCreationAttributes> implements expensesAttributes {
  id!: string;
  user_id!: string;
  amount!: number;
  category!: string;
  description?: string;
  date?: Date;
  order_id?: string;
  inventory_entry_id?: string;

  // expenses belongsTo inventory_entry via inventory_entry_id
  inventory_entry!: inventory_entry;
  getInventory_entry!: Sequelize.BelongsToGetAssociationMixin<inventory_entry>;
  setInventory_entry!: Sequelize.BelongsToSetAssociationMixin<inventory_entry, inventory_entryId>;
  createInventory_entry!: Sequelize.BelongsToCreateAssociationMixin<inventory_entry>;
  // expenses belongsTo orders via order_id
  order!: orders;
  getOrder!: Sequelize.BelongsToGetAssociationMixin<orders>;
  setOrder!: Sequelize.BelongsToSetAssociationMixin<orders, ordersId>;
  createOrder!: Sequelize.BelongsToCreateAssociationMixin<orders>;
  // expenses belongsTo users via user_id
  user!: users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof expenses {
    return sequelize.define('expenses', {
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
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    order_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'orders',
        key: 'id'
      }
    },
    inventory_entry_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'inventory_entry',
        key: 'id'
      }
    }
  }, {
    tableName: 'expenses',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "expenses_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "idx_expenses_user_id",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  }) as typeof expenses;
  }
}
