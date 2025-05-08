import type { Sequelize } from "sequelize";
import { categories as _categories } from "./categories";
import type { categoriesAttributes, categoriesCreationAttributes } from "./categories";
import { coupons as _coupons } from "./coupons";
import type { couponsAttributes, couponsCreationAttributes } from "./coupons";
import { expenses as _expenses } from "./expenses";
import type { expensesAttributes, expensesCreationAttributes } from "./expenses";
import { flyway_schema_history as _flyway_schema_history } from "./flyway_schema_history";
import type { flyway_schema_historyAttributes, flyway_schema_historyCreationAttributes } from "./flyway_schema_history";
import { inventory_entry as _inventory_entry } from "./inventory_entry";
import type { inventory_entryAttributes, inventory_entryCreationAttributes } from "./inventory_entry";
import { inventory_out as _inventory_out } from "./inventory_out";
import type { inventory_outAttributes, inventory_outCreationAttributes } from "./inventory_out";
import { order_items as _order_items } from "./order_items";
import type { order_itemsAttributes, order_itemsCreationAttributes } from "./order_items";
import { orders as _orders } from "./orders";
import type { ordersAttributes, ordersCreationAttributes } from "./orders";
import { permission as _permission } from "./permission";
import type { permissionAttributes, permissionCreationAttributes } from "./permission";
import { permission_type as _permission_type } from "./permission_type";
import type { permission_typeAttributes, permission_typeCreationAttributes } from "./permission_type";
import { product_providers as _product_providers } from "./product_providers";
import type { product_providersAttributes, product_providersCreationAttributes } from "./product_providers";
import { products as _products } from "./products";
import type { productsAttributes, productsCreationAttributes } from "./products";
import { profile as _profile } from "./profile";
import type { profileAttributes, profileCreationAttributes } from "./profile";
import { profile_permission as _profile_permission } from "./profile_permission";
import type { profile_permissionAttributes, profile_permissionCreationAttributes } from "./profile_permission";
import { providers as _providers } from "./providers";
import type { providersAttributes, providersCreationAttributes } from "./providers";
import { section as _section } from "./section";
import type { sectionAttributes, sectionCreationAttributes } from "./section";
import { settings as _settings } from "./settings";
import type { settingsAttributes, settingsCreationAttributes } from "./settings";
import { subsection as _subsection } from "./subsection";
import type { subsectionAttributes, subsectionCreationAttributes } from "./subsection";
import { user_permission as _user_permission } from "./user_permission";
import type { user_permissionAttributes, user_permissionCreationAttributes } from "./user_permission";
import { users as _users } from "./users";
import type { usersAttributes, usersCreationAttributes } from "./users";

export {
  _categories as categories,
  _coupons as coupons,
  _expenses as expenses,
  _flyway_schema_history as flyway_schema_history,
  _inventory_entry as inventory_entry,
  _inventory_out as inventory_out,
  _order_items as order_items,
  _orders as orders,
  _permission as permission,
  _permission_type as permission_type,
  _product_providers as product_providers,
  _products as products,
  _profile as profile,
  _profile_permission as profile_permission,
  _providers as providers,
  _section as section,
  _settings as settings,
  _subsection as subsection,
  _user_permission as user_permission,
  _users as users,
};

export type {
  categoriesAttributes,
  categoriesCreationAttributes,
  couponsAttributes,
  couponsCreationAttributes,
  expensesAttributes,
  expensesCreationAttributes,
  flyway_schema_historyAttributes,
  flyway_schema_historyCreationAttributes,
  inventory_entryAttributes,
  inventory_entryCreationAttributes,
  inventory_outAttributes,
  inventory_outCreationAttributes,
  order_itemsAttributes,
  order_itemsCreationAttributes,
  ordersAttributes,
  ordersCreationAttributes,
  permissionAttributes,
  permissionCreationAttributes,
  permission_typeAttributes,
  permission_typeCreationAttributes,
  product_providersAttributes,
  product_providersCreationAttributes,
  productsAttributes,
  productsCreationAttributes,
  profileAttributes,
  profileCreationAttributes,
  profile_permissionAttributes,
  profile_permissionCreationAttributes,
  providersAttributes,
  providersCreationAttributes,
  sectionAttributes,
  sectionCreationAttributes,
  settingsAttributes,
  settingsCreationAttributes,
  subsectionAttributes,
  subsectionCreationAttributes,
  user_permissionAttributes,
  user_permissionCreationAttributes,
  usersAttributes,
  usersCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const categories = _categories.initModel(sequelize);
  const coupons = _coupons.initModel(sequelize);
  const expenses = _expenses.initModel(sequelize);
  const flyway_schema_history = _flyway_schema_history.initModel(sequelize);
  const inventory_entry = _inventory_entry.initModel(sequelize);
  const inventory_out = _inventory_out.initModel(sequelize);
  const order_items = _order_items.initModel(sequelize);
  const orders = _orders.initModel(sequelize);
  const permission = _permission.initModel(sequelize);
  const permission_type = _permission_type.initModel(sequelize);
  const product_providers = _product_providers.initModel(sequelize);
  const products = _products.initModel(sequelize);
  const profile = _profile.initModel(sequelize);
  const profile_permission = _profile_permission.initModel(sequelize);
  const providers = _providers.initModel(sequelize);
  const section = _section.initModel(sequelize);
  const settings = _settings.initModel(sequelize);
  const subsection = _subsection.initModel(sequelize);
  const user_permission = _user_permission.initModel(sequelize);
  const users = _users.initModel(sequelize);

  permission.belongsToMany(profile, { as: 'profile_id_profiles', through: profile_permission, foreignKey: "permission_id", otherKey: "profile_id" });
  permission.belongsToMany(users, { as: 'user_id_users', through: user_permission, foreignKey: "permission_id", otherKey: "user_id" });
  profile.belongsToMany(permission, { as: 'permission_id_permissions', through: profile_permission, foreignKey: "profile_id", otherKey: "permission_id" });
  users.belongsToMany(permission, { as: 'permission_id_permission_user_permissions', through: user_permission, foreignKey: "user_id", otherKey: "permission_id" });
  categories.belongsTo(categories, { as: "parent_category", foreignKey: "parent_category_id"});
  categories.hasMany(categories, { as: "categories", foreignKey: "parent_category_id"});
  products.belongsTo(categories, { as: "category", foreignKey: "category_id"});
  categories.hasMany(products, { as: "products", foreignKey: "category_id"});
  expenses.belongsTo(inventory_entry, { as: "inventory_entry", foreignKey: "inventory_entry_id"});
  inventory_entry.hasMany(expenses, { as: "expenses", foreignKey: "inventory_entry_id"});
  expenses.belongsTo(orders, { as: "order", foreignKey: "order_id"});
  orders.hasMany(expenses, { as: "expenses", foreignKey: "order_id"});
  order_items.belongsTo(orders, { as: "order", foreignKey: "order_id"});
  orders.hasMany(order_items, { as: "order_items", foreignKey: "order_id"});
  profile_permission.belongsTo(permission, { as: "permission", foreignKey: "permission_id"});
  permission.hasMany(profile_permission, { as: "profile_permissions", foreignKey: "permission_id"});
  user_permission.belongsTo(permission, { as: "permission", foreignKey: "permission_id"});
  permission.hasMany(user_permission, { as: "user_permissions", foreignKey: "permission_id"});
  permission.belongsTo(permission_type, { as: "permission_type", foreignKey: "permission_type_id"});
  permission_type.hasMany(permission, { as: "permissions", foreignKey: "permission_type_id"});
  inventory_entry.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(inventory_entry, { as: "inventory_entries", foreignKey: "product_id"});
  inventory_out.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(inventory_out, { as: "inventory_outs", foreignKey: "product_id"});
  order_items.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(order_items, { as: "order_items", foreignKey: "product_id"});
  product_providers.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(product_providers, { as: "product_providers", foreignKey: "product_id"});
  profile_permission.belongsTo(profile, { as: "profile", foreignKey: "profile_id"});
  profile.hasMany(profile_permission, { as: "profile_permissions", foreignKey: "profile_id"});
  users.belongsTo(profile, { as: "profile", foreignKey: "profile_id"});
  profile.hasMany(users, { as: "users", foreignKey: "profile_id"});
  product_providers.belongsTo(providers, { as: "provider", foreignKey: "provider_id"});
  providers.hasMany(product_providers, { as: "product_providers", foreignKey: "provider_id"});
  permission.belongsTo(section, { as: "section", foreignKey: "section_id"});
  section.hasMany(permission, { as: "permissions", foreignKey: "section_id"});
  permission.belongsTo(subsection, { as: "subsection", foreignKey: "subsection_id"});
  subsection.hasMany(permission, { as: "permissions", foreignKey: "subsection_id"});
  expenses.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(expenses, { as: "expenses", foreignKey: "user_id"});
  inventory_entry.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(inventory_entry, { as: "inventory_entries", foreignKey: "user_id"});
  inventory_out.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(inventory_out, { as: "inventory_outs", foreignKey: "user_id"});
  orders.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(orders, { as: "orders", foreignKey: "user_id"});
  settings.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(settings, { as: "settings", foreignKey: "user_id"});
  user_permission.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(user_permission, { as: "user_permissions", foreignKey: "user_id"});

  return {
    categories: categories,
    coupons: coupons,
    expenses: expenses,
    flyway_schema_history: flyway_schema_history,
    inventory_entry: inventory_entry,
    inventory_out: inventory_out,
    order_items: order_items,
    orders: orders,
    permission: permission,
    permission_type: permission_type,
    product_providers: product_providers,
    products: products,
    profile: profile,
    profile_permission: profile_permission,
    providers: providers,
    section: section,
    settings: settings,
    subsection: subsection,
    user_permission: user_permission,
    users: users,
  };
}
