import type { NewsItem } from "../types/news";

export const newsData: NewsItem[] = [
  {
    id: "1",
    title: "NASA announced a new Moon mission",
    source: "NASA",
    url: "https://example.com/nasa-moon",
    publishedAt: "2026-08-16",
    originalText:
      "NASA announced details of a new Moon mission planned for the coming years.",
    rewritten: {
      happy:
        " :) NASA shared exciting details about a new Moon mission planned for the coming years.",
      sad: " :( NASA announced details of a difficult new Moon mission planned for the coming years.",
      neutral:
        "| NASA announced details of a new Moon mission planned for the coming years.",
      ironic: "Iromic in object 1",
    },
  },
  {
    id: "2",
    title: "New climate report released",
    source: "Reuters",
    url: "https://example.com/climate-report",
    publishedAt: "2026-08-16",
    originalText:
      "A new climate report described recent temperature changes across several regions.",
    rewritten: {
      happy:
        " :) A new climate report gives researchers more data to understand recent temperature changes across several regions.",
      sad: " :( A new climate report described troubling temperatur changes across several regions.",
      neutral:
        " | A new climate report described recent  temperature changes across several regions.",
      ironic: "Iromic in object 2",
    },
  },
];
