// type ModelNews = {
//   id: string;
//   title: string;
//   source: string;
//   url: string;
//   publishedAt: string;
//   originalText: string;
//   happyText: string;
//   sadText: string;
//   neutralText: string;
//   ironicText: string;
// };

import { DataTypes } from "sequelize";
import sequelize from "./sequelize";

const NewsModel = sequelize.define("News", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  source: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  publishedAt: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  originalText: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  happyText: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  sadText: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  neutralText: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  ironicText: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

export default NewsModel;
