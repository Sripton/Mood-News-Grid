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
