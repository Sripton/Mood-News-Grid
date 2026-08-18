import app from "./app.js";
import sequelize from "./db/sequelize.js";
import NewsModel from "./db/NewsModel.js";
const PORT = process.env.PORT;

const start = async () => {
  try {
    // подключение к базе данных
    await sequelize.authenticate();
    // console.log("соединение с базой данных установлено");

    // Синхронизируем модели с базой данных
    await sequelize.sync({ alter: true });
    // console.log("Все модели успешно синхронизированы");

    // запуск сервера
    app.listen(PORT, () => {
      console.log(`Server стартанул на http://localhost:${PORT}`);
    });
  } catch (error) {
    process.exit(1); //  завершаем процесс при сбоях
  }
};
start();
