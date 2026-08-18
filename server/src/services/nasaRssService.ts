// Nasa API
const nasa_api_url_page1 =
  "https://www.nasa.gov/wp-json/wp/v2/posts?per_page=10&_fields=id,date,link,title,excerpt";

const nasa_api_url_page2 =
  "https://www.nasa.gov/wp-json/wp/v2/posts?per_page=10&page=2&_fields=id,date,link,title,excerpt";

const nasa_api_url_page3 =
  "https://www.nasa.gov/wp-json/wp/v2/posts?per_page=10&page=3&_fields=id,date,link,title,excerpt";

type Mood = "happy" | "sad" | "neutral" | "ironic";

// функция очистки HTML тегов
const cleanHtmlTags = (html: string) => {
  return (
    html
      .replace(/<[^>]*>/g, " ") // убираем теги
      .replace(/&nbsp;/g, " ") // неразрывный пробел
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      // замена сущностей &hellip; &#8211; &#8217;
      .replace(/&hellip;/g, "...")
      .replace(/&#8211;/g, "-")
      .replace(/&#8217;/g, "'")
      .replace(/\s+/g, " ") // схлопываем множественные пробелы
      .trim()
  );
};

// функция изменения подачи метариалов под настроение
const rewriteByMood = (text: string, mood: Mood) => {
  switch (mood) {
    case "neutral":
      return text;
    case "happy":
      return `Позитивные новости: ${text}`;
    case "sad":
      return `Грустные новости: ${text}`;
    case "ironic":
      return `Новости с иронией: ${text}`;
  }
};

// функция для получения NASA ответ
const fetchNasaNews = async () => {
  // через fetch делаем запрос к API
  const response_page1 = await fetch(nasa_api_url_page1);
  const response_page2 = await fetch(nasa_api_url_page2);
  const response_page3 = await fetch(nasa_api_url_page3);

  // Если выдала ошибку, возвращаем стутус ошибки
  if (!response_page1.ok || !response_page2.ok || !response_page3.ok) {
    throw new Error(`ERROR ${response_page1.status}`);
  }

  // забираем новости
  const newsPage1 = await response_page1.json();
  const newsPage2 = await response_page2.json();
  const newsPage3 = await response_page3.json();

  // объеденям данные в один массив
  const newsSpread = [...newsPage1, ...newsPage2, ...newsPage3];

  // удаляем дубли по id
  const seenIds = new Set<number>();
  const uniqueNews = newsSpread.filter((item) => {
    if (seenIds.has(item.id)) {
      return false;
    }
    seenIds.add(item.id);
    return true;
  });

  // удаляем лишние html теги и возвращаем news
  return uniqueNews.slice(0, 10).map((item: any) => {
    const originTitle = cleanHtmlTags(item.title.rendered);
    const originalText = cleanHtmlTags(item.excerpt.rendered);
    return {
      id: String(item.id),
      title: originTitle,
      source: "NASA",
      url: item.link,
      publishedAt: item.date,
      originalText,
      happyText: rewriteByMood(originalText, "happy"),
      sadText: rewriteByMood(originalText, "sad"),
      neutralText: rewriteByMood(originalText, "neutral"),
      ironicText: rewriteByMood(originalText, "ironic"),
    };
  });
};

export default fetchNasaNews;
