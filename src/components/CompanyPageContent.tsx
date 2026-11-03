import { useEffect } from "react"
import {
  FiArrowDown,
  FiArrowRight,
  FiArrowUpRight,
  FiCheck,
  FiCheckCircle,
  FiDownload,
  FiLayers,
  FiMail,
  FiMapPin,
  FiMessageCircle,
  FiPhone,
  FiPlus,
  FiScissors,
} from "react-icons/fi"
import coalTexture from "@/imports/assets/sections/coal-texture.webp"
import embroideredBack from "@/assets/company/embroidered-vest.webp"
import embroideredFront from "@/assets/company/embroidery.webp"
import printedHoodie from "@/assets/company/textile-print.webp"
import sublimation from "@/assets/company/sublimation.webp"
import laserEngraving from "@/assets/company/laser-engraving.webp"
import workwear from "@/assets/company/softshell-vest.webp"
import blackHoodie from "@/assets/designer/men-hoodie/front/black.webp"
import blackCap from "@/assets/designer/women-cap/front/black-verified.webp"
import brochure from "@/imports/documents/company/leistungen-fuer-unternehmen.pdf?url"
import "./company-page.css"

const emailRequest = `mailto:kontakt@pottlerkinder.de?subject=${encodeURIComponent("Unverbindliche Anfrage – Firmenbekleidung & Werbeartikel")}&body=${encodeURIComponent(
  "Guten Tag Pottlerkinder,\n\nich interessiere mich für ein unverbindliches Angebot.\n\nFirma / Ansprechpartner:\nGewünschte Artikel:\nFarben und Stückzahl je Größe:\nVeredelung / Position und Größe des Logos:\nWunschtermin:\n\nMein Logo sende ich als Anhang mit.\n\nFreundliche Grüße",
)}`

const openingOfferRequest = `mailto:kontakt@pottlerkinder.de?subject=${encodeURIComponent("Eröffnungsangebot – T-Shirts beidseitig bedruckt")}&body=${encodeURIComponent(
  "Guten Tag Pottlerkinder,\n\nich interessiere mich für Ihr Eröffnungsangebot: T-Shirts inklusive Druck vorne und hinten ab 15,00 € netto pro Stück.\n\nBitte erstellen Sie mir ein unverbindliches Angebot.\n\nFirma / Ansprechpartner:\nFarben und Stückzahl je Größe:\nMotiv / Position und Größe des Drucks:\nWunschtermin:\n\nMein Logo sende ich als Anhang mit.\n\nFreundliche Grüße",
)}`

const services = [
  {
    title: "Maschinenstickerei",
    image: embroideredFront,
    alt: "Bordeauxroter Hoodie mit einem bei Pottlerkinder gestickten Förderturm",
    description:
      "Hochwertig, langlebig und waschfest. Für ein Logo, das nicht nur gut aussieht, sondern den Arbeitsalltag mitmacht.",
    details: [
      "Logos auf Brust, Ärmel, Rücken oder Kragen",
      "Polos, Hemden, Hoodies, Jacken, Softshell und Westen",
      "Caps, Mützen, Schürzen, Handtücher und Taschen",
      "Namen und Funktionen – für jede Person individuell",
    ],
    tags: ["Ideal für Berufskleidung", "Waschbeständig"],
  },
  {
    title: "Textildruck & Beflockung",
    image: printedHoodie,
    alt: "Blauer Hoodie mit Pottlerkinder-Schriftzug und weißem Schlägel-und-Eisen-Motiv",
    description:
      "Kräftige Farben, feine Details, klare Botschaften. Wir bringen Motive, Fotos und Schriftzüge auf Ihre Textilien.",
    details: [
      "DTF-Druck: vollfarbig, auch Verläufe und Fotos",
      "Flex- und Flockfolie für Namen und Rückennummern",
      "Reflex- und Neonfolien für Warn- und Sportkleidung",
      "T-Shirts, Sweatshirts, Hoodies, Jacken und Turnbeutel",
    ],
    tags: ["Schon ab 1 Stück", "Team- & Eventshirts"],
  },
  {
    title: "Sublimationsdruck",
    image: sublimation,
    alt: "Weiße Wanduhr und Glasplatte als Beispiele für individuell bedruckbare Werbeartikel",
    description:
      "Ihr Logo auf Dingen, die bleiben. Brillant bedruckte Tassen und Werbeartikel, die Ihre Kunden täglich begleiten.",
    details: [
      "Tassen: weiß, Perlmutt oder Herzhenkel; Thermobecher",
      "Mauspads, Wanduhren, Untersetzer und Schilder",
      "Turnbeutel, Umhängetaschen und Etuis",
      "Geschenke für Kunden, Mitarbeiter und Jubiläen",
    ],
    tags: ["Spülmaschinengeeignete Tassen", "Individuelle Geschenke"],
    material: true,
  },
  {
    title: "Lasergravur",
    image: laserEngraving,
    alt: "Handyhalter aus Bambus als Materialbeispiel für eine individuelle Lasergravur",
    description:
      "Dezent im Auftritt. Stark im Detail. Persönliche Gravuren auf Holz, Bambus und Metall mit bleibendem Eindruck.",
    details: [
      "Holz & Bambus: Handyhalter, Bretter, Schilder und Boxen",
      "Metall: Stifte, Öffner, Schlüsselanhänger und Thermoflaschen",
      "Logos, Namen, Daten und persönliche Grußtexte",
      "Geschenke für Kunden, Partner und Mitarbeiter",
    ],
    tags: ["Holz & Bambus", "Metall"],
    material: true,
  },
]

const textileGroups = [
  {
    title: "Team & Alltag",
    image: blackHoodie,
    alt: "Schwarzer Hoodie als Beispiel für individuell veredelbare Teambekleidung",
    items: ["T-Shirts", "Poloshirts", "Hoodies & Sweats", "Hemden & Blusen"],
  },
  {
    title: "Beruf & Outdoor",
    image: workwear,
    alt: "Rote Softshellweste als Beispiel für Berufskleidung",
    items: ["Softshell & Westen", "Jacken", "Warnwesten", "Schürzen"],
  },
  {
    title: "Praktische Begleiter",
    image: blackCap,
    alt: "Schwarze Mütze als Beispiel für personalisierbare Accessoires",
    items: ["Caps", "Mützen", "Taschen", "Turnbeutel"],
  },
]

const steps = [
  {
    title: "Ihre Idee",
    text: "Logo, Wunschartikel und Menge – per E-Mail, Telefon oder persönlich im Laden.",
  },
  {
    title: "Unser Entwurf",
    text: "Wir bereiten Ihr Logo auf und senden Ihnen einen Entwurf mit individuellem Angebot.",
  },
  {
    title: "Ihre Freigabe",
    text: "Sie prüfen den Entwurf und geben Größen, Farben und Gestaltung frei.",
  },
  {
    title: "Ab in die Werkstatt",
    text: "Wir produzieren Ihre Bestellung direkt bei uns in Gelsenkirchen-Buer.",
  },
  {
    title: "Fertig für Ihr Team",
    text: "Sie holen Ihre Produkte in Buer ab oder lassen sie zu sich liefern.",
  },
]

const questions = [
  {
    question: "Gibt es eine Mindestbestellmenge?",
    answer:
      "Wir veredeln schon ab 1 Stück – vom einzelnen Muster bis zur kompletten Teamausstattung. Bei größeren Bestellungen sind Mengenrabatte möglich. Ihr individuelles Angebot richtet sich nach Textil, Motiv und Menge.",
  },
  {
    question: "Kann ich Textilien und Muster vorher ansehen?",
    answer:
      "Ja. Bei uns im Laden können Sie Muster ansehen und Farben und Größen persönlich besprechen. Musterteile vorab sind möglich. Vor der Produktion erhalten Sie einen Entwurf zur Freigabe.",
  },
  {
    question: "Sind Nachbestellungen im gleichen Design möglich?",
    answer:
      "Ja, Nachbestellungen sind jederzeit im gleichen Design möglich. So können Sie Ihr Team auch später mit passenden Textilien ergänzen.",
  },
  {
    question: "Welche Datei benötigen Sie für mein Logo?",
    answer:
      "Am besten senden Sie Ihr Logo als PDF, SVG, AI oder als PNG in hoher Auflösung. Wir kümmern uns um die Aufbereitung für Stick oder Druck und stimmen den Entwurf mit Ihnen ab.",
  },
  {
    question: "Wie bekomme ich meine Bestellung und Rechnung?",
    answer:
      "Sie können Ihre Bestellung in Gelsenkirchen-Buer abholen oder zu sich liefern lassen. Sie erhalten eine Rechnung mit ausgewiesener Mehrwertsteuer für Ihre Buchhaltung.",
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
    <main className="company-page" id="unternehmen-content">
      <section className="b2b-hero" aria-labelledby="company-title">
        <img src={coalTexture} className="b2b-hero-texture" alt="" />
        <div className="b2b-container">
          <nav className="b2b-breadcrumb" aria-label="Brotkrümelnavigation">
            <a href="/">Startseite</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Für Unternehmen</span>
          </nav>
          <div className="b2b-hero-grid">
            <div className="b2b-hero-copy">
              <p className="b2b-eyebrow">
                <span /> FÜR UNTERNEHMEN & TEAMS
              </p>
              <h1 id="company-title">
                IHR LOGO.
                <br />
                <span>UNSER HANDWERK.</span>
              </h1>
              <p className="b2b-hero-intro">
                Auf allem, was Ihr Team trägt.
                <br />
                Und Ihre Kunden behalten.
              </p>
              <p className="b2b-hero-description">
                Wir besticken, bedrucken, beflocken und gravieren. Vom
                Einzelstück bis zur kompletten Teamausstattung – persönlich,
                individuell und direkt bei uns in Buer.
              </p>
              <div className="b2b-actions">
                <a
                  className="b2b-button b2b-button-primary btn-red"
                  href="#anfrage"
                >
                  ANGEBOT ANFRAGEN <FiArrowUpRight aria-hidden="true" />
                </a>
                <a className="b2b-text-link" href="#leistungen">
                  Leistungen entdecken <FiArrowDown aria-hidden="true" />
                </a>
              </div>
              <div className="b2b-hero-local">
                <FiMapPin aria-hidden="true" />
                <span>Ihre Werkstatt in Gelsenkirchen-Buer</span>
              </div>
            </div>
            <div className="b2b-hero-visual">
              <figure className="b2b-hero-photo">
                <img
                  src={embroideredBack}
                  width="840"
                  height="1080"
                  fetchPriority="high"
                  alt="Dunkle Weste mit blau gesticktem Pottlerkinder-Förderturm auf dem Rücken – eine Arbeit aus unserer Werkstatt"
                />
                <figcaption>
                  <span className="b2b-photo-dot" /> ECHTE ARBEIT. ECHTER POTT.
                </figcaption>
              </figure>
              <div className="b2b-photo-note">
                <FiScissors aria-hidden="true" />
                <span>
                  Mit Sorgfalt veredelt.
                  <br />
                  <strong>Mit Stolz getragen.</strong>
                </span>
              </div>
              <figure className="b2b-photo-inset">
                <img
                  src={printedHoodie}
                  width="560"
                  height="700"
                  alt="Detail eines blauen Hoodies mit weißem Textildruck"
                />
                <figcaption>DRUCK TRIFFT CHARAKTER.</figcaption>
              </figure>
            </div>
          </div>
          <ul className="b2b-trust-row" aria-label="Ihre Vorteile">
            <li>
              <FiCheckCircle aria-hidden="true" />
              <span>
                <strong>AB 1 STÜCK</strong>
                <small>Einzelstück oder große Auflage</small>
              </span>
            </li>
            <li>
              <FiLayers aria-hidden="true" />
              <span>
                <strong>ALLES AUS EINER HAND</strong>
                <small>Von der Logo-Aufbereitung bis zur Veredelung</small>
              </span>
            </li>
            <li>
              <FiMessageCircle aria-hidden="true" />
              <span>
                <strong>PERSÖNLICH. VOR ORT.</strong>
                <small>Beratung und Muster direkt im Laden</small>
              </span>
            </li>
          </ul>
        </div>
      </section>

      <section
        className="b2b-industries"
        aria-label="Für diese Branchen arbeiten wir"
      >
        <div className="b2b-container b2b-industries-inner">
          <p>
            FÜR ALLE, DIE
            <br />
            <strong>GEMEINSAM ANPACKEN.</strong>
          </p>
          <ul>
            {[
              "Handwerk",
              "Gastronomie",
              "Pflege & Praxen",
              "Apotheken",
              "Handel",
              "Vereine",
              "Schulen & Kitas",
              "Events",
            ].map((industry) => (
              <li key={industry}>{industry}</li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="b2b-section b2b-services b2b-container"
        id="leistungen"
        aria-labelledby="services-title"
      >
        <div className="b2b-section-heading">
          <div>
            <p className="b2b-eyebrow">01 / UNSERE LEISTUNGEN</p>
            <h2 id="services-title">
              EIN LOGO.
              <br />
              <span>VIELE MÖGLICHKEITEN.</span>
            </h2>
          </div>
          <p>
            Ob einheitlicher Teamauftritt oder ein Geschenk mit Persönlichkeit:
            Wir finden die passende Veredelung für Ihre Idee.
          </p>
        </div>
        <div className="b2b-service-grid">
          {services.map((service, index) => (
            <article className="b2b-service-card" key={service.title}>
              <div
                className={`b2b-service-image ${
                  service.material ? "b2b-material-image" : ""
                }`}
              >
                <img
                  src={service.image}
                  alt={service.alt}
                  loading="lazy"
                  width="800"
                  height="600"
                />
                <span className="b2b-service-number" aria-hidden="true">
                  0{index + 1}
                </span>
                <span className="b2b-image-caption">
                  {service.material
                    ? "IHR LOGO. IHR PRODUKT."
                    : "AUS UNSERER WERKSTATT"}
                </span>
              </div>
              <div className="b2b-service-copy">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul className="b2b-checklist">
                  {service.details.map((detail) => (
                    <li key={detail}>
                      <FiCheck aria-hidden="true" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
                <div className="b2b-service-tags">
                  {service.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="b2b-sticker-note">
          <div className="b2b-sticker-icon">
            <FiLayers aria-hidden="true" />
          </div>
          <div>
            <h3>Ihr Auftritt endet nicht am Textil.</h3>
            <p>
              Auch bei Logo-Aufklebern, Schaufenster- und Türbeschriftungen,
              kleinen Fahrzeug-Schriftzügen und Verpackungsetiketten helfen wir
              Ihnen weiter.
            </p>
          </div>
          <a
            href="#anfrage"
            className="b2b-inline-arrow"
            aria-label="Aufkleber und Folienbeschriftung anfragen"
          >
            <FiArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className="b2b-textiles" aria-labelledby="textiles-title">
        <div className="b2b-container b2b-section">
          <div className="b2b-section-heading">
            <div>
              <p className="b2b-eyebrow">02 / TEXTILIEN & AUSWAHL</p>
              <h2 id="textiles-title">
                DER PASSENDE STOFF.
                <br />
                <span>FÜR IHREN AUFTRITT.</span>
              </h2>
            </div>
            <p>
              Viele Farben. Viele Größen. Bewährte Markenlieferanten. Wir
              stellen Ihre Auswahl passend zu Einsatz und Budget zusammen.
            </p>
          </div>
          <div className="b2b-textile-grid">
            {textileGroups.map((group) => (
              <article className="b2b-textile-group" key={group.title}>
                <div className="b2b-textile-image">
                  <img
                    src={group.image}
                    alt={group.alt}
                    loading="lazy"
                    width="400"
                    height="400"
                  />
                </div>
                <div className="b2b-textile-copy">
                  <h3>{group.title}</h3>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
          <p className="b2b-textile-footer">
            <FiCheckCircle aria-hidden="true" /> Farben und Größen persönlich
            ansehen. Musterteile vorab möglich.
          </p>
        </div>
      </section>

      <section className="b2b-offer" aria-labelledby="offer-title">
        <div className="b2b-container b2b-offer-inner">
          <div className="b2b-offer-copy">
            <p className="b2b-eyebrow">UNSER ERÖFFNUNGSANGEBOT</p>
            <h2 id="offer-title">
              VORNE IHR LOGO.
              <br />
              HINTEN IHR STATEMENT.
            </h2>
            <p>T-Shirt inklusive Druck auf Vorder- und Rückseite.</p>
          </div>
          <div className="b2b-offer-price">
            <span>BEIDSEITIG BEDRUCKT</span>
            <p>
              <small>ab</small> 15,00 €<sup>*</sup>
            </p>
            <span>netto / Stück · zzgl. 19 % MwSt.</span>
            <small>17,85 € inkl. MwSt.</small>
          </div>
          <a className="b2b-button b2b-button-light" href={openingOfferRequest}>
            ANGEBOT SICHERN <FiArrowUpRight aria-hidden="true" />
          </a>
          <p className="b2b-offer-legal">
            * Der genaue Preis richtet sich nach Textil, Motiv und Menge im
            individuellen Angebot. Gegebenenfalls zzgl.{" "}
            <a href="/versandkosten">Versandkosten</a>.
          </p>
        </div>
      </section>

      <section
        className="b2b-section b2b-container b2b-process"
        id="ablauf"
        aria-labelledby="process-title"
      >
        <div className="b2b-section-heading">
          <div>
            <p className="b2b-eyebrow">03 / VON DER IDEE ZUM PRODUKT</p>
            <h2 id="process-title">
              KURZE WEGE.
              <br />
              <span>KLARER ABLAUF.</span>
            </h2>
          </div>
          <p>
            Sie bringen Ihre Idee mit. Wir kümmern uns um die Umsetzung. Und
            produziert wird erst nach Ihrer Freigabe.
          </p>
        </div>
        <ol className="b2b-steps">
          {steps.map((step, index) => (
            <li key={step.title}>
              <span className="b2b-step-number">0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="b2b-faq-section" aria-labelledby="faq-title">
        <div className="b2b-container b2b-faq-grid">
          <div>
            <p className="b2b-eyebrow">GUT ZU WISSEN</p>
            <h2 id="faq-title">
              NOCH FRAGEN?
              <br />
              <span>KLÄREN WIR.</span>
            </h2>
            <p>
              Lieber direkt miteinander sprechen?
              <br />
              Wir beraten Sie gerne persönlich.
            </p>
            <a className="b2b-text-link" href="tel:+4920936171378">
              <FiPhone aria-hidden="true" /> 0209 361 713 78
            </a>
          </div>
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
        </div>
      </section>

      <section
        className="b2b-section b2b-container b2b-contact"
        id="anfrage"
        aria-labelledby="contact-title"
      >
        <div className="b2b-contact-grid">
          <div className="b2b-contact-copy">
            <p className="b2b-eyebrow">04 / LASSEN SIE UNS LOSLEGEN</p>
            <h2 id="contact-title">
              IHR NÄCHSTES PROJEKT?
              <br />
              <span>MACHEN WIR.</span>
            </h2>
            <p>
              Erzählen Sie uns, was Sie vorhaben. Wir beraten Sie persönlich und
              erstellen ein unverbindliches Angebot – passend zu Ihrem Team,
              Ihrer Idee und Ihrem Budget.
            </p>
            <a
              className="b2b-button b2b-button-primary btn-red"
              href={emailRequest}
            >
              ANFRAGE PER E-MAIL <FiArrowUpRight aria-hidden="true" />
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
                  Rufen Sie uns an<strong>0209 361 713 78</strong>
                </span>
              </a>
              <a
                href="https://wa.me/4917626091435"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiMessageCircle aria-hidden="true" />
                <span>
                  Schreiben Sie uns
                  <strong>
                    WhatsApp <FiArrowUpRight aria-hidden="true" />
                  </strong>
                </span>
              </a>
            </div>
          </div>
          <aside
            className="b2b-request-checklist"
            aria-label="Checkliste für Ihre Anfrage"
          >
            <span className="b2b-checklist-label">
              FÜR EIN PASSENDES ANGEBOT
            </span>
            <h3>Das brauchen wir von Ihnen.</h3>
            <ul>
              <li>
                <span>01</span>
                <div>
                  <strong>Ihr Logo</strong>
                  <p>Als PDF, SVG, AI oder PNG in hoher Auflösung.</p>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <strong>Ihre Wunschartikel</strong>
                  <p>Artikel, Farben und Stückzahl je Größe.</p>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <strong>Die Veredelung</strong>
                  <p>Position und ungefähre Größe Ihres Logos.</p>
                </div>
              </li>
              <li>
                <span>04</span>
                <div>
                  <strong>Ihr Wunschtermin</strong>
                  <p>Wann soll Ihr Team startklar sein?</p>
                </div>
              </li>
            </ul>
            <p className="b2b-checklist-hint">
              <FiMail aria-hidden="true" /> Logo einfach Ihrer E-Mail als Anhang
              beifügen.
            </p>
          </aside>
        </div>
        <div className="b2b-visit-row">
          <div className="b2b-visit-address">
            <FiMapPin aria-hidden="true" />
            <div>
              <strong>KOMMEN SIE VORBEI.</strong>
              <p>Horster Str. 118 · 45897 Gelsenkirchen-Buer</p>
              <span>Muster ansehen. Ideen besprechen. Gemeinsam loslegen.</span>
            </div>
          </div>
          <a
            className="b2b-download"
            href={brochure}
            download="Pottlerkinder-Leistungen-fuer-Unternehmen.pdf"
          >
            <FiDownload aria-hidden="true" />
            <span>
              Alle Leistungen zum Mitnehmen
              <small>BROSCHÜRE ALS PDF · 7 MB</small>
            </span>
            <FiArrowRight aria-hidden="true" />
          </a>
        </div>
      </section>
      <div className="b2b-signoff" aria-hidden="true">
        INDIVIDUELL.<span> PROFESSIONELL.</span> AUS DEM POTT.
      </div>
    </main>
  )
}
