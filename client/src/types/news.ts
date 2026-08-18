// Типы новостей
export type Mood = "happy" | "sad" | "neutral" | "ironic";

export interface NewsItem {
  id: string; // id
  title: string; // заголовок
  source: string; // источник
  url: string; // ссылка
  publishedAt: string; // дата публикации
  originalText: string; // тсходный текст
  rewritten: Record<Mood, string>; // ключи для выборки настроения
}

// интерфейс для ответа сервера
export interface ApiNewsItem {
  id: string;
  title: string;
  source: string;
  url: string;
  publishedAt: string;
  originalText: string;
  happyText: string;
  sadText: string;
  neutralText: string;
  ironicText: string;
}
