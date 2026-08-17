import { Sequelize } from "sequelize";
const sequelize = new Sequelize({
  dialect: "sqlite", // диалект 
  storage: "./storage/news.sqlite", // прямой путь к базе 
  logging: false, 
});

export default sequelize;
