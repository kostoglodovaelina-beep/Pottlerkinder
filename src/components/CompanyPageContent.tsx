import { useEffect } from "react"
import {
  FiArrowDown,
  FiArrowRight,
  FiArrowUpRight,
  FiCheck,
  FiLayers,
  FiMail,
  FiMapPin,
  FiMessageCircle,
  FiPhone,
  FiPlus,
} from "react-icons/fi"
import blackHoodie from "@/assets/designer/men-hoodie/front/black.webp"
import blankShirt from "@/assets/designer/unisex-tshirt/front/off_white.webp"
import blackPolo from "@/assets/designer/men-polo/front/black.webp"
import blackMug from "@/assets/designer/mug/two-tone/schwarz.webp"
import laserHolder from "@/assets/company/laser-holder-clean.webp"
import "../styles/components/company-page.css"

const requestLink = (subject: string, introduction: string) =>
  `mailto:kontakt@pottlerkinder.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    `Guten Tag Pottlerkinder,\n\n${introduction}\n\nFirma / Ansprechpartner:\nGewünschte Artikel:\nFarben und Stückzahl je Größe:\nVeredelung / Position und Größe des Logos:\nWunschtermin:\n\nMein Logo sende ich als Anhang mit.\n\nFreundliche Grüße`,
  )}`
const emailRequest = requestLink(
  "Unverbindliche Anfrage – Firmenbekleidung & Werbeartikel",
  "Ich interessiere mich für ein unverbindliches Angebot.",
)
const services = [
  {
    title: "Maschinenstickerei",
    image: blackPolo,
    alt: "Schwarzes Poloshirt ohne Aufdruck als Basis für ein gesticktes Firmenlogo",
    description:
      "Logos und Namen mit Struktur. Langlebig auf Polos, Hemden, Hoodies, Jacken und Caps.",
  },
  {
    title: "Textildruck & Flock",
    image: blankShirt,
    alt: "Unbedrucktes naturweißes T-Shirt für individuellen Textildruck",
    description:
      "DTF für detailreiche Motive. Flex und Flock für Schriftzüge, Namen und Rückennummern.",
  },
  {
    title: "Sublimationsdruck",
    image: blackMug,
    alt: "Weiße Tasse mit schwarzem Henkel und Innenleben, ohne Logo",
    description:
      "Ihr Motiv auf Tassen, Thermobechern, Mauspads und weiteren passenden Werbeartikeln.",
  },
  {
    title: "Lasergravur",
    image: laserHolder,
    alt: "Unveredelter Handyhalter aus Bambus als Beispiel für eine Lasergravur",
    description:
      "Präzise Gravuren auf Holz, Bambus und Metall. Für Schilder, Stifte und persönliche Geschenke.",
  },
]
const steps = [
  {
    title: "Anfragen",
    text: "Logo, Wunschartikel, Menge und Termin per E-Mail senden oder im Laden besprechen.",
  },
  {
    title: "Entwurf freigeben",
    text: "Sie erhalten ein individuelles Angebot und prüfen die Gestaltung vor der Produktion.",
  },
  {
    title: "Produzieren & liefern",
    text: "Wir veredeln in Buer. Sie holen ab oder lassen liefern – mit Rechnung und ausgewiesener MwSt.",
  },
]
const questions = [
  {
    question: "Ab welcher Stückzahl kann ich bestellen?",
    answer:
      "Wir veredeln schon ab 1 Stück – vom einzelnen Muster bis zur kompletten Teamausstattung. Ihr individuelles Angebot richtet sich nach Textil, Motiv und Menge.",
  },
  {
    question: "Welche Logodatei benötigen Sie?",
    answer:
      "Am besten senden Sie Ihr Logo als PDF, SVG, AI oder als PNG in hoher Auflösung. Wir kümmern uns um die Aufbereitung für Stick oder Druck und stimmen den Entwurf vor der Produktion mit Ihnen ab.",
  },
  {
    question: "Kann ich Farben und Textilien vorher ansehen?",
    answer:
      "Ja. Bei uns im Laden in Gelsenkirchen-Buer können Sie Muster ansehen und Farben und Größen persönlich besprechen. Musterteile vorab sind möglich.",
  },
]

export default function CompanyPageContent() {
  useEffect(() => {
    const previousTitle = document.title
    document.title =
      "Für Unternehmen – Textilveredelung & Werbeartikel | Pottlerkinder"
    return () => {
      document.title = previousTitle
    }
  }, [])

  return (
    <main
      className="company-page"
      id="unternehmen-content"
      aria-labelledby="company-title"
    >
      <section className="b2b-hero">
        <div className="b2b-container">
          <nav className="b2b-breadcrumb" aria-label="Brotkrümelnavigation">
            <a href="/">Startseite</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Für Unternehmen</span>
          </nav>
          <div className="b2b-hero-grid">
            <div className="b2b-hero-copy">
              <p className="b2b-eyebrow">
                FÜR UNTERNEHMEN, VEREINE &amp; TEAMS
              </p>
              <h1 id="company-title">
                IHR TEAM.
                <br />
                <span>IHR AUFTRITT.</span>
              </h1>
              <p className="b2b-hero-description">
                Textilien und Werbeartikel mit Ihrem Logo. Bestickt, bedruckt
                oder graviert – direkt aus Gelsenkirchen-Buer.
              </p>
              <div className="b2b-actions">
                <a className="b2b-button b2b-button-primary" href="#anfrage">
                  PROJEKT ANFRAGEN <FiArrowUpRight aria-hidden="true" />
                </a>
                <a className="b2b-text-link" href="#leistungen">
                  Unsere Leistungen <FiArrowDown aria-hidden="true" />
                </a>
              </div>
              <a className="b2b-studio-link" href="/designer">
                Selbst gestalten? Ins Design-Studio{" "}
                <FiArrowRight aria-hidden="true" />
              </a>
            </div>
            <a
              className="b2b-hero-visual"
              href="#leistungen"
              aria-label="Textilien und Veredelungsmöglichkeiten entdecken"
            >
              <span className="b2b-visual-kicker">
                DIE BASIS FÜR IHRE IDEEN.
              </span>
              <div className="b2b-blank-products">
                <img
                  src={blackHoodie}
                  width="800"
                  height="800"
                  fetchPriority="high"
                  alt="Schwarzer Hoodie ohne Logo zur individuellen Veredelung"
                />
                <img
                  src={blankShirt}
                  width="800"
                  height="800"
                  alt="Naturweißes T-Shirt ohne Aufdruck"
                />
              </div>
              <span className="b2b-visual-caption">
                TEXTILIEN. MIT IHREM CHARAKTER.
                <FiArrowUpRight aria-hidden="true" />
              </span>
            </a>
          </div>
          <ul className="b2b-trust-row" aria-label="Ihre Vorteile">
            <li>
              <FiCheck aria-hidden="true" /> Veredelung ab 1 Stück
            </li>
            <li>
              <FiCheck aria-hidden="true" /> Entwurf vor der Produktion
            </li>
            <li>
              <FiMapPin aria-hidden="true" /> Persönliche Beratung in Buer
            </li>
          </ul>
        </div>
      </section>

      <section
        className="b2b-services"
        id="leistungen"
        aria-labelledby="services-title"
      >
        <div className="b2b-container">
          <div className="b2b-section-heading">
            <div>
              <p className="b2b-eyebrow">UNSERE LEISTUNGEN</p>
              <h2 id="services-title">VIER WEGE ZU IHREM LOGO.</h2>
            </div>
            <p>
              Das passende Verfahren?
              <br />
              Wählen wir gemeinsam.
            </p>
          </div>
          <div className="b2b-service-grid">
            {services.map((service, index) => (
              <article className="b2b-service-card" key={service.title}>
                <div className="b2b-service-image">
                  <span className="b2b-service-number" aria-hidden="true">
                    0{index + 1}
                  </span>
                  <img
                    src={service.image}
                    alt={service.alt}
                    loading="lazy"
                    width="600"
                    height="600"
                  />
                </div>
                <div className="b2b-service-copy">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="b2b-sticker-note">
            <p>
              <FiLayers aria-hidden="true" /> Auch möglich: Aufkleber,
              Schaufenster- und Folienbeschriftung.
            </p>
          </div>
          <p className="b2b-image-note">
            Abgebildet: unveredelte Produktbeispiele.
          </p>
        </div>
      </section>

      <section className="b2b-offer" aria-labelledby="offer-title">
        <div className="b2b-container b2b-offer-inner">
          <div>
            <p className="b2b-eyebrow">ERÖFFNUNGSANGEBOT</p>
            <h2 id="offer-title">T-SHIRT. VORNE &amp; HINTEN BEDRUCKT.</h2>
          </div>
          <div className="b2b-offer-price">
            <p>
              <small>ab</small> 15,00 €<sup>*</sup>
            </p>
            <span>netto / Stück · 17,85 € inkl. 19 % MwSt.</span>
          </div>
          <p className="b2b-offer-legal">
            * Preis abhängig von Textil, Motiv und Menge. Gegebenenfalls zzgl.{" "}
            <a href="/versandkosten">Versandkosten</a>. Es gilt Ihr
            individuelles Angebot.
          </p>
        </div>
      </section>

      <div className="b2b-bottom">
        <div className="b2b-container">
          <div className="b2b-process-contact">
            <section
              className="b2b-process"
              id="ablauf"
              aria-labelledby="process-title"
            >
              <p className="b2b-eyebrow">VON DER IDEE ZUM FERTIGEN PRODUKT</p>
              <h2 id="process-title">
                KLARER ABLAUF.
                <br />
                KURZE WEGE.
              </h2>
              <ol className="b2b-steps">
                {steps.map((step, index) => (
                  <li key={step.title}>
                    <span aria-hidden="true">0{index + 1}</span>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
            <section
              className="b2b-contact"
              id="anfrage"
              aria-labelledby="contact-title"
            >
              <p className="b2b-eyebrow">UNVERBINDLICH ANFRAGEN</p>
              <h2 id="contact-title">WAS HABEN SIE VOR?</h2>
              <p className="b2b-contact-intro">
                Logo, Artikel, Menge und Wunschtermin genügen für den ersten
                Schritt.
              </p>
              <a className="b2b-button b2b-button-primary" href={emailRequest}>
                <FiMail aria-hidden="true" /> ANFRAGE PER E-MAIL{" "}
                <FiArrowUpRight aria-hidden="true" />
              </a>
              <a
                className="b2b-email-address"
                href="mailto:kontakt@pottlerkinder.de"
              >
                kontakt@pottlerkinder.de
              </a>
              <div className="b2b-contact-options">
                <a href="tel:+4920936171378">
                  <FiPhone aria-hidden="true" />
                  <span>
                    Telefon<strong>0209 361 713 78</strong>
                  </span>
                </a>
                <a
                  href="https://wa.me/4917626091435"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FiMessageCircle aria-hidden="true" />
                  <span>
                    Direkt schreiben
                    <strong>
                      WhatsApp <FiArrowUpRight aria-hidden="true" />
                    </strong>
                  </span>
                </a>
              </div>
              <a
                className="b2b-address"
                href="https://www.google.com/maps/search/?api=1&query=Horster+Str.+118+45897+Gelsenkirchen"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiMapPin aria-hidden="true" />
                <span>
                  Horster Str. 118<strong>45897 Gelsenkirchen-Buer</strong>
                </span>
                <FiArrowUpRight aria-hidden="true" />
              </a>
            </section>
          </div>
          <section className="b2b-faq" aria-labelledby="faq-title">
            <h2 id="faq-title">GUT ZU WISSEN.</h2>
            <div className="b2b-faq-list">
              {questions.map((item) => (
                <details key={item.question}>
                  <summary>
                    {item.question}
                    <FiPlus aria-hidden="true" />
                  </summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
