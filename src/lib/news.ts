export type NewsCategory = "Neuigkeiten" | "Presse"
type NewsSection = {
  id: string
  title: string
  text: string
}

export type NewsPost = {
  slug: string
  title: string
  category: NewsCategory
  date: string
  excerpt: string
  readingMinutes: number
  sections: NewsSection[]
}

export const NEWS_POSTS: NewsPost[] = [
  {
    slug: "unser-onlineshop-ist-da",
    title: "Glück auf. Unser Onlineshop ist da.",
    category: "Neuigkeiten",
    date: "2026-11-04",
    excerpt:
      "Ein neuer Ort für Stücke mit Reviercharakter. Entdecke unseren Shop, gestalte eigene Produkte und lerne die Menschen und Ideen hinter Pottlerkinder kennen.",
    readingMinutes: 2,
    sections: [
      {
        id: "willkommen",
        title: "Das Revier bekommt ein neues Zuhause im Netz.",
        text: "Pottlerkinder ist online. Unser Shop verbindet Produkte mit Ruhrgebietscharakter mit der Möglichkeit, eigene Ideen umzusetzen. Hier findest du ausgewählte Textilien, Accessoires und Geschenkideen – übersichtlich an einem Ort.",
      },
      {
        id: "entdecken",
        title: "Entdecken. Auswählen. Selbst gestalten.",
        text: "Im Katalog kannst du Produkte nach Kategorie, Größe und Farbe entdecken. Wer eine eigene Idee mitbringt, findet im Designstudio Raum für Texte, Motive und persönliche Entwürfe. Für Unternehmen, Vereine und Teams stellen wir unsere Möglichkeiten für Textildruck, Stickerei und weitere Veredelungen vor.",
      },
      {
        id: "in-verbindung",
        title: "Digital erreichbar. Persönlich in Buer.",
        text: "Auch mit dem Onlineshop bleibt der persönliche Austausch wichtig. Fragen zu einem Produkt oder einer individuellen Gestaltung besprechen wir gerne per E-Mail, telefonisch oder bei uns in Gelsenkirchen-Buer. In diesem Bereich teilen wir künftig Neuigkeiten, Einblicke und Presseinformationen.",
      },
    ],
  },
]

export function filterNews(posts: NewsPost[], category: string, query: string) {
  const term = query.trim().toLocaleLowerCase("de-DE")
  return posts.filter(
    (post) =>
      (category === "Alle" || post.category === category) &&
      (!term ||
        `${post.title} ${post.excerpt} ${post.category}`
          .toLocaleLowerCase("de-DE")
          .includes(term)),
  )
}

export function formatNewsDate(value: string) {
  return new Intl.DateTimeFormat("de-DE", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T12:00:00Z`))
}
