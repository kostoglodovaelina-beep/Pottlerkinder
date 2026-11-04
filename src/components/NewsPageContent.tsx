import { useEffect, useState } from "react"
import {
  FiArrowLeft,
  FiArrowRight,
  FiArrowUpRight,
  FiClock,
  FiDownload,
  FiFileText,
  FiMail,
  FiSearch,
  FiX,
} from "react-icons/fi"
import { NEWS_POSTS, filterNews, formatNewsDate } from "@/lib/news"
import newsImage from "@/assets/news/shop-opening.webp"
import brochure from "@/assets/documents/leistungen-fuer-unternehmen.pdf?url"
import "../styles/components/news-page.css"

function PressResources() {
  return (
    <section className="news-resources" aria-labelledby="news-resources-title">
      <div>
        <p className="news-eyebrow">INFORMATIONEN & KONTAKT</p>
        <h2 id="news-resources-title">Für alle, die mehr wissen möchten.</h2>
      </div>
      <div className="news-resource-grid">
        <a
          href="mailto:kontakt@pottlerkinder.de?subject=Presseanfrage"
          className="news-resource"
        >
          <FiMail aria-hidden="true" />
          <span>
            <strong>Pressekontakt</strong>
            <small>kontakt@pottlerkinder.de</small>
          </span>
          <FiArrowUpRight aria-hidden="true" />
        </a>
        <a
          className="news-resource"
          href={brochure}
          download="Pottlerkinder-Leistungen-fuer-Unternehmen.pdf"
        >
          <FiDownload aria-hidden="true" />
          <span>
            <strong>Alle Möglichkeiten im Überblick.</strong>
            <small>Leistungsübersicht als PDF · ca. 7 MB</small>
          </span>
          <FiArrowRight aria-hidden="true" />
        </a>
      </div>
      <p className="news-editor-note">
        Verantwortlich für journalistisch-redaktionelle Inhalte: Natalia
        Lewandowski. <a href="/impressum">Zum Impressum</a>
      </p>
    </section>
  )
}

export default function NewsPageContent({ slug }: { slug?: string }) {
  const params = new URLSearchParams(window.location.search)
  const initialCategory = params.get("kategorie")
  const [category, setCategory] = useState(
    initialCategory === "Neuigkeiten" || initialCategory === "Presse"
      ? initialCategory
      : "Alle",
  )
  const [input, setInput] = useState(params.get("suche") || "")
  const [query, setQuery] = useState(params.get("suche") || "")
  const post = slug ? NEWS_POSTS.find((item) => item.slug === slug) : undefined
  const posts = filterNews(NEWS_POSTS, category, query)

  useEffect(() => {
    const previousTitle = document.title
    document.title = `${post?.title || "Blog – Neuigkeiten & Presse"} | Pottlerkinder`
    return () => {
      document.title = previousTitle
    }
  }, [post])

  const updateFilters = (nextCategory: string, nextQuery: string) => {
    setCategory(nextCategory)
    setQuery(nextQuery)
    const search = new URLSearchParams()
    if (nextCategory !== "Alle") search.set("kategorie", nextCategory)
    if (nextQuery.trim()) search.set("suche", nextQuery.trim())
    window.history.replaceState(
      {},
      "",
      `/blog${search.size ? `?${search}` : ""}`,
    )
  }

  return (
    <main className="news-page" aria-labelledby="news-title">
      <div className="news-container">
        <nav className="news-breadcrumb" aria-label="Brotkrümelnavigation">
          <a href="/">Startseite</a>
          <span aria-hidden="true">/</span>
          {slug ? (
            <>
              <a href="/blog">Blog</a>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Meldung</span>
            </>
          ) : (
            <span aria-current="page">Blog</span>
          )}
        </nav>
        {slug ? (
          post ? (
            <>
              <a href="/blog" className="news-back">
                <FiArrowLeft aria-hidden="true" /> Alle Meldungen
              </a>
              <header className="news-article-head">
                <p className="news-eyebrow">
                  {post.category} <span aria-hidden="true">/</span>{" "}
                  Shop-Eröffnung
                </p>
                <h1 id="news-title">{post.title}</h1>
                <p className="news-article-lead">{post.excerpt}</p>
                <div className="news-meta">
                  <span>Pottlerkinder Redaktion</span>
                  <time dateTime={post.date}>{formatNewsDate(post.date)}</time>
                  <span>
                    <FiClock aria-hidden="true" /> {post.readingMinutes} Min.
                    Lesezeit
                  </span>
                </div>
              </header>
              <figure className="news-article-photo">
                <img
                  src={newsImage}
                  width="1600"
                  height="1067"
                  fetchPriority="high"
                  alt="Open-Schild als Symbol für die Eröffnung unseres Onlineshops"
                />
                <figcaption>
                  Wir sind online. Symbolfoto: Tim Mossholder / Unsplash.
                </figcaption>
              </figure>
              <div className="news-article-layout">
                <aside className="news-article-index">
                  <p>IN DIESER MELDUNG</p>
                  {post.sections.map((section, index) => (
                    <a key={section.id} href={`#${section.id}`}>
                      <span>0{index + 1}</span>
                      {section.title}
                    </a>
                  ))}
                </aside>
                <article className="news-article-body">
                  {post.sections.map((section) => (
                    <section id={section.id} key={section.id}>
                      <h2>{section.title}</h2>
                      <p>{section.text}</p>
                    </section>
                  ))}
                  <div className="news-article-end">
                    <a href="/blog">
                      <FiArrowLeft aria-hidden="true" /> Zurück zu allen
                      Meldungen
                    </a>
                    <a href="/kontakt">
                      Fragen zur Meldung <FiArrowUpRight aria-hidden="true" />
                    </a>
                  </div>
                </article>
              </div>
            </>
          ) : (
            <section className="news-empty">
              <h1 id="news-title">Diese Meldung wurde nicht gefunden.</h1>
              <a href="/blog">
                Alle Meldungen <FiArrowRight aria-hidden="true" />
              </a>
            </section>
          )
        ) : (
          <>
            <header className="news-intro">
              <div>
                <p className="news-eyebrow">POTTLERKINDER / NEWSROOM</p>
                <h1 id="news-title">
                  Neues aus
                  <br />
                  dem Revier.
                </h1>
              </div>
              <p>
                Neuigkeiten, Einblicke und Presseinformationen von
                Pottlerkinder. Direkt aus Buer. Für alle, die mit uns verbunden
                bleiben möchten.
              </p>
            </header>
            <div className="news-tools">
              <nav className="news-categories" aria-label="Meldungen filtern">
                {["Alle", "Neuigkeiten", "Presse"].map((item) => (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={category === item}
                    onClick={() => updateFilters(item, query)}
                  >
                    {item === "Alle" ? "Alle Meldungen" : item}
                  </button>
                ))}
              </nav>
              <form
                className="news-search"
                role="search"
                onSubmit={(event) => {
                  event.preventDefault()
                  updateFilters(category, input)
                }}
              >
                <label className="sr-only" htmlFor="news-search">
                  Meldungen durchsuchen
                </label>
                <input
                  id="news-search"
                  type="search"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Meldungen durchsuchen …"
                />
                {input && (
                  <button
                    type="button"
                    aria-label="Suche leeren"
                    onClick={() => {
                      setInput("")
                      updateFilters(category, "")
                    }}
                  >
                    <FiX aria-hidden="true" />
                  </button>
                )}
                <button type="submit" aria-label="Meldungen suchen">
                  <FiSearch aria-hidden="true" />
                </button>
              </form>
            </div>
            <div className="news-results-meta" role="status" aria-live="polite">
              <span>
                {posts.length} {posts.length === 1 ? "Meldung" : "Meldungen"}
              </span>
              <span>Neueste zuerst</span>
            </div>
            {posts.length ? (
              posts.map((item) => (
                <article className="news-feature" key={item.slug}>
                  <a
                    className="news-feature-photo"
                    href={`/blog/${item.slug}`}
                    aria-label={`${item.title} – Meldung lesen`}
                  >
                    <img
                      src={newsImage}
                      width="1600"
                      height="1067"
                      fetchPriority="high"
                      alt="Open-Schild als Symbol für den Start des Onlineshops"
                    />
                    <span>Wir sind online.</span>
                  </a>
                  <div className="news-feature-copy">
                    <div className="news-feature-labels">
                      <span>{item.category}</span>
                    </div>
                    <div className="news-meta">
                      <time dateTime={item.date}>
                        {formatNewsDate(item.date)}
                      </time>
                      <span>
                        <FiClock aria-hidden="true" /> {item.readingMinutes}{" "}
                        Min.
                      </span>
                    </div>
                    <h2>
                      <a href={`/blog/${item.slug}`}>{item.title}</a>
                    </h2>
                    <p>{item.excerpt}</p>
                    <a className="news-read" href={`/blog/${item.slug}`}>
                      Meldung lesen <FiArrowRight aria-hidden="true" />
                    </a>
                  </div>
                </article>
              ))
            ) : (
              <div className="news-empty">
                <FiFileText aria-hidden="true" />
                <h2>
                  {category === "Presse" && !query
                    ? "Neue Presseinformationen folgen hier."
                    : "Keine passende Meldung gefunden."}
                </h2>
                <p>
                  {category === "Presse" && !query
                    ? "Für Presseanfragen erreichst du uns bereits jetzt über den Kontakt unten."
                    : "Versuche einen anderen Suchbegriff oder zeige alle Meldungen an."}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setInput("")
                    updateFilters("Alle", "")
                  }}
                >
                  Alle Meldungen anzeigen <FiArrowRight aria-hidden="true" />
                </button>
              </div>
            )}
          </>
        )}
        <PressResources />
      </div>
    </main>
  )
}
