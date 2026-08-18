import { useEffect, useState } from "react";
import type { Mood, NewsItem, ApiNewsItem } from "./types/news"

function App() {
  // состояние для новостей
  const [selectedMood, setSelectedMood] = useState<Mood>("neutral");

  // состояние для выбранной новости 
  const [newsId, setNewsId] = useState<string | null>(null);

  // состояние для массива новостей
  const [news, setNews] = useState<NewsItem[]>([]);
  // состояние для загрузки 
  const [isLoading, setIsLoading] = useState(true);
  // состояние для ошибки
  const [error, setError] = useState<string | null>(null);

  // загрузка новостей
  useEffect(() => {
    const loadNews = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/news`);
        if (!response.ok) {
          throw new Error("Не удалось загрузить новости")
        }
        const data: ApiNewsItem[] = await response.json();
        const apiNews: NewsItem[] = data.map((item) => {
          return {
            id: item.id,
            title: item.title,
            source: item.source,
            url: item.url,
            publishedAt: item.publishedAt,
            originalText: item.originalText,
            rewritten: {
              happy: item.happyText,
              sad: item.sadText,
              neutral: item.neutralText,
              ironic: item.ironicText
            }
          }
        })
        setNews(apiNews)
      } catch (error) {
        setError(error instanceof Error ? error.message : "Неизвестная ошибка")
      } finally {
        setIsLoading(false)
      }
    }

    loadNews();
  }, [])

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
  const selectedNews = news.find((item) => item.id === newsId);

  return (
    <main>

      {/* Основной блок новостей */}
      <h1>Mood News Grid</h1>
      <div className="mood-controls">
        {(Object.keys(moodLabels) as Mood[]).map((mood) => (
          <button
            key={mood}
            className={selectedMood === mood ? "mood-button active-mood" : "mood-button"}
            onClick={() => handlerMoodClick(mood)}>
            {moodLabels[mood]}
          </button>
        ))}
      </div>


      {isLoading && (
        <p>Загружаем новости...</p>
      )}
      {error ? (
        <p>{error}</p>
      ) : (
        <>

          <section className="news-grid">
            {news.map((item) => (
              <article
                key={item.id}
                className={newsId === item.id ? "active-card " : ""}
                onClick={() => handleMoodIdClick(item.id)}>
                <h2>{item.title}</h2>
                <span>{item.source}</span>
                <p>{item.rewritten[selectedMood]}</p>
              </article>
            ))}
          </section>


          {/* Блок выделенной новости  */}
          {selectedNews && (
            <section className="selected-news">
              <article>
                <h2>{selectedNews.title}</h2>
                <span>{selectedNews.source}</span>
                <div className="compare-grid">
                  <div className="compare-card">
                    <h3>Исходный текст:</h3>
                    <p>{`${selectedNews.originalText}`}</p>
                  </div>
                  <div className="compare-card">
                    <h3>Переписанный текст:</h3>
                    <p>{`${selectedNews.rewritten[selectedMood]}`}</p>
                  </div>
                </div>

                <a href={selectedNews.url} target="_blank" rel="noreferrer">Открыть источник</a>
              </article>
            </section>
          )}
        </>
      )}
    </main>
  )
}

export default App
