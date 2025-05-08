import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface couponsAttributes {
  id: string;
  alias: string;
  terms?: string;
  type: string;
  value: number;
  duration?: Date;
}

export type couponsPk = "id";
export type couponsId = coupons[couponsPk];
export type couponsOptionalAttributes = "id" | "terms" | "duration";
export type couponsCreationAttributes = Optional<couponsAttributes, couponsOptionalAttributes>;

export class coupons extends Model<couponsAttributes, couponsCreationAttributes> implements couponsAttributes {
  id!: string;
  alias!: string;
  terms?: string;
  type!: string;
  value!: number;
  duration?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof coupons {
    return sequelize.define('coupons', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('public.gen_random_uuid'),
      primaryKey: true
    },
    alias: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "coupons_alias_key"
    },
    terms: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    value: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    duration: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'coupons',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "coupons_alias_key",
        unique: true,
        fields: [
          { name: "alias" },
        ]
      },
      {
        name: "coupons_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  }) as typeof coupons;
  }
}
