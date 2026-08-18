import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import NewsModel from "./db/NewsModel.js";
import fetchNasaNews from "./services/nasaRssService.js";
dotenv.config();
const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ====== route ======
// Получаем все новости
app.get("/api/news", async (_req, res) => {
  const allNews = await NewsModel.findAll();
  res.json(allNews);
});

// роут для получения новостей из API Nasa
app.get("/api/nasa/raw", async (_req, res) => {
  const data = await fetchNasaNews();
  res.json(data);
});

app.post("/api/news/fetch", async (_req, res) => {
  try {
    // получаем новости
    const getNews = await fetchNasaNews();

    // пробегаем по циклу и для ка
    await Promise.all(getNews.map((news: any) => NewsModel.upsert(news)));
    res.json({
      message: "NASA новости успещно сохранены в базе",
      count: getNews.length,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Внутрення ошибка сервера" });
  }
});

export default app;
