import type { Sequelize } from "sequelize";
import { flyway_schema_history as _flyway_schema_history } from "./flyway_schema_history";
import type { flyway_schema_historyAttributes, flyway_schema_historyCreationAttributes } from "./flyway_schema_history";
import { user_prompts as _user_prompts } from "./user_prompts";
import type { user_promptsAttributes, user_promptsCreationAttributes } from "./user_prompts";
import { users as _users } from "./users";
import type { usersAttributes, usersCreationAttributes } from "./users";

export {
  _flyway_schema_history as flyway_schema_history,
  _user_prompts as user_prompts,
  _users as users,
};

export type {
  flyway_schema_historyAttributes,
  flyway_schema_historyCreationAttributes,
  user_promptsAttributes,
  user_promptsCreationAttributes,
  usersAttributes,
  usersCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const flyway_schema_history = _flyway_schema_history.initModel(sequelize);
  const user_prompts = _user_prompts.initModel(sequelize);
  const users = _users.initModel(sequelize);

  user_prompts.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(user_prompts, { as: "user_prompts", foreignKey: "user_id"});

  return {
    flyway_schema_history: flyway_schema_history,
    user_prompts: user_prompts,
    users: users,
  };
}
