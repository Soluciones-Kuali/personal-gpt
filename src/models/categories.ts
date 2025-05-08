import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { products, productsId } from './products';

export interface categoriesAttributes {
  id: string;
  name: string;
  description?: string;
  image_url?: string;
  parent_category_id?: string;
}

export type categoriesPk = "id";
export type categoriesId = categories[categoriesPk];
export type categoriesOptionalAttributes = "id" | "description" | "image_url" | "parent_category_id";
export type categoriesCreationAttributes = Optional<categoriesAttributes, categoriesOptionalAttributes>;

export class categories extends Model<categoriesAttributes, categoriesCreationAttributes> implements categoriesAttributes {
  id!: string;
  name!: string;
  description?: string;
  image_url?: string;
  parent_category_id?: string;

  // categories belongsTo categories via parent_category_id
  parent_category!: categories;
  getParent_category!: Sequelize.BelongsToGetAssociationMixin<categories>;
  setParent_category!: Sequelize.BelongsToSetAssociationMixin<categories, categoriesId>;
  createParent_category!: Sequelize.BelongsToCreateAssociationMixin<categories>;
  // categories hasMany products via category_id
  products!: products[];
  getProducts!: Sequelize.HasManyGetAssociationsMixin<products>;
  setProducts!: Sequelize.HasManySetAssociationsMixin<products, productsId>;
  addProduct!: Sequelize.HasManyAddAssociationMixin<products, productsId>;
  addProducts!: Sequelize.HasManyAddAssociationsMixin<products, productsId>;
  createProduct!: Sequelize.HasManyCreateAssociationMixin<products>;
  removeProduct!: Sequelize.HasManyRemoveAssociationMixin<products, productsId>;
  removeProducts!: Sequelize.HasManyRemoveAssociationsMixin<products, productsId>;
  hasProduct!: Sequelize.HasManyHasAssociationMixin<products, productsId>;
  hasProducts!: Sequelize.HasManyHasAssociationsMixin<products, productsId>;
  countProducts!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof categories {
    return sequelize.define('categories', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('public.gen_random_uuid'),
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "categories_name_key"
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    image_url: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    parent_category_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'categories',
        key: 'id'
      }
    }
  }, {
    tableName: 'categories',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "categories_name_key",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "categories_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "idx_categories_parent",
        fields: [
          { name: "parent_category_id" },
        ]
      },
    ]
  }) as typeof categories;
  }
}
