import { useState } from "react";
import { newsData } from "./data/newsData"
import type { Mood } from "./types/news"

function App() {
  // состояние для новостей
  const [selectedMood, setSelectedMood] = useState<Mood>("neutral");

  // состояние для выбранной новости 
  const [newsId, setNewsId] = useState<string | null>(null);

  // подписи
  const moodLabels: Record<Mood, string> = {
    happy: "Радостно",
    neutral: "Нейтрально",
    sad: "Грустно",
    ironic: "Иронично"
  };

  // обработчки клика на кнопки 
  const handlerMoodClick = (mood: Mood) => {
    setSelectedMood(mood)
  }

  // обработчик клика на саму новость
  const handleMoodIdClick = (id: string) => {
    setNewsId(id);
  }

  // Основная новость
  const selectedNews = newsData.find((news) => news.id === newsId);

  return (
    <main>
      <h1>Mood News Grid</h1>
      <div>
        {(Object.keys(moodLabels) as Mood[]).map((mood) => (
          <button
            key={mood}
            className={selectedMood === mood ? "active-mood" : ""}
            onClick={() => handlerMoodClick(mood)}>
            {moodLabels[mood]}
          </button>
        ))}
      </div>
      <section className="news-grid">
        {newsData.map((news) => (
          <article
            key={news.id}
            className={newsId === news.id ? "active-card " : ""}
            onClick={() => handleMoodIdClick(news.id)}>
            <h2>{news.title}</h2>
            <span>{news.source}</span>
            <p>{news.rewritten[selectedMood]}</p>
          </article>
        ))}
      </section>

      {selectedNews && (
        <section>
          <article>
            <h2>{selectedNews.title}</h2>
            <span>{selectedNews.source}</span>
            <p>{`Исходный текст: ${selectedNews.originalText}`}</p>
            <p>{`Переписанный текст: ${selectedNews.rewritten[selectedMood]}`}</p>
            <a href={selectedNews.url} target="_blank" rel="noreferrer">Открыть источник</a>
          </article>

        </section>
      )}
    </main>
  )
}

export default App
