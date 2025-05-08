import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface flyway_schema_historyAttributes {
  installed_rank: number;
  version?: string;
  description: string;
  type: string;
  script: string;
  checksum?: number;
  installed_by: string;
  installed_on: Date;
  execution_time: number;
  success: boolean;
}

export type flyway_schema_historyPk = "installed_rank";
export type flyway_schema_historyId = flyway_schema_history[flyway_schema_historyPk];
export type flyway_schema_historyOptionalAttributes = "version" | "checksum" | "installed_on";
export type flyway_schema_historyCreationAttributes = Optional<flyway_schema_historyAttributes, flyway_schema_historyOptionalAttributes>;

export class flyway_schema_history extends Model<flyway_schema_historyAttributes, flyway_schema_historyCreationAttributes> implements flyway_schema_historyAttributes {
  installed_rank!: number;
  version?: string;
  description!: string;
  type!: string;
  script!: string;
  checksum?: number;
  installed_by!: string;
  installed_on!: Date;
  execution_time!: number;
  success!: boolean;


  static initModel(sequelize: Sequelize.Sequelize): typeof flyway_schema_history {
    return sequelize.define('flyway_schema_history', {
    installed_rank: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    version: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    type: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    script: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    checksum: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    installed_by: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    installed_on: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('now')
    },
    execution_time: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    success: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    tableName: 'flyway_schema_history',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "flyway_schema_history_pk",
        unique: true,
        fields: [
          { name: "installed_rank" },
        ]
      },
      {
        name: "flyway_schema_history_s_idx",
        fields: [
          { name: "success" },
        ]
      },
    ]
  }) as typeof flyway_schema_history;
  }
}
