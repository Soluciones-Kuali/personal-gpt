import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { expenses, expensesId } from './expenses';
import type { inventory_entry, inventory_entryId } from './inventory_entry';
import type { inventory_out, inventory_outId } from './inventory_out';
import type { orders, ordersId } from './orders';
import type { permission, permissionId } from './permission';
import type { profile, profileId } from './profile';
import type { settings, settingsId } from './settings';
import type { user_permission, user_permissionId } from './user_permission';

export interface usersAttributes {
  id: string;
  email: string;
  name: string;
  shop_name?: string;
  created_at?: Date;
  hashed_password?: string;
  profile_id?: number;
}

export type usersPk = "id";
export type usersId = users[usersPk];
export type usersOptionalAttributes = "id" | "shop_name" | "created_at" | "hashed_password" | "profile_id";
export type usersCreationAttributes = Optional<usersAttributes, usersOptionalAttributes>;

export class users extends Model<usersAttributes, usersCreationAttributes> implements usersAttributes {
  id!: string;
  email!: string;
  name!: string;
  shop_name?: string;
  created_at?: Date;
  hashed_password?: string;
  profile_id?: number;

  // users belongsTo profile via profile_id
  profile!: profile;
  getProfile!: Sequelize.BelongsToGetAssociationMixin<profile>;
  setProfile!: Sequelize.BelongsToSetAssociationMixin<profile, profileId>;
  createProfile!: Sequelize.BelongsToCreateAssociationMixin<profile>;
  // users hasMany expenses via user_id
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
  // users hasMany inventory_entry via user_id
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
  // users hasMany inventory_out via user_id
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
  // users hasMany orders via user_id
  orders!: orders[];
  getOrders!: Sequelize.HasManyGetAssociationsMixin<orders>;
  setOrders!: Sequelize.HasManySetAssociationsMixin<orders, ordersId>;
  addOrder!: Sequelize.HasManyAddAssociationMixin<orders, ordersId>;
  addOrders!: Sequelize.HasManyAddAssociationsMixin<orders, ordersId>;
  createOrder!: Sequelize.HasManyCreateAssociationMixin<orders>;
  removeOrder!: Sequelize.HasManyRemoveAssociationMixin<orders, ordersId>;
  removeOrders!: Sequelize.HasManyRemoveAssociationsMixin<orders, ordersId>;
  hasOrder!: Sequelize.HasManyHasAssociationMixin<orders, ordersId>;
  hasOrders!: Sequelize.HasManyHasAssociationsMixin<orders, ordersId>;
  countOrders!: Sequelize.HasManyCountAssociationsMixin;
  // users belongsToMany permission via user_id and permission_id
  permission_id_permission_user_permissions!: permission[];
  getPermission_id_permission_user_permissions!: Sequelize.BelongsToManyGetAssociationsMixin<permission>;
  setPermission_id_permission_user_permissions!: Sequelize.BelongsToManySetAssociationsMixin<permission, permissionId>;
  addPermission_id_permission_user_permission!: Sequelize.BelongsToManyAddAssociationMixin<permission, permissionId>;
  addPermission_id_permission_user_permissions!: Sequelize.BelongsToManyAddAssociationsMixin<permission, permissionId>;
  createPermission_id_permission_user_permission!: Sequelize.BelongsToManyCreateAssociationMixin<permission>;
  removePermission_id_permission_user_permission!: Sequelize.BelongsToManyRemoveAssociationMixin<permission, permissionId>;
  removePermission_id_permission_user_permissions!: Sequelize.BelongsToManyRemoveAssociationsMixin<permission, permissionId>;
  hasPermission_id_permission_user_permission!: Sequelize.BelongsToManyHasAssociationMixin<permission, permissionId>;
  hasPermission_id_permission_user_permissions!: Sequelize.BelongsToManyHasAssociationsMixin<permission, permissionId>;
  countPermission_id_permission_user_permissions!: Sequelize.BelongsToManyCountAssociationsMixin;
  // users hasMany settings via user_id
  settings!: settings[];
  getSettings!: Sequelize.HasManyGetAssociationsMixin<settings>;
  setSettings!: Sequelize.HasManySetAssociationsMixin<settings, settingsId>;
  addSetting!: Sequelize.HasManyAddAssociationMixin<settings, settingsId>;
  addSettings!: Sequelize.HasManyAddAssociationsMixin<settings, settingsId>;
  createSetting!: Sequelize.HasManyCreateAssociationMixin<settings>;
  removeSetting!: Sequelize.HasManyRemoveAssociationMixin<settings, settingsId>;
  removeSettings!: Sequelize.HasManyRemoveAssociationsMixin<settings, settingsId>;
  hasSetting!: Sequelize.HasManyHasAssociationMixin<settings, settingsId>;
  hasSettings!: Sequelize.HasManyHasAssociationsMixin<settings, settingsId>;
  countSettings!: Sequelize.HasManyCountAssociationsMixin;
  // users hasMany user_permission via user_id
  user_permissions!: user_permission[];
  getUser_permissions!: Sequelize.HasManyGetAssociationsMixin<user_permission>;
  setUser_permissions!: Sequelize.HasManySetAssociationsMixin<user_permission, user_permissionId>;
  addUser_permission!: Sequelize.HasManyAddAssociationMixin<user_permission, user_permissionId>;
  addUser_permissions!: Sequelize.HasManyAddAssociationsMixin<user_permission, user_permissionId>;
  createUser_permission!: Sequelize.HasManyCreateAssociationMixin<user_permission>;
  removeUser_permission!: Sequelize.HasManyRemoveAssociationMixin<user_permission, user_permissionId>;
  removeUser_permissions!: Sequelize.HasManyRemoveAssociationsMixin<user_permission, user_permissionId>;
  hasUser_permission!: Sequelize.HasManyHasAssociationMixin<user_permission, user_permissionId>;
  hasUser_permissions!: Sequelize.HasManyHasAssociationsMixin<user_permission, user_permissionId>;
  countUser_permissions!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof users {
    return sequelize.define('users', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('public.gen_random_uuid'),
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "users_email_key"
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    shop_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    hashed_password: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    profile_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'profile',
        key: 'id'
      }
    }
  }, {
    tableName: 'users',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "idx_users_email",
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "users_email_key",
        unique: true,
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "users_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  }) as typeof users;
  }
}
