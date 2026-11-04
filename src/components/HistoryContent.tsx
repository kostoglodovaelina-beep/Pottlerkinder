import { useEffect, useState } from "react"
import historyPhoto from "@/assets/history/zollverein.webp"
import "../styles/components/history-page.css"

const chapters = [
  { id: "herkunft", label: "Das Revier" },
  { id: "wandel", label: "Was bleibt" },
  { id: "marke", label: "Pottlerkinder" },
  { id: "kohle", label: "Kohle & Charakter" },
]

export default function HistoryContent() {
  const [activeChapter, setActiveChapter] = useState("herkunft")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting)
        if (visible) setActiveChapter(visible.target.id)
      },
      { rootMargin: "-190px 0px -45% 0px", threshold: 0 },
    )
    chapters.forEach(({ id }) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <main className="history-page" aria-labelledby="history-title">
      <div className="history-container">
        <nav className="history-breadcrumb" aria-label="Seitennavigation">
          <a href="/">Startseite</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Geschichte</span>
        </nav>
        <div className="history-intro">
          <div>
            <p className="history-kicker">Pottlerkinder / Unsere Geschichte</p>
            <h1 id="history-title">
              Was aus dem
              <br />
              Pott bleibt.
            </h1>
          </div>
          <p>
            Fördertürme, Kohle und Zusammenhalt. Das Ruhrgebiet verändert sich —
            und seine Geschichte bleibt Teil von uns. Mit Pottlerkinder tragen
            wir sie weiter.
          </p>
        </div>
        <figure className="history-photo">
          <img
            src={historyPhoto}
            alt="Der Doppelbock-Förderturm der Zeche Zollverein in Essen"
            width="1800"
            height="1253"
            fetchPriority="high"
          />
          <figcaption>
            <span>Zeche Zollverein / Essen, Ruhrgebiet</span>
            <span>Foto: Wolfgang Weiser · Unsplash</span>
          </figcaption>
        </figure>

        <div className="history-editorial">
          <aside className="history-index">
            <p>Unsere Geschichte</p>
            <nav aria-label="Kapitel der Geschichte">
              {chapters.map((chapter, index) => (
                <a
                  key={chapter.id}
                  href={`#${chapter.id}`}
                  aria-current={
                    activeChapter === chapter.id ? "location" : undefined
                  }
                  onClick={() => setActiveChapter(chapter.id)}
                >
                  <span>0{index + 1}</span> {chapter.label}
                </a>
              ))}
            </nav>
            <span className="history-index-note">
              Herkunft. Zusammenhalt.
              <br />
              Ein Stück von uns.
            </span>
          </aside>
          <article className="history-article">
            <section id="herkunft">
              <p className="history-chapter">01 / Herkunft</p>
              <h2>Mehr als eine Landschaft.</h2>
              <p>
                Fördertürme, Halden und ehemalige Zechen gehören zur Landschaft
                des Ruhrgebiets. Sie erinnern an Arbeit, Gemeinschaft und eine
                industrielle Vergangenheit, die in der Kultur der Region bis
                heute sichtbar ist.
              </p>
              <p>
                Das Ruhrgebiet befindet sich im Wandel. Ehemalige
                Zechenstandorte werden zunehmend zu Orten der Geschichte, Kultur
                und Begegnung. Doch die Zeit des Bergbaus hat ihre Spuren
                hinterlassen — und diese Spuren sind bis heute tief in der
                Identität und Kultur der Region verwurzelt.
              </p>
              <p>
                Auch die kommenden Generationen haben oft keinen direkten Bezug
                mehr zur Arbeit unter Tage. Trotzdem sehen sie jeden Tag die
                Halden, Fördertürme und Zechenanlagen, die das Bild des
                Ruhrgebiets prägen. Sie gehören zu unserer Landschaft und
                beeinflussen, was diese Region ausmacht.
              </p>
            </section>
            <section id="wandel">
              <p className="history-chapter">02 / Wandel</p>
              <h2>Neue Orte. Dieselbe Verbundenheit.</h2>
              <p>
                Viele Orte verändern sich: Wo früher gearbeitet wurde, entstehen
                heute Räume für Kultur, Begegnung und neue Erinnerungen. Diese
                Veränderung ist Teil unserer Haltung — Respekt für das, was war,
                und Raum für neue Ideen.
              </p>
              <p>
                Früher stand der Eiffelturm als Symbol für technischen
                Fortschritt. Heute ist er längst zu einem Symbol für Paris,
                Romantik und Liebe geworden. Millionen Menschen reisen jedes
                Jahr dorthin, um ihn zu sehen.
              </p>
              <p>
                Auch im Ruhrgebiet haben sich ehemalige Zechen und Fördertürme
                zu besonderen Orten entwickelt. Heute werden dort Hochzeiten
                gefeiert, Erinnerungen geschaffen und sogar Eheversprechen
                gegeben.
              </p>
              <blockquote>
                Aus industrieller Vergangenheit wird kulturelle Identität.
              </blockquote>
            </section>
            <section id="marke">
              <p className="history-chapter">03 / Unsere Marke</p>
              <h2>Das Revier im Alltag.</h2>
              <p>
                Neben individuellen Aufträgen entwickeln und produzieren wir
                unsere eigene Marke Pottlerkinder. Genau diese Geschichte
                möchten wir bewahren und neu interpretieren — modern, kreativ
                und mit einem Augenzwinkern.
              </p>
              <p>
                Mit Pottlerkinder übersetzen wir diese Verbundenheit in
                Produkte, Drucke und Motive. Ohne die Herkunft aus den Augen zu
                verlieren.
              </p>
              <p>
                Wir entwickeln gemeinsam mit unseren Kunden Ideen, die zu ihnen,
                ihrer Marke oder ihrem Unternehmen passen. Aus einem Motiv wird
                ein Produkt — und aus einem Produkt ein Stück persönlicher
                Geschichte.
              </p>
            </section>
            <section id="kohle">
              <p className="history-chapter">04 / Material &amp; Idee</p>
              <h2>Ein Stück Ruhrgebiet zum Mitnehmen.</h2>
              <p>
                Eine unserer besonderen Ideen sind einzigartige Schmuckstücke
                aus Kohle. Kohle und Diamant bestehen beide aus Kohlenstoff —
                ihre Eigenschaften und Entstehungsbedingungen sind jedoch
                grundlegend unterschiedlich.
              </p>
              <p>
                Gerade das macht Kohle für uns so faszinierend: In einem
                kleinen, scheinbar unscheinbaren Stück steckt die Millionen
                Jahre alte Geschichte unserer Erde und zugleich die Geschichte
                des Ruhrgebiets.
              </p>
              <p>
                Aus diesem besonderen Material entstehen individuelle
                Schmuckstücke, die nicht nur schön sind, sondern auch eine
                Geschichte erzählen. Ein Stück Ruhrgebiet, das man bei sich
                tragen kann.
              </p>
              <p>
                Wir sind immer offen für neue Ideen, ungewöhnliche Wünsche und
                kreative Projekte. Du hast eine Idee, weißt aber noch nicht
                genau, wie sie umgesetzt werden kann? Gemeinsam machen wir
                daraus ein konkretes Produkt.
              </p>
            </section>
          </article>
        </div>
      </div>
    </main>
  )
}
